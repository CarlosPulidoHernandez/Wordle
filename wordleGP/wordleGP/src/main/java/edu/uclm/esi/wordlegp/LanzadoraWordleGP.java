package edu.uclm.esi.wordlegp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@ServletComponentScan
public class LanzadoraWordleGP extends SpringBootServletInitializer {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(LanzadoraWordleGP.class, args);
	}
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(LanzadoraWordleGP.class);
    }
}
