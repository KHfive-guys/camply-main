package com.camply.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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

		System.out.println("code check 1");
		
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
                    .failureUrl("/user")
            )
            .logout(logout ->
                logout
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutSuccessUrl("/")
                    .invalidateHttpSession(true)
            );

		System.out.println("code check 2");
        return http.build();
    }
//	
	@Bean
	static PasswordEncoder passwordEncoder() {
		System.out.println("code check 3");
		return new BCryptPasswordEncoder();
	}

}
