package beehive.service.user;

import beehive.model.user.UserData;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface Services {

	UserDetails login(String username);
	ResponseEntity<Object> confirmuser(String token);
	ResponseEntity<Object> registerNewUser(UserData userdata);
}