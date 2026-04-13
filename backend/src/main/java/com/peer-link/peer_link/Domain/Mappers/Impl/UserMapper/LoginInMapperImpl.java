package com.dcg.digi_cap_group.Domain.Mappers.Impl.UserMapper;

import com.dcg.digi_cap_group.Domain.Dto.UserDto;
import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.Domain.Mappers.Mapper;
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
