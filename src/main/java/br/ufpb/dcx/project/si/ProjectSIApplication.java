package br.ufpb.dcx.project.si;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ProjectSIApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectSIApplication.class, args);
	}
}