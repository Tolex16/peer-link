package com.plk.peer_link.Domain.Mappers.Impl.UserMapper;

import com.plk.peer_link.Domain.Dto.UserProfile;
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
public class UserProfileMapperImpl implements Mapper<Users, UserProfile> {

        private final ModelMapper modelMapper;

        @Override
        public UserProfile mapTo(Users user) {
            UserProfile investorProfile = new UserProfile();
            investorProfile.setFullName(user.getFirstName() + " " + user.getLastName());
            investorProfile.setEmail(user.getEmail());


            return investorProfile;

        }

        @Override
        public Users mapFrom(UserProfile investorProfile) {
            return modelMapper.map(investorProfile, Users.class);
        }

        @Override
        public List<UserProfile> mapListTo(Iterable<Users> usersIterable) {
            return StreamSupport.stream(usersIterable.spliterator(), false)
                    .map(users -> modelMapper.map(
                            users, UserProfile.class
                    )).collect(Collectors.toList());
        }

}
