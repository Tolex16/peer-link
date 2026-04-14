package com.plk.peer_link.Service;

import com.plk.peer_link.Domain.Dto.ChangePasswordRequest;
import com.plk.peer_link.Domain.Entities.Users;
import org.springframework.http.ResponseEntity;

public interface ChangePasswordService {
	
    ResponseEntity<?> changePassword(Users user, ChangePasswordRequest request);

}
