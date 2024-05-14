package com.fca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.fca.model.dto.User;

@SpringBootApplication
public class FcaRestApi1Application {

	public static void main(String[] args) {
		SpringApplication.run(FcaRestApi1Application.class, args);
		User user = new User();
	}

}
