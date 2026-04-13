package com.dcg.digi_cap_group;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableScheduling
@EnableTransactionManagement
public class DigiCapGroupApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigiCapGroupApplication.class, args);
	}

}
