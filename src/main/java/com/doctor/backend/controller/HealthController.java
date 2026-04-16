package com.doctor.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/health")
    public Map<String, Object> health() {
        try {
            Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return Map.of(
                "status", "UP",
                "database", "Connected",
                "test_query", result
            );
        } catch (Exception e) {
            return Map.of(
                "status", "DOWN",
                "database", "Connection failed",
                "error", e.getMessage()
            );
        }
    }
}
