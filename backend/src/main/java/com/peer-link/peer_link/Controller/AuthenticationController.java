package com.dcg.digi_cap_group.Controller;

import com.dcg.digi_cap_group.Domain.Dto.InvestorProfile;
import com.dcg.digi_cap_group.Domain.Dto.LoginRequest;
import com.dcg.digi_cap_group.Domain.Dto.SignUpRequest;

import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.Domain.Mappers.Mapper;
import com.dcg.digi_cap_group.ExceptionHandler.EmailNotFoundException;
import com.dcg.digi_cap_group.ExceptionHandler.UserAlreadyExistsException;
import com.dcg.digi_cap_group.ExceptionHandler.UserNotFoundException;
import com.dcg.digi_cap_group.Service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    @Autowired
    private final AuthService authenticationService;



    @PostMapping("/register")
    public ResponseEntity<?> registerInvestor(@Valid @RequestBody SignUpRequest signUpRequest, BindingResult result){
        System.out.println("Has errors?" + result.hasErrors());
        if (result.hasErrors()){ return new ResponseEntity<>(HttpStatus.BAD_REQUEST);}
        try {
            var userStore = authenticationService.investorRegister(signUpRequest);
            return new ResponseEntity<>(userStore, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity <?> login(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        System.out.println("Has errors?" + result.hasErrors());
        if (result.hasErrors()){return new ResponseEntity<>(HttpStatus.BAD_REQUEST);}
        try {
            return new ResponseEntity<>(authenticationService.loginIn(loginRequest), HttpStatus.ACCEPTED);
        }catch (IllegalArgumentException | UserNotFoundException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        } catch (EmailNotFoundException ex){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
        }
    }

    @GetMapping("/check-email/{email}")
    public ResponseEntity<Map<String, Boolean>> findUser(@PathVariable String email) {
        try {
            Map<String, Boolean> emailExists = authenticationService.checkMail(email);
            return new ResponseEntity<>(emailExists, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/reactivate")
    public ResponseEntity<String> reactivateAccount(@RequestParam String email){

        try {
            authenticationService.accountReactivated(email);
            return ResponseEntity.ok("Account Reactivated. Check your email for instructions.");
        } catch (EmailNotFoundException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }

    }


}
