package beehive;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

import beehive.model.User;
import beehive.model.UserData;

public interface Services {

	public UserDetails login(String username);
	public ResponseEntity<Object> confirmuser(String token);
	public ResponseEntity<Object> registerNewUser(UserData userdata);
}