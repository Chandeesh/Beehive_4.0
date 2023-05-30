package beehive.repository;

import beehive.model.user.UserRegister;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<UserRegister,String>{

}
