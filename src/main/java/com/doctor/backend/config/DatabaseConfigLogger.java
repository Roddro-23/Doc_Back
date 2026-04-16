package com.doctor.backend.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseConfigLogger {

    @Value("${spring.datasource.url:NOT_SET}")
    private String url;

    @Value("${spring.datasource.username:NOT_SET}")
    private String username;

    @Value("${spring.datasource.password:NOT_SET}")
    private String password;

    @PostConstruct
    public void logConfig() {
        System.out.println("########## DATABASE CONFIG CHECK ##########");
        System.out.println("JDBC URL: " + maskUrl(url));
        System.out.println("Username: " + username);
        System.out.println("Password Length: " + (password != null ? password.length() : "null"));
        System.out.println("Password (Masked): " + maskPassword(password));
        System.out.println("###########################################");
    }

    private String maskUrl(String url) {
        if (url == null || url.equals("NOT_SET")) return url;
        // Mask the password if it's in the URL
        return url.replaceAll(":[^:@/]+@", ":****@");
    }

    private String maskPassword(String pass) {
        if (pass == null || pass.length() < 4) return "****";
        return pass.substring(0, 2) + "****" + pass.substring(pass.length() - 2);
    }
}
