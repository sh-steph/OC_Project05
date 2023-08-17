package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
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
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class SessionServiceTest {

    @InjectMocks
    private SessionService sessionService;
    Teacher teacher = new Teacher();
    Session session = new Session();
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

        String dateString = "2023-08-14";
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(dateString);
        session = Session.builder()
                .id(1L)
                .name("Yoga session 1")
                .date(date)
                .teacher(teacher)
                .users(null)
                .description("Yoga session description 1")
                .build();
    }

    @DisplayName("JUnit test Create session")
    @Test
    void createSessionTest() {
        when(sessionRepository.save(session)).thenReturn(session);

        Session createdSession = sessionService.create(session);

        assertNotNull(createdSession);
        assertEquals(session.getId(), createdSession.getId());
        assertEquals(session.getName(), createdSession.getName());
        assertEquals(session.getTeacher(), createdSession.getTeacher());
        assertEquals(session.getUsers(), createdSession.getUsers());
        assertEquals(session.getDescription(), createdSession.getDescription());
        verify(sessionRepository, times(1)).save(session);
    }
}