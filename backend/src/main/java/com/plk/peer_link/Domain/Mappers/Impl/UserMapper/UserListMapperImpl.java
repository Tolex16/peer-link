package com.plk.peer_link.Domain.Mappers.Impl.UserMapper;

import com.plk.peer_link.Domain.Dto.UserList;
import com.plk.peer_link.Domain.Entities.Users;
import com.plk.peer_link.Domain.Mappers.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class UserListMapperImpl implements Mapper<Users, UserList> {

    private final ModelMapper modelMapper;

    @Override
    public UserList mapTo(Users users) {
        UserList investorList = new UserList();
        investorList.setUserId(users.getUserId());
        investorList.setFullName(users.getFirstName() + " " + users.getLastName());
        investorList.setEmail(users.getEmail());
        investorList.setCreatedAt(users.getCreatedAt());
        investorList.setLastLoggedIn(users.getLastLoggedIn());
        investorList.setRole(String.valueOf(users.getRole()));
		
        return investorList;
    }

    @Override
    public Users mapFrom(UserList investorList)  {
        return modelMapper.map(investorList, Users.class);
    }


    @Override
    public Iterable<UserList> mapListTo(Iterable<Users> usersIterable) {
    return StreamSupport.stream(usersIterable.spliterator(), false)
            .map(this::mapTo)
            .collect(Collectors.toList());
    }

}
