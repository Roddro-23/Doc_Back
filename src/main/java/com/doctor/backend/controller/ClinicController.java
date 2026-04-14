package com.doctor.backend.controller;

import com.doctor.backend.model.Clinic;
import com.doctor.backend.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clinics")
public class ClinicController {
    @Autowired
    private ClinicService service;

    @GetMapping
    public List<Clinic> getAllClinics() {
        return service.getAllClinics();
    }

    @PostMapping
    public Clinic saveClinic(@RequestBody Clinic clinic) {
        return service.saveClinic(clinic);
    }
}
