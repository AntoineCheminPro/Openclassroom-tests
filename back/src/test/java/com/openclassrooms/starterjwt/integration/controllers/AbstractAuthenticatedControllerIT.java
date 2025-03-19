package com.openclassrooms.starterjwt.integration.controllers;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureMockMvc
public abstract class AbstractAuthenticatedControllerIT {

    @Autowired
    protected MockMvc mockMvc;

    protected final UserRepository userRepository;

    @Autowired
    public AbstractAuthenticatedControllerIT(UserRepository userRepository) {
        this.userRepository = userRepository;

        if(userRepository.existsByEmail(DEFAULT_TEST_USER_EMAIL)) {
            authenticatedUser = userRepository.findByEmail(DEFAULT_TEST_USER_EMAIL).orElse(null);
            return;
        }

        // Create the default authenticated admin user for testing purposes
        // This user will be available for all test classes extending this base class
        var defaultTestUser = User.builder()
                .admin(true)
                .firstName(DEFAULT_TEST_USER_FIRSTNAME)
                .lastName(DEFAULT_TEST_USER_LASTNAME)
                .email(DEFAULT_TEST_USER_EMAIL)
                .password("TestPassword123!")
                .build();
        authenticatedUser = userRepository.save(defaultTestUser);
    }

    protected User authenticatedUser;
    protected static final String DEFAULT_TEST_USER_EMAIL = "test.admin@test.com";
    protected static final String DEFAULT_TEST_USER_FIRSTNAME = "test";
    protected static final String DEFAULT_TEST_USER_LASTNAME = "admin";

}
