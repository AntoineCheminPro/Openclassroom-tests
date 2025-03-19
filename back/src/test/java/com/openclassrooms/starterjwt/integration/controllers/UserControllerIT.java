package com.openclassrooms.starterjwt.integration.controllers;

import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithUserDetails;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Tag("api/user")
public class UserControllerIT extends AbstractAuthenticatedControllerIT {

    @Autowired
    public UserControllerIT(UserRepository userRepository) {
        super(userRepository);
    }

    //region Test unauthorized endpoints

    @Test
    @Order(1)
    @DisplayName("it should fail to find a user when no authorization is provided")
    public void UserController_FindById_ShouldReturnUnauthorizedResponse() throws Exception {
        mockMvc.perform(get("/api/user/{id}", authenticatedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @Order(2)
    @DisplayName("it should fail to delete a user when no authorization is provided")
    public void UserController_Delete_ShouldReturnUnauthorizedResponse() throws Exception {
        mockMvc.perform(delete("/api/user/{id}", authenticatedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    //endregion

    @Test
    @Order(3)
    @DisplayName("it should fail to find a user with an invalid formatted input user id")
    @WithUserDetails(value = "test.admin@test.com")
    public void UserController_FindById_ShouldReturnBadRequestResponse() throws Exception {
        var userId = "aa"; //invalid user id

        mockMvc.perform(get("/api/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Order(4)
    @DisplayName("it should fail to find a user that has never been created")
    @WithUserDetails(value = "test.admin@test.com")
    public void UserController_FindById_ShouldReturnNotFoundResponse() throws Exception {
        var userId = 100L; //user doesn't exist
        mockMvc.perform(get("/api/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @Order(5)
    @DisplayName("it should find a user by id")
    @WithUserDetails(value = "test.admin@test.com")
    public void UserController_FindById_ShouldReturnOkResponse() throws Exception {
        mockMvc.perform(get("/api/user/{id}", authenticatedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value(DEFAULT_TEST_USER_FIRSTNAME))
                .andExpect(jsonPath("$.lastName").value(DEFAULT_TEST_USER_LASTNAME))
                .andExpect(jsonPath("$.email").value(DEFAULT_TEST_USER_EMAIL));
    }

    @Test
    @Order(6)
    @DisplayName("it should fail to find a user with an invalid formatted input user id")
    @WithUserDetails(value = "test.admin@test.com")
    public void UserController_Delete_ShouldReturnBadRequestResponse() throws Exception {
        var userId = "aa"; //invalid user id

        mockMvc.perform(delete("/api/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @Order(7)
    @DisplayName("it should fail to delete a user that has never been created")
    @WithUserDetails(value = "test.admin@test.com")
    public void UserController_Delete_ShouldReturnNotFoundResponse() throws Exception {
        var userId = 100L; //user doesn't exist
        mockMvc.perform(delete("/api/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    @Order(8)
    @DisplayName("it should successfully delete a user")
    @WithUserDetails(value = "test.admin@test.com")
    public void UserController_Delete_ShouldReturnOkResponse() throws Exception {
        mockMvc.perform(delete("/api/user/{id}", authenticatedUser.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
