package beehive.integration;

import beehive.model.user.UserRegister;
import beehive.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataMongoTest
public class BeehiveAppIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void whenFindByName_thenReturnUserDetails() {
        UserRegister testUser1 = new UserRegister("1","test", "test@beehive.com", "test123", true, "asd123dfscxzx", "22:00");
        entityManager.persistAndFlush(testUser1);

        UserRegister found = userRepository.findById(testUser1.getId()).get();
        assertThat(found.getName()).isEqualTo(testUser1.getName());
    }
}
