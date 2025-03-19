package com.openclassrooms.starterjwt.security.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class BeansConfig {

    private final UserDetailsService userDetailsService;

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder() {
            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                System.out.println("Tentative de vérification du mot de passe");
                System.out.println("Mot de passe reçu (non hashé) : " + rawPassword);
                System.out.println("Hash stocké en base : " + encodedPassword);
                boolean matches = super.matches(rawPassword, encodedPassword);
                System.out.println("Résultat de la comparaison : " + matches);
                return matches;
            }

            @Override
            public String encode(CharSequence rawPassword) {
                String encoded = super.encode(rawPassword);
                System.out.println("Hashage d'un nouveau mot de passe");
                System.out.println("Mot de passe à hasher : " + rawPassword);
                System.out.println("Hash généré : " + encoded);
                return encoded;
            }
        };
    }
}
