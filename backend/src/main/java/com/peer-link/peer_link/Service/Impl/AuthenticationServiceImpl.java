package com.dcg.digi_cap_group.Service.Impl;

import com.dcg.digi_cap_group.Domain.Dto.LoginRequest;
import com.dcg.digi_cap_group.Domain.Dto.SignUpRequest;
import com.dcg.digi_cap_group.Domain.Dto.UpdateProfileRequest;
import com.dcg.digi_cap_group.Domain.Dto.UserDto;
import com.dcg.digi_cap_group.Domain.Entities.Role;
import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.Domain.Mappers.Mapper;
import com.dcg.digi_cap_group.ExceptionHandler.AccountDeactivatedException;
import com.dcg.digi_cap_group.ExceptionHandler.EmailNotFoundException;
import com.dcg.digi_cap_group.ExceptionHandler.UserAlreadyExistsException;
import com.dcg.digi_cap_group.ExceptionHandler.UserNotFoundException;
import com.dcg.digi_cap_group.Repository.UserRepository;
import com.dcg.digi_cap_group.Response.LoginResponse;
import com.dcg.digi_cap_group.Service.AuthService;
import com.dcg.digi_cap_group.Service.EmailService;
import com.dcg.digi_cap_group.Service.JwtService;
import com.dcg.digi_cap_group.Service.TokenService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;
    private final EmailService emailService;
    @Autowired
    private final TokenService tokenService;

    private final Mapper<Users, SignUpRequest> userMapper;
    private final Mapper<Users, UserDto> loggedInMapper;


    public ResponseEntity<?> investorRegister(SignUpRequest signUpRequest){
        if(userRepository.existsByEmailIgnoreCase(signUpRequest.getEmail())){
            throw new UserAlreadyExistsException("There is a investor account associated with this email already");
        }
        try {

            String password = signUpRequest.getPassword();

            signUpRequest.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
            Users user = userMapper.mapFrom(signUpRequest);
            user.setRole(Role.USER);
            user.setCreatedAt(LocalDateTime.now());
            userRepository.save(user);

            emailService.sendWelcomeMail(user.getEmail(), user.getFirstName(), user.getLastName());
            return new ResponseEntity<>("Registered Successfully!",HttpStatus.CREATED);

            } catch (Exception error) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    public LoginResponse loginIn(LoginRequest loginRequest) {
    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword()
            )
        );
    } catch (BadCredentialsException e) {
        throw new EmailNotFoundException("Invalid email or password");
    }

    var user = userRepository.findByEmailIgnoreCaseAndDeletedFalse(loginRequest.getEmail())
            .orElseThrow(() -> new UserNotFoundException("User does not exist"));

    if (user.isDeleted()) {
        throw new AccountDeactivatedException("Your account has been deactivated due to inactivity.");
    }

    // ✅ Update lastLoggedIn timestamp and persist it
    user.setLastLoggedIn(LocalDateTime.now());
    userRepository.save(user); // <-- This is required to persist changes

    // Generate token and map user
    String jwt = jwtService.generateToken(user);
    UserDto loggedInInvestor = loggedInMapper.mapTo(user);

    return new LoginResponse(jwt, loggedInInvestor);
}

    @Transactional
    public Map<String, Boolean> checkMail(String email) {
        Map<String, Boolean> result = new HashMap<>();

        boolean isEmailPresent = userRepository.findByEmailIgnoreCaseAndDeletedFalse(email).isPresent();
        result.put("email", isEmailPresent);

        return result;
    }

    @Scheduled(cron = "0 0 2 * * ?", zone = "Africa/Lagos")// Daily at 2 AM
    public void warnUsersPendingDeletion() {
        LocalDateTime deletionDate = LocalDateTime.now().plusWeeks(1);
        LocalDateTime oneWeekRangeStart = deletionDate.minusDays(1);
        LocalDateTime oneWeekRangeEnd = deletionDate.plusDays(1);

        List<Users> users = userRepository.findUsersToWarnBeforeDeletion(oneWeekRangeStart, oneWeekRangeEnd);

        for (Users user : users) {
            emailService.sendInactiveAccountWarningMail(user.getEmail(), user.getFirstName(), String.valueOf(deletionDate));
        }
    }

	@Scheduled(cron = "0 0 3 * * ?", zone = "Africa/Lagos")// Daily at 3 AM
    public void deleteInactiveAccounts() {
        LocalDateTime threshold = LocalDateTime.now().minusMonths(3);
        List<Users> inactiveUsers = userRepository.findUsersInactiveSince(threshold);
        userRepository.deleteAll(inactiveUsers);
    }

    public void accountReactivated(String email){
        try {
            Users existingUser = userRepository.findByEmailIgnoreCaseAndDeletedTrue(email).orElse(null);
            if (existingUser == null) {
                throw new EmailNotFoundException("User with email " + email + " not found");
            }
            existingUser.setCreatedAt(LocalDateTime.now());
            existingUser.setDeleted(false);
            existingUser.setPassword(generateOTP());
            userRepository.save(existingUser);
            emailService.sendAccountReactivationMail(existingUser.getEmail(),existingUser.getFirstName(), existingUser.getLastName());
        } catch (Exception e) {
            throw new RuntimeException("Encountered while performing this action", e);
        }
    }

    public String generateOTP(){
        List rules = Arrays.asList(new CharacterRule(EnglishCharacterData.UpperCase, 2),
                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                new CharacterRule(EnglishCharacterData.Digit, 2));

        PasswordGenerator generator = new PasswordGenerator();
        String password = generator.generatePassword(8,rules);
        return password;
    }

    @PostConstruct
    public void createAdminUsers() {
        Optional<Users> adminUser = userRepository.findByEmailIgnoreCaseAndDeletedFalse("admin@digicapgroup.org");
        if (adminUser.isEmpty()) {
            Users createAdmin = new Users();
            createAdmin.setFirstName("admin");
            createAdmin.setLastName("DCG");
            createAdmin.setEmail("admin@digicapgroup.org");
            createAdmin.setPassword(passwordEncoder.encode("Winner123@"));
             createAdmin.setCreatedAt(LocalDateTime.now());
            createAdmin.setRole(Role.ADMIN);
            userRepository.save(createAdmin);
        }
    }

    public void logout(String token) {
        Instant expiryTime = jwtService.extractExpiration(token).toInstant();
        tokenService.addToken(token, expiryTime);
    }


    @Transactional
    public void updateProfile(UpdateProfileRequest request) {
    Long userId = jwtService.getUserId();

    Users user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (request.getFirstName() != null && !request.getFirstName().isBlank()) {
        user.setFirstName(request.getFirstName());
    }

    if (request.getLastName() != null && !request.getLastName().isBlank()) {
        user.setLastName(request.getLastName());
    }

    if (request.getEmail() != null && !request.getEmail().isBlank()  &&
    !request.getEmail().equals(user.getEmail())) {
		
		if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
        throw new RuntimeException("Email already in use");
    }

        user.setEmail(request.getEmail());
    }

    if (request.getBase64Image() != null && !request.getBase64Image().isBlank()) {
        byte[] imageBytes = Base64.getDecoder()
                .decode(request.getBase64Image());
        user.setProfileImage(imageBytes);
    }

    userRepository.save(user);
   }

    public String getProfileImageBase64() {
        Long userId = jwtService.getUserId();
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getProfileImage() == null) {
            return null;
        }

        return Base64.getEncoder().encodeToString(user.getProfileImage());
    }

    public Optional<Users> getInvestorDisplay() {
        Long investorId = jwtService.getUserId();
        return userRepository.findById(investorId);
    }

    @Scheduled(cron = "0 0 3 * * ?")
    public void cleanUpInactiveAccounts() {
        LocalDateTime threshold = LocalDateTime.now().minusMonths(3);
        List<Users> users = userRepository.findUsersInactiveSince(threshold);

        for (Users user : users) {
                user.setDeleted(true);
                // Hard delete
                userRepository.delete(user);
                emailService.sendAccountDeletionMail(user.getEmail(), user.getFirstName(), String.valueOf(threshold));
            }
        }
}







