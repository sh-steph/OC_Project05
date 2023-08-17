package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    User user1 = new User();
    User user2 = new User();

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
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
    }

    @DisplayName("JUnit test delete User")
    @Test
    void delete() {
        userService.delete(user1.getId());
        verify(userRepository, times(1)).deleteById(user1.getId());
    }

    @DisplayName("JUnit test find user by id")
    @Test
    void findById() {
        when(userRepository.findById(2L)).thenReturn(Optional.of(user2));

        User myFindUser = userService.findById(2L);

        assertEquals(user2.getId(), myFindUser.getId());
        assertEquals(user2.getEmail(), myFindUser.getEmail());
        assertEquals(user2.getLastName(), myFindUser.getLastName());
        assertEquals(user2.getFirstName(), myFindUser.getFirstName());
    }
}
