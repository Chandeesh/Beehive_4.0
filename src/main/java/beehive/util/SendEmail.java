package beehive.util;

import beehive.model.user.UserRegister;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class SendEmail {

    public void triggerMail(String url, UserRegister data) {
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
    private Session javaMailService() {

        String host = "smtp.mail.yahoo.com";
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.ssl.enable","true");
        properties.put("mail.smtp.ssl.trust", "*");

        Session session = Session.getInstance(properties, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("chandeesh64@yahoo.com", "sepxlqetqtiacptu");
            }
        });
        session.setDebug(true);
        return session;
    }
}