package beehive.repository;

import java.util.Iterator;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import beehive.model.UserRegister;

@Configuration
@EnableMongoRepositories("beehive.repository.*")
public class DBConfig {

	@Bean
	public CommandLineRunner initDatabase(UserRepository repository) {
		return (args) -> {

		};
	}
}
