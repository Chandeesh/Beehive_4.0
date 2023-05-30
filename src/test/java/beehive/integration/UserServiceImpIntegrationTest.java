package beehive.integration;

import beehive.model.user.UserRegister;
import beehive.repository.UserRepository;
import beehive.service.user.Services;
import beehive.service.user.UserServiceImpl;
import beehive.util.SendEmail;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(SpringRunner.class)
public class UserServiceImpIntegrationTest {

    @TestConfiguration
    static class UserServiceImplTestConfiguration {
        @Bean
        public Services services() {
            return new UserServiceImpl();
        }
    }

    @Autowired
    private Services services;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private SendEmail sendEmail;

    @Before
    public void setUp() {
        UserRegister testUser1 = new UserRegister("test", "test@beehive.com", "test123", true, "asd123dfscxzx", "22:00");
        UserRegister testUser2 = new UserRegister("test2", "test2@beehive.com", "test123", false, "asd123dfscxzx", "22:00");

        List<UserRegister> allUsers = Arrays.asList(testUser1, testUser2);

        Mockito.when(userRepository.findById(testUser1.getId())).thenReturn(Optional.of(testUser1));
        Mockito.when(userRepository.findById(testUser2.getId())).thenReturn(Optional.of(testUser2));
        Mockito.when(userRepository.findAll()).thenReturn(allUsers);
    }

    @Test
    public void whenValidName_thenUserShouldBeFound() {
        String name = "test@beehive.com";
        UserDetails found = services.login(name);

        assertThat(found.getUsername()).isEqualTo(name);
    }

}
