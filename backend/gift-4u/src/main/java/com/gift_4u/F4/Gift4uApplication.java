package com.gift_4u.F4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class Gift4uApplication {

	public static void main(String[] args) {
		SpringApplication.run(Gift4uApplication.class, args);
	}

}
