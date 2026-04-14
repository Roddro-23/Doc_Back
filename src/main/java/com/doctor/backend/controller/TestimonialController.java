package com.doctor.backend.controller;

import com.doctor.backend.model.Testimonial;
import com.doctor.backend.service.TestimonialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/testimonials")

public class TestimonialController {
    @Autowired
    private TestimonialService service;

    @GetMapping
    public List<Testimonial> getAllTestimonials() {
        return service.getAllTestimonials();
    }

    @PostMapping
    public Testimonial saveTestimonial(@RequestBody Testimonial testimonial) {
        return service.saveTestimonial(testimonial);
    }
}
