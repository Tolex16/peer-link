package com.dcg.digi_cap_group.Domain.Mappers.Impl.UserMapper;

import com.dcg.digi_cap_group.Domain.Dto.InvestorProfile;
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
public class InvestorProfileMapperImpl implements Mapper<Users, InvestorProfile> {

        private final ModelMapper modelMapper;

        @Override
        public InvestorProfile mapTo(Users user) {
            InvestorProfile investorProfile = new InvestorProfile();
            investorProfile.setFullName(user.getFirstName() + " " + user.getLastName());
            investorProfile.setEmail(user.getEmail());


            return investorProfile;

        }

        @Override
        public Users mapFrom(InvestorProfile investorProfile) {
            return modelMapper.map(investorProfile, Users.class);
        }

        @Override
        public List<InvestorProfile> mapListTo(Iterable<Users> usersIterable) {
            return StreamSupport.stream(usersIterable.spliterator(), false)
                    .map(users -> modelMapper.map(
                            users, InvestorProfile.class
                    )).collect(Collectors.toList());
        }

}
