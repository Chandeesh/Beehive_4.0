package beehive.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import beehive.model.UserRegister;

public interface UserRepository extends MongoRepository<UserRegister,String>{

}
