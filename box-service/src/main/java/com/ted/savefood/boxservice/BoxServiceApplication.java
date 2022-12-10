package com.ted.savefood.boxservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class BoxServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BoxServiceApplication.class, args);
    }

}
