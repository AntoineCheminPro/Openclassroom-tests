package com.openclassrooms.starterjwt.integration.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import com.openclassrooms.starterjwt.payload.request.SignupRequest;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class AuthControllerIT {

    @Autowired
    private MockMvc mockMvc;

    private final String email = "yoga@studio.com";
    private final String password = "test!1234";

    @Test
    @Order(1)
    @Tag("api/auth/register")
    @DisplayName("Should register user successfully with valid credentials")
    void whenRegisteringUser_thenReturnSuccessMessage() throws Exception {
        var signUpRequest = new SignupRequest();

        signUpRequest.setEmail(email);
        signUpRequest.setPassword(password);
        signUpRequest.setLastName("toto");
        signUpRequest.setFirstName("toto");

        var objectMapper = new ObjectMapper();
        var json = objectMapper.writeValueAsString(signUpRequest);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User registered successfully!"));
    }

    @Test
    @Order(2)
    @Tag("api/auth/register")
    @DisplayName("it should fail to register a user who has already registered with a same email address")
    void whenRegisteringExistingUser_thenReturnError() throws Exception {
        var signUpRequest = new SignupRequest();

        signUpRequest.setEmail(email);
        signUpRequest.setPassword(password);
        signUpRequest.setLastName("toto");
        signUpRequest.setFirstName("toto");

        var objectMapper = new ObjectMapper();
        var json = objectMapper.writeValueAsString(signUpRequest);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Error: Email is already taken!"));
    }

    @Test
    @Order(3)
    @Tag("api/auth/login")
    @DisplayName("it should login the user")
    void whenLoggingInWithValidCredentials_thenReturnToken() throws Exception {
        var loginRequest = new LoginRequest();

        loginRequest.setEmail(email);
        loginRequest.setPassword(password);

        ObjectMapper objectMapper = new ObjectMapper();
        var json = objectMapper.writeValueAsString(loginRequest);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.type").exists())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.username").exists())
                .andExpect(jsonPath("$.firstName").exists())
                .andExpect(jsonPath("$.lastName").exists())
                .andExpect(jsonPath("$.admin").exists());
    }
}
