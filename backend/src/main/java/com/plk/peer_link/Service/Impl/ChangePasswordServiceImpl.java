package com.dcg.digi_cap_group.Service.Impl;

import com.dcg.digi_cap_group.Domain.Dto.ChangePasswordRequest;
import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.ExceptionHandler.InvalidPasswordException;
import com.dcg.digi_cap_group.ExceptionHandler.SamePasswordException;
import com.dcg.digi_cap_group.Repository.UserRepository;
import com.dcg.digi_cap_group.Service.ChangePasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ChangePasswordServiceImpl implements ChangePasswordService {
    @Autowired
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public ResponseEntity<?> changePassword(Users user, ChangePasswordRequest request) {
        if (request.getCurrentPassword() == null || request.getNewPassword() == null || request.getConfirmNewPassword() == null) {
            throw new InvalidPasswordException("Passwords cannot be null");
        }

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new InvalidPasswordException("Current password is incorrect");
        }

        if (!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new SamePasswordException("New password and confirm new password do not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);


        return new ResponseEntity<>(HttpStatus.OK);
    }

}

