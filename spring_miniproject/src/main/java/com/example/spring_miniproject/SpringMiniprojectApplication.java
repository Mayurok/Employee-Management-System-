package com.example.spring_miniproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.spring_miniproject.Repo")
public class SpringMiniprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringMiniprojectApplication.class, args);
	}

}
