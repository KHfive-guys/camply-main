package com.camply.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class camplyUserSecurityConfig {

	@Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http     
        .cors(cors -> cors.disable()).csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(authorizeRequests -> 
            authorizeRequests
                .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
        )
        .formLogin(formLogin ->
            formLogin
                .loginPage("/login")
                .usernameParameter("USER_EMAIL")
                .passwordParameter("USER_PASSWORD")
                .defaultSuccessUrl("/")
                .failureUrl("/login")
        )
        .logout(logout ->
            logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
        );

    return http.build();
    }
	
	@Bean
	static AuthenticationManager authenticationManage(AuthenticationConfiguration a) throws Exception {
		return a.getAuthenticationManager();
	}
	
	@Bean
	static PasswordEncoder passwordEncoder() {

		return new BCryptPasswordEncoder();
	}

}
