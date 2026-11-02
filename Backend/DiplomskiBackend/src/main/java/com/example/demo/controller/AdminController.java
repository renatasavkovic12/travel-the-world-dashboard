package com.example.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Admin;
import com.example.demo.service.AdminService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired 
	AdminService service;
	
	@GetMapping("/current")
	public Admin getAdmin(){
	    return service.findAdmin();
	}
	 @PostMapping("/login")
	    public boolean login(@RequestBody Admin admin){

	        Admin existing = service.findByUsername(admin.getUsername());

	        if(existing != null &&
	           existing.getPassword().equals(admin.getPassword()))
	        {
	            return true;
	        }

	        return false;
	    }
	 @PutMapping("/password")
	 public Admin updatePassword(@RequestBody Admin admin) {

	     Admin existing = service.findByUsername(admin.getUsername());

	     existing.setPassword(admin.getPassword());

	     return service.save(existing);
	 }
}
