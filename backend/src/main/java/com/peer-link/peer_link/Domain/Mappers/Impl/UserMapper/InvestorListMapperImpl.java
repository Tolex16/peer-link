package com.dcg.digi_cap_group.Domain.Mappers.Impl.UserMapper;

import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.Domain.Mappers.Mapper;
import com.dqa.digi_quantum_analytics.Domain.Dto.InvestorList;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Component
@RequiredArgsConstructor
public class InvestorListMapperImpl implements Mapper<Users, InvestorList> {

    private final ModelMapper modelMapper;

    @Override
    public InvestorList mapTo(Users users) {
        InvestorList investorList = new InvestorList();
        investorList.setUserId(users.getUserId());
        investorList.setFullName(users.getFirstName() + " " + users.getLastName());
        investorList.setEmail(users.getEmail());
        investorList.setCreatedAt(users.getCreatedAt());
        investorList.setLastLoggedIn(users.getLastLoggedIn());
        investorList.setRole(String.valueOf(users.getRole()));
		
        return investorList;
    }

    @Override
    public Users mapFrom(InvestorList investorList)  {
        return modelMapper.map(investorList, Users.class);
    }


    @Override
    public Iterable<InvestorList> mapListTo(Iterable<Users> usersIterable) {
    return StreamSupport.stream(usersIterable.spliterator(), false)
            .map(this::mapTo)
            .collect(Collectors.toList());
    }

}
