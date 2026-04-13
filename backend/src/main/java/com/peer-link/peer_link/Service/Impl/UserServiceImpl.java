package com.dcg.digi_cap_group.Service.Impl;


import com.dcg.digi_cap_group.Repository.UserRepository;
import com.dcg.digi_cap_group.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository userRepository;


    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        return username ->
               userRepository.findByEmailIgnoreCaseAndDeletedFalse(username)
                    .orElseThrow(() ->
                            new UsernameNotFoundException("User not found: " + username)
                    );
    }

}
