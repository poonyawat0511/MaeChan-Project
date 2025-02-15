package com.example.workflow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.workflow.model.Role;
import com.example.workflow.model.StockUser;
import com.example.workflow.repository.StockUserRepository;

@SpringBootApplication
@EnableScheduling
public class Application implements CommandLineRunner{
  @Autowired
  private StockUserRepository stockUserRepository;

  public static void main(String... args) {
    SpringApplication.run(Application.class, args);
  }

  public void run(String... args) {
      StockUser adminAccount = stockUserRepository.findByRole(Role.ADMIN);
      if(null == adminAccount){
        StockUser stockUser = new StockUser();

        stockUser.setEmail("admin@gmail.com");
        stockUser.setFirstName("admin");
        stockUser.setLastName("admin");
        stockUser.setRole(Role.ADMIN);
        stockUser.setPassword(new BCryptPasswordEncoder().encode("admin"));
        stockUserRepository.save(stockUser);
      }
  }

}