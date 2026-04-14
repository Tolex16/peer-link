package com.plk.peer_link.Domain.Mappers.Impl.UserMapper;

import com.plk.peer_link.Domain.Dto.UserDto;
import com.plk.peer_link.Domain.Entities.Users;
import com.plk.peer_link.Domain.Mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class LoginInMapperImpl implements Mapper<Users, UserDto> {

    private final ModelMapper modelMapper;

    @Override
    public UserDto mapTo(Users user) {
        UserDto userDto = new UserDto();
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        userDto.setBio(user.getBio());
        userDto.setUsername(user.getUsername());

        return userDto;
    }

    @Override
    public Users mapFrom(UserDto userDto) {
        return modelMapper.map(userDto, Users.class);
    }

    @Override
    public List<UserDto> mapListTo(Iterable<Users> usersIterable) {
        return StreamSupport.stream(usersIterable.spliterator(), false)
                .map(users -> modelMapper.map(
                        users, UserDto.class
                )).collect(Collectors.toList());
    }

}
