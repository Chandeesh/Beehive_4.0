package beehive;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.UUID;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.Message;
import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import beehive.model.SuccessLogin;
import beehive.model.User;
import beehive.model.UserData;
import beehive.model.UserRegister;
import beehive.repository.UserRepository;

@Service
public class UserService implements Services {

	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");

	@Autowired
	private UserRepository reps;

	private List<UserRegister> local;
	private Iterator<UserRegister> itr;

	@Override
	public ResponseEntity<Object> login(User user) {
		boolean status = false;
		SuccessLogin resp = null;
		local = reps.findAll();
		itr = local.iterator();
		while (itr.hasNext()) {
			UserRegister udata = itr.next();
			String email = udata.getEmail();
			String password = udata.getPassword();
			if (udata.isEnabled()) {
				if (user.getEmail().equalsIgnoreCase(email) && user.getPassword().equals(password)) {
					status = true;
				}
			}
		}
		if (status) {
			return ResponseEntity.ok(resp);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Object> confirmuser(String token) {
		boolean status = false;
		local = reps.findAll();
		itr = local.iterator();
		while (itr.hasNext()) {
			UserRegister udata = itr.next();
			if (udata.getToken().equals(token)) {
				System.out.println("Token Matches");
				udata.setEnabled(true);
				reps.save(udata);
				status = true;
				break;
			}
		}
		if (status) {
			return ResponseEntity.status(200).build();
		} else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

	}

	@Override
	public ResponseEntity<Object> registerNewUser(UserData userdata) {
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		local = reps.findAll();
		itr = local.iterator();
		while (itr.hasNext()) {
			UserRegister existingdata = itr.next();
			if (existingdata.getEmail().equals(userdata.getEmail())) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		}
		String token = UUID.randomUUID().toString();
		UserRegister data = new UserRegister();
		data.setEmail(userdata.getEmail());
		data.setName(userdata.getName());
		data.setPassword(userdata.getPassword());
		data.setEnabled(false);
		data.setTime(sdf.format(timestamp));
		data.setToken(token);
		reps.save(data);
		String url = "http://localhost:8080/confirmuser?token=" + token;
		try {
			sendMail(url, data);
			return ResponseEntity.status(200).build();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private void sendMail(String url, UserRegister data) {
		try {
			MimeMessage message = new MimeMessage(javaMailService());
			message.setFrom(new InternetAddress("chandeesh64@yahoo.com"));
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(data.getEmail()));
			message.setSubject("Activation Link");
			message.setText(url);
			Transport.send(message);
		} catch (MessagingException ex) {
		}
	}

	public Session javaMailService() {

		String host = "smtp.mail.yahoo.com";
		Properties properties = System.getProperties();
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", "587");
		properties.put("mail.smtp.starttls.enable", "true");
		properties.put("mail.smtp.auth", "true");

		Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("chandeesh64@yahoo.com", "sepxlqetqtiacptu");
			}
		});
		session.setDebug(true);
		return session;
	}
}
