package com.example.workflow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.workflow.model.Role;
import com.example.workflow.model.UserHospital;
import com.example.workflow.repository.UserHospitalRepository;

@SpringBootApplication
@EnableScheduling
public class Application implements CommandLineRunner{
  @Autowired
  private UserHospitalRepository userHospitalRepository;

  public static void main(String... args) {
    SpringApplication.run(Application.class, args);
  }

  public void run(String... args) {
      UserHospital adminAccount = userHospitalRepository.findByRole(Role.ADMIN);
      if(null == adminAccount){
        UserHospital userHospital = new UserHospital();

        userHospital.setEmail("admin@gmail.com");
        userHospital.setFirstName("admin");
        userHospital.setLastName("admin");
        userHospital.setRole(Role.ADMIN);
        userHospital.setPassword(new BCryptPasswordEncoder().encode("admin"));
        userHospitalRepository.save(userHospital);
      }
  }

}