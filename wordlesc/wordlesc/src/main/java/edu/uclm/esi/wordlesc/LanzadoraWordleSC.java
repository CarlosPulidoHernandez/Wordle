package edu.uclm.esi.wordlesc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@ServletComponentScan
public class LanzadoraWordleSC extends SpringBootServletInitializer {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(LanzadoraWordleSC.class, args);
	}
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(LanzadoraWordleSC.class);
    }
}
