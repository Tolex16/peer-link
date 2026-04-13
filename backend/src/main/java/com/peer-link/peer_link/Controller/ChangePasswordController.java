package com.dcg.digi_cap_group.Controller;

import com.dcg.digi_cap_group.Domain.Dto.ChangePasswordRequest;
import com.dcg.digi_cap_group.ExceptionHandler.InvalidPasswordException;
import com.dcg.digi_cap_group.ExceptionHandler.SamePasswordException;
import com.dcg.digi_cap_group.ExceptionHandler.UserNotFoundException;
import com.dcg.digi_cap_group.Repository.UserRepository;
import com.dcg.digi_cap_group.Service.ChangePasswordService;
import com.dcg.digi_cap_group.Service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/change-password")
@RequiredArgsConstructor
public class ChangePasswordController {
    @Autowired
    private final ChangePasswordService changePasswordService;

    @Autowired
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/execute")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        try {
            Long userId = jwtService.getUserId();  // Use the combined method to get the user ID

            // Check student repository first
            var investorOpt = userRepository.findById(userId);
            if (investorOpt.isPresent()) {
                var investor = investorOpt.get();
                return changePasswordService.changePassword(investor, request);
            }

            // If neither found, throw an exception
            throw new UserNotFoundException("User Not Found");
        } catch (InvalidPasswordException | SamePasswordException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}