package com.Ecom.SpringEcom.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "SpringEcom backend is running");
        response.put("frontend", "Run the React app on http://localhost:5173");
        response.put("publicEndpoints", new String[]{"GET /", "GET /hello", "GET /products", "GET /product/{id}", "GET /product/{id}/image", "GET /product/search?keyword=..."});
        response.put("securedEndpoints", new String[]{"GET /api/orders", "POST /api/orders/place"});
        response.put("loginUsername", "roel@gmail.com");
        response.put("loginPassword", "123456");
        return response;
    }

    @GetMapping("/hello")
    public String hello() {
        return "Welcome to SpringEcom";
    }
}
