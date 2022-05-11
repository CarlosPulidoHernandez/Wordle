package edu.uclm.esi.wordleplayer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@ServletComponentScan
public class LanzadoraWordlePlayer extends SpringBootServletInitializer {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(LanzadoraWordlePlayer.class, args);
	}
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(LanzadoraWordlePlayer.class);
    }
}
