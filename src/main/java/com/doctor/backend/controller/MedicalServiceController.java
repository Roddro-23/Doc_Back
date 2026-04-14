package com.doctor.backend.controller;

import com.doctor.backend.model.MedicalService;
import com.doctor.backend.service.MedicalServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/services")
public class MedicalServiceController {
    @Autowired
    private MedicalServiceService service;

    @GetMapping
    public List<MedicalService> getAllServices() {
        return service.getAllServices();
    }

    @PostMapping
    public MedicalService saveService(@RequestBody MedicalService medicalService) {
        return service.saveService(medicalService);
    }
}
