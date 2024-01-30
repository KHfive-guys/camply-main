package com.camply.user.security;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

    private final Key key;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        this.key = Keys.hmacShaKeyFor(Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded());
    }

    public String generateToken(Authentication authentication) {
        String email = getEmailFromAuthentication(authentication);
        if (StringUtils.isEmpty(email) || authentication.getAuthorities() == null) {
            throw new RuntimeException("Invalid authentication details");
        }

        StringBuilder roles = new StringBuilder();
        authentication.getAuthorities().forEach(authority -> roles.append(authority.getAuthority()).append(","));

        Date tokenExpiresDate = new Date(new Date().getTime() + (1000 * 60 * 60 * 24));

        return Jwts.builder()
                .setSubject("AccessToken")
                .claim("email", email)
                .claim("auth", roles.toString())
                .setExpiration(tokenExpiresDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    private String getEmailFromAuthentication(Authentication authentication) {
        if (authentication.getPrincipal() instanceof UserDetails) {
            return ((UserDetails) authentication.getPrincipal()).getUsername();
        } else if (authentication.getPrincipal() instanceof OAuth2User) {
            return ((OAuth2User) authentication.getPrincipal()).getAttribute("email");
        }
        return null;
    }

    public String generateOAuth2RegisterToken(Authentication authentication) {
        // util
        Date toKenExpiresDate = new Date(new Date().getTime() + (1000 * 60 * 10));

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");

        return Jwts.builder()
                .setSubject("OAuth2Register")
                .claim("email", email)
                .setExpiration(toKenExpiresDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

