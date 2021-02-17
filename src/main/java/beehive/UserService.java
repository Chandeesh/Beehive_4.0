package beehive;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

import org.springframework.security.core.userdetails.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import beehive.model.SuccessLogin;
import beehive.model.UserData;
import beehive.model.UserRegister;
import beehive.repository.UserRepository;

@Service
public class UserService implements Services {

	private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");

	@Autowired
	private UserRepository reps;

	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	private List<UserRegister> local;
	private Iterator<UserRegister> itr;

	@Override
	public UserDetails login(String username) {
		boolean status = false;
		String email="";
		String password="";
		local = reps.findAll();
		itr = local.iterator();
		while (itr.hasNext()) {
			UserRegister udata = itr.next();
			 email = udata.getEmail();
			 password = udata.getPassword();
			if (udata.isEnabled()) {
				if (email.equalsIgnoreCase(username)) {
					status = true;
					break;
				}
			}
		}
		if (status) {
			return new User(username, password,
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
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
				
					String date = udata.getTime();
					System.out.println(getHours(date));
					if (getHours(date) < 24) {
						udata.setEnabled(true);
						reps.save(udata);
						status = true;
						break;
					}
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
			if (existingdata.getEmail().equals(userdata.getEmail()) && existingdata.isEnabled()) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			} else if(existingdata.getEmail().equals(userdata.getEmail()) && getHours(existingdata.getTime())>24){
				reps.delete(existingdata);
			}
		}
		String token = UUID.randomUUID().toString();
		UserRegister data = new UserRegister();
		data.setEmail(userdata.getEmail());
		data.setName(userdata.getName());
		data.setPassword(encoder.encode(userdata.getPassword()));
		data.setEnabled(true);
		data.setTime(sdf.format(timestamp));
		data.setToken(token);
		String url = "http://localhost:8080/confirmuser?token=" + token;
		reps.save(data);
		try {
//			sendMail(url, data);
//			reps.save(data);
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
			throw new NullPointerException();
		}
	}

	public Session javaMailService() {

		String host = "smtp.mail.yahoo.com";
		Properties properties = System.getProperties();
		properties.put("mail.smtp.host", host);
		properties.put("mail.smtp.port", "465");
		properties.put("mail.smtp.auth", "true");
		properties.put("mail.smtp.ssl.enable","true");
		properties.put("mail.smtp.ssl.trust", "*");
		
		Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication("chandeesh64@yahoo.com", "sepxlqetqtiacptu");
			}
		});
		session.setDebug(true);
		return session;
	}

	public long getHours(String date) {
		try {
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			Date d1 = sdf.parse(sdf.format(timestamp));
			Date d2 = sdf.parse(date);
			long difference_In_Time = d1.getTime() - d2.getTime();
			long difference_In_Days = (difference_In_Time / (1000 * 60 * 60 * 24)) % 365;
			long difference_In_Hours = (difference_In_Time / (1000 * 60 * 60)) % 24;
			return difference_In_Days * 24 + difference_In_Hours;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
}
