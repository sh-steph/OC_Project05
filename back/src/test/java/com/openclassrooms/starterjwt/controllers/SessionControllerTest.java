package com.openclassrooms.starterjwt.controllers;

import com.jayway.jsonpath.JsonPath;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.payload.request.LoginRequest;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static com.openclassrooms.starterjwt.controllers.TeacherControllerTest.asJsonString;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest()
@AutoConfigureMockMvc
@DirtiesContext
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ExtendWith(SpringExtension.class)
class SessionControllerTest {

    @Autowired
    private MockMvc mvc;
    private String getType;
    private String getToken;
    Teacher teacher1 = new Teacher();
    Teacher teacher2 = new Teacher();
    private SessionDto session1 = new SessionDto();
    SessionDto session2 = new SessionDto();
    List<SessionDto> sessionList = new ArrayList<>();
    User user1 = new User();
    User user2 = new User();
    List<User> userList = new ArrayList<>();

    String dateString = "2023-08-14";
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

    @BeforeEach
    void setUp() throws ParseException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime createdAt = LocalDateTime.parse("2023-08-14T15:10:05", formatter);
        Date date = dateFormat.parse(dateString);
        teacher1 = Teacher.builder()
                .id(1L)
                .lastName("Nassim")
                .firstName("Sahili")
                .createdAt(createdAt)
                .updatedAt(LocalDateTime.now())
                .build();
        teacher2 = Teacher.builder()
                .id(1L)
                .lastName("Nassim")
                .firstName("Sahili")
                .createdAt(createdAt)
                .updatedAt(LocalDateTime.now())
                .build();
        user1 = User.builder()
                .id(1L)
                .email("User1Session@test.com")
                .lastName("lastNameSessionTest")
                .firstName("firstNameSessionTest")
                .password("Test1234-")
                .admin(true)
                .build();
        user2 = User.builder()
                .id(2L)
                .email("User2Session@test.com")
                .lastName("lastNameSessionTest2")
                .firstName("firstNameSessionTest2")
                .password("Test1234-")
                .admin(false)
                .build();
        userList = Arrays.asList(user1, user2);

        session1 = SessionDto.builder()
                .name("Yoga session test 1")
                .date(date)
                .teacher_id(teacher1.getId())
                .users(null)
                .description("Yoga session test description 1")
                .build();

        session2 = SessionDto.builder()
                .name("Yoga advanced session test 2")
                .date(date)
                .teacher_id(teacher2.getId())
                .description("Yoga session advanced test description 2")
                .users(null)
                .build();
        sessionList = Arrays.asList(session1, session2);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    @Order(1)
    public void authenticateUserTest() throws Exception {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("yoga@studio.com");
        loginRequest.setPassword("test!1234");

        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders
                        .post("/api/auth/login")
                        .content(asJsonString(loginRequest))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.type").value("Bearer"))
                .andDo(print())
                .andReturn();

        String responseBody = mvcResult.getResponse().getContentAsString();
        getType = JsonPath.read(responseBody, "$.type");
        getToken = JsonPath.read(responseBody, "$.token");
    }

    @Test
    @Order(2)
    void createSessionTest() throws Exception {
        authenticateUserTest();
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/session")
                        .header("Authorization", getType + " " +getToken)
                        .content(asJsonString(session2))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(3)
    void findSessionByIdTest() throws Exception {
        authenticateUserTest();
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/session/{sessionId}", 1)
                        .header("Authorization", getType + " " +getToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(4)
    void findAllSessionsTest() throws Exception {
        authenticateUserTest();
        mvc.perform(MockMvcRequestBuilders
                        .get("/api/session")
                        .header("Authorization", getType + " " +getToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(5)
    void updateSessionTest() throws Exception {
        authenticateUserTest();
        mvc.perform(MockMvcRequestBuilders
                        .put("/api/session/{sessionId}", 1)
                        .header("Authorization", getType + " " +getToken)
                        .content(asJsonString(session2))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(6)
    void participateSessionTest() throws Exception {
        authenticateUserTest();
        mvc.perform(MockMvcRequestBuilders
                        .post("/api/session/{sessionId}/participate/{userId}", 1,1)
                        .header("Authorization", getType + " " +getToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(7)
    void noLongerParticipateSessionTest() throws Exception {
        authenticateUserTest();
//        participateSessionTest();
        mvc.perform(MockMvcRequestBuilders
                        .delete("/api/session/{sessionId}/participate/{userId}", 1,1)
                        .header("Authorization", getType + " " +getToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(8)
    void deleteSessionTest() throws Exception {
        authenticateUserTest();
        mvc.perform(MockMvcRequestBuilders
                        .delete("/api/session/{sessionId}", 1)
                        .header("Authorization", getType + " " +getToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @Order(9)
    @Sql(executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD, scripts = "classpath:cleanDB.sql")
    public void resetDatabase() {
    }
}
