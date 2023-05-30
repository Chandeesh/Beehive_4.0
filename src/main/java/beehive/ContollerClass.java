package beehive;

import beehive.model.user.User;
import beehive.model.user.UserData;
import beehive.service.user.Services;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin()
@RequestMapping(path = "/beehives")
public class ContollerClass {

	@Autowired
	Services userservice;

	@PostMapping(path = "/login", consumes = "application/json", produces = "application/json")
	public UserDetails loginUser(@RequestBody User user) {
		return userservice.login(user.getEmail());
	}

	@PutMapping("/registeruser")
	public ResponseEntity<Object> registerUser(@RequestBody UserData userdata) {
		return userservice.registerNewUser(userdata);
	}

	@GetMapping("/confirmuser")
	public ResponseEntity<Object> confirmuser(@RequestParam String token) {
		return userservice.confirmuser(token);
	}

}