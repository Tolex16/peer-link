package com.plk.peer_link;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableScheduling
@EnableTransactionManagement
public class PeerLinkApplication {

	public static void main(String[] args) {
		SpringApplication.run(PeerLinkApplication.class, args);
	}

}
