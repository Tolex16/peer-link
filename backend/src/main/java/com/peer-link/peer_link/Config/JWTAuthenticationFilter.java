package com.dcg.digi_cap_group.Config;

import com.dcg.digi_cap_group.Service.JwtService;
import com.dcg.digi_cap_group.Service.TokenService;
import com.dcg.digi_cap_group.Service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtservice;
    private final UserService userService;
    private final TokenService tokenService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
		
		
        String path = request.getServletPath();

        // 🔓 Skip JWT check for public endpoints
        if (path.startsWith("/api/v1/auth/")
        || path.startsWith("/api/v1/forgot-password/")
        || path.startsWith("/actuator/")) {

        filterChain.doFilter(request, response);
        return;
        }

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String jwt = authHeader.substring(7);

        // ---- Get real client IP ----
        String ipAddress = request.getHeader("X-FORWARDED-FOR");

        if (ipAddress == null || ipAddress.isEmpty()) {
            ipAddress = request.getRemoteAddr();
        } else if (ipAddress.contains(",")) {
            ipAddress = ipAddress.split(",")[0].trim();
        }

        logger.info("User logged in from IP: " + ipAddress);

        if (!tokenService.isTokenBlacklisted(jwt) && !jwtservice.isTokenExpired(jwt)) {

            String username = jwtservice.extractUsername(jwt);

            if (StringUtils.hasLength(username)
                    && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails =
                        userService.userDetailsService().loadUserByUsername(username);

                if (jwtservice.isTokenValid(jwt, userDetails)) {

                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authentication.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authentication);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}

//if (StringUtils.hasLength(username) && SecurityContextHolder.getContext().getAuthentication() == null) {
