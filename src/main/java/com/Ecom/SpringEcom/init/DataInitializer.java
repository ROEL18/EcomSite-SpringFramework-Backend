package com.Ecom.SpringEcom.init;

import com.Ecom.SpringEcom.model.User;
import com.Ecom.SpringEcom.repo.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        return args -> {
            createOrUpdateUser(userRepo, passwordEncoder, "Roel Christy", "roel@gmail.com", "123456", "ROLE_USER");
            createOrUpdateUser(userRepo, passwordEncoder, "Admin User", "admin@gmail.com", "123456", "ROLE_ADMIN");
        };
    }

    private void createOrUpdateUser(UserRepo userRepo, PasswordEncoder passwordEncoder,
                                    String name, String email, String rawPassword, String role) {
        User user = userRepo.findByEmail(email).orElseGet(User::new);
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setRole(role);
        userRepo.save(user);
    }
}
