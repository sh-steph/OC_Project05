package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import com.openclassrooms.starterjwt.payload.request.SignupRequest;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.security.jwt.JwtUtils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.text.ParseException;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest()
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
class AuthControllerTest {
    @Autowired
    private MockMvc mvc;
    User user;

    @BeforeEach
    public void setup() throws ParseException {

        user = User.builder()
                .id(2L)
                .email("User1@test.com")
                .lastName("lastNameTest")
                .firstName("firstNameTest")
                .password("Test1234-")
                .admin(true)
                .build();
    }

    @Test
    public void registerUserTest() throws Exception {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setEmail(user.getEmail());
        signupRequest.setFirstName(user.getFirstName());
        signupRequest.setLastName(user.getLastName());
        signupRequest.setPassword(user.getPassword());
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/auth/register")
                        .content(asJsonString(signupRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void authenticateUserTest() throws Exception {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(user.getEmail());
        loginRequest.setPassword(user.getPassword());

        mvc.perform(MockMvcRequestBuilders
                        .post("/api/auth/login")
                        .content(asJsonString(loginRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());

        loginRequest.getEmail();
    }
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

//    @Test
//    public void deleteRegisterTest() throws Exception {
//        mvc.perform(MockMvcRequestBuilders
//                        .delete("/api/user/{userId}", 15)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//    }
}
