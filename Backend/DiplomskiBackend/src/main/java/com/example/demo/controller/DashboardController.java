package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Dashboard;
import com.example.demo.service.DashboardService;




@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins="http://localhost:3000")
public class DashboardController {

	@Autowired
	private DashboardService dashboardService;

    @GetMapping
    public Dashboard getDashboard(){
        return dashboardService.getStatistics();
    }

}