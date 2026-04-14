package com.doctor.backend.controller;

import com.doctor.backend.model.ContactRequest;
import com.doctor.backend.service.ContactRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactRequestController {
    @Autowired
    private ContactRequestService service;

    @GetMapping
    public List<ContactRequest> getAllRequests() {
        return service.getAllRequests();
    }

    @PostMapping
    public ContactRequest saveRequest(@RequestBody ContactRequest request) {
        return service.saveRequest(request);
    }
}
