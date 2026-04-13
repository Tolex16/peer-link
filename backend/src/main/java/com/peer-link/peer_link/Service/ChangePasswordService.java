package com.dcg.digi_cap_group.Service;

import com.dcg.digi_cap_group.Domain.Dto.ChangePasswordRequest;
import com.dcg.digi_cap_group.Domain.Entities.Users;
import org.springframework.http.ResponseEntity;

public interface ChangePasswordService {
	
    ResponseEntity<?> changePassword(Users user, ChangePasswordRequest request);

}
