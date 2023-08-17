package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TeacherServiceTest {

    @InjectMocks
    private TeacherService teacherService;
    Teacher teacher1 = new Teacher();
    Teacher teacher2 = new Teacher();
    List<Teacher> teacherList = new ArrayList<>();

    @Mock
    private TeacherRepository teacherRepository;

    @BeforeEach
    public void setup() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime createdAt = LocalDateTime.parse("2023-08-14T15:10:05", formatter);
        teacher1 = Teacher.builder()
                .id(1L)
                .lastName("Nassim")
                .firstName("Sahili")
                .createdAt(createdAt)
                .updatedAt(LocalDateTime.now())
                .build();
        teacher2 = Teacher.builder()
                .id(1L)
                .lastName("Jesse")
                .firstName("Rocket")
                .createdAt(createdAt)
                .updatedAt(LocalDateTime.now())
                .build();
        teacherList.add(teacher1);
        teacherList.add(teacher2);
    }

    @DisplayName("JUnit test Find All Teacher")
    @Test
    void findAllTeacherTest() {
        when(teacherRepository.findAll()).thenReturn(teacherList);
        List<Teacher> myTeacherList = teacherService.findAll();
        assertNotNull(myTeacherList);
        assertEquals(2, myTeacherList.size());
    }

    @DisplayName("JUnit test Find Teacher by id")
    @Test
    void findByIdTeacherTest() {
        when(teacherRepository.findById(teacher1.getId())).thenReturn(Optional.of(teacher1));
        Teacher myTeacher = teacherService.findById(1L);
        assertNotNull(myTeacher);
        assertEquals(teacher1.getId(), myTeacher.getId());
        assertEquals(teacher1.getLastName(), myTeacher.getLastName());
        assertEquals(teacher1.getFirstName(), myTeacher.getFirstName());
    }
}
