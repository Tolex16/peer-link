package com.dcg.digi_cap_group.Service.Impl;

import com.dcg.digi_cap_group.Domain.Entities.Users;
import com.dcg.digi_cap_group.Service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    @Value("${dcg.app.jwtsecret}")
    private String SECRET;

    public String generateToken(UserDetails userDetails){
        return Jwts.builder().setSubject(userDetails.getUsername())
		        .claim("role", userDetails.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 18))
                .signWith(getLoginKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    private  <T> T extractClaim(String token, Function<Claims, T> claimResolvers){
        final Claims claims = extraAllClaims(token);
        return claimResolvers.apply(claims);
    }

    public Key getLoginKey(){
        byte[] key = Decoders.BASE64URL.decode(SECRET);
        return Keys.hmacShaKeyFor(key);
    }

    private Claims extraAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getLoginKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    public Boolean isTokenExpired(String token){
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    @Override
    public Long getUserId() {
        Users user = (Users) SecurityContextHolder
                .getContext().
                getAuthentication()
                .getPrincipal();

        return user.getUserId();
    }

}
