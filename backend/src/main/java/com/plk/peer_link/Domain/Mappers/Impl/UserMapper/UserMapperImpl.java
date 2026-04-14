package com.plk.peer_link.Domain.Mappers.Impl.UserMapper;

import com.plk.peer_link.Domain.Dto.SignUpRequest;
import com.plk.peer_link.Domain.Entities.Users;
import com.plk.peer_link.Domain.Mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class UserMapperImpl implements Mapper<Users, SignUpRequest> {

    private final ModelMapper modelMapper;

    @Override
    public SignUpRequest mapTo(Users users) {
        return modelMapper.map(users, SignUpRequest.class);
    }

    @Override
    public Users mapFrom(SignUpRequest signUpRequest) {
        return modelMapper.map(signUpRequest,Users.class);
    }

    @Override
    public Iterable<SignUpRequest> mapListTo(Iterable<Users> users) {
        return StreamSupport.stream(users.spliterator(), false)
                .map(users1 -> modelMapper.map(
                        users1, SignUpRequest.class
                )).collect(Collectors.toList());
    }


}

