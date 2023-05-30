package beehive;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
 

@SpringBootApplication
@EnableMongoRepositories("beehive.repository")
public class BeehiveApp {
 
    public static void main(String[] args) {
        SpringApplication.run(BeehiveApp.class, args);
    }
}