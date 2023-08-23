package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import static org.junit.jupiter.api.Assertions.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@ExtendWith(MockitoExtension.class)
class SessionServiceTest {

    @InjectMocks
    private SessionService sessionService;
    Teacher teacher = new Teacher();
    Session session1 = new Session();
    Session session2 = new Session();
    List<Session> sessionList = new ArrayList<>();
    User user1 = new User();
    User user2 = new User();
    List<User> userList = new ArrayList<>();
    @Mock
    SessionRepository sessionRepository;
    @Mock
    UserRepository userRepository;

    @BeforeEach
    public void setup() throws ParseException {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime createdAt = LocalDateTime.parse("2023-08-14T15:10:05", formatter);
        teacher = Teacher.builder()
                .id(1L)
                .lastName("Nassim")
                .firstName("Sahili")
                .createdAt(createdAt)
                .updatedAt(LocalDateTime.now())
                .build();
        user1 = User.builder()
                .id(1L)
                .email("User1@test.com")
                .lastName("lastNameTest")
                .firstName("firstNameTest")
                .password("Test1234-")
                .admin(true)
                .build();
        user2 = User.builder()
                .id(2L)
                .email("User2@test.com")
                .lastName("lastNameTest2")
                .firstName("firstNameTest2")
                .password("Test1234-")
                .admin(false)
                .build();
        userList = Arrays.asList(user1, user2);
        String dateString = "2023-08-14";
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(dateString);
        session1 = Session.builder()
                .id(1L)
                .name("Yoga session 1")
                .date(date)
                .teacher(teacher)
                .users(null)
                .description("Yoga session1 description 1")
                .build();
        session2 = Session.builder()
                .id(2L)
                .name("Yoga advanced session 2")
                .date(date)
                .teacher(teacher)
                .users(userList)
                .description("Yoga session advanced description 2")
                .build();
        sessionList = Arrays.asList(session1, session2);
    }

    @DisplayName("JUnit test Create session")
    @Test
    void createSessionTest() {
        when(sessionRepository.save(session1)).thenReturn(session1);
        Session createdSession = sessionService.create(session1);
        assertNotNull(createdSession);
        // Compare all the content at once
        assertThat(session1).isEqualTo(createdSession);
        // Compare all the content one by one
        assertThat(session1).isEqualToComparingFieldByFieldRecursively(createdSession);
    }

    @DisplayName("JUnit test Delete session1")
    @Test
    void deleteSessionTest() {
        sessionService.delete(session1.getId());
        verify(sessionRepository, times(1)).deleteById(session1.getId());
    }

    @DisplayName("JUnit test Find all session")
    @Test
    void findAllSessionTest() {
        when(sessionRepository.findAll()).thenReturn(sessionList);
        List<Session> findMySessionList = sessionService.findAll();
        assertThat(sessionList).isEqualTo(findMySessionList);
    }

    @DisplayName("JUnit test Find session by id")
    @Test
    void getByIdSessionTest() {
        when(sessionRepository.findById(session1.getId())).thenReturn(Optional.of(session1));

        Session findMySession = sessionService.getById(session1.getId());

        assertNotNull(findMySession);
        assertThat(session1).isEqualTo(findMySession);
    }

    @DisplayName("JUnit test Update session")
    @Test
    void updateSessionTest() {
        Session updatedSession = Session.builder()
                .id(2L)
                .name("Updated Yoga session 2")
                .date(new Date())
                .teacher(teacher)
                .users(null)
                .description("Updated Yoga session description 2")
                .build();
        when(sessionRepository.save(updatedSession)).thenReturn(updatedSession);

        Session myUpdatedSession = sessionService.update(session1.getId(), updatedSession);

        assertNotNull(myUpdatedSession);
        assertThat(updatedSession).isEqualTo(myUpdatedSession);
    }

    @DisplayName("JUnit test User1 participate session1")
    @Test
    void participateSessionTest() {
        session1.setUsers(new ArrayList<>());

        when(sessionRepository.findById(session1.getId())).thenReturn(Optional.of(session1));
        when(userRepository.findById(user1.getId())).thenReturn(Optional.of(user1));

        sessionService.participate(session1.getId(), user1.getId());

        assertTrue(session1.getUsers().contains(user1));
        verify(sessionRepository, times(1)).save(session1);
    }

    @DisplayName("JUnit test User2 don't participate on session2 anymore")
    @Test
    void noLongerParticipateSessionTest() {
        when(sessionRepository.findById(session2.getId())).thenReturn(Optional.of(session2));

        sessionService.noLongerParticipate(session2.getId(), user2.getId());

        assertFalse(session2.getUsers().contains(user2));
        verify(sessionRepository, times(1)).save(session2);
    }
}
