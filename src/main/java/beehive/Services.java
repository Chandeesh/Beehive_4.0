package beehive;

import org.springframework.http.ResponseEntity;
import beehive.model.User;
import beehive.model.UserData;

public interface Services {

	public ResponseEntity<Object> login(User user);
	public ResponseEntity<Object> confirmuser(String token);
	public ResponseEntity<Object> registerNewUser(UserData userdata);
}