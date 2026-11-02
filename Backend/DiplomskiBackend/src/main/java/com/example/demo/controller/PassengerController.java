package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Passenger;
import com.example.demo.model.PassengerDTO;
import com.example.demo.service.PassengerService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/passenger")
public class PassengerController {
	@Autowired
	PassengerService service;
	@PostMapping(value="/save", consumes = "multipart/form-data")
	public Passenger savePassenger(
	        @RequestPart("passenger") Passenger p,
	        @RequestPart(value="image", required=false) MultipartFile image
	) {

	    return service.savePassenger(p, image);
	}
	@GetMapping("/find/{id}")
	public Optional<Passenger> findPassengerById(@PathVariable int id)
	{
		return service.findPassengerById(id);
	}
	@GetMapping("/find/all")
	public List<Passenger> findAllPassenger()
	{
		return service.findAllPassenger();
	}
	@DeleteMapping("/delete/{id}")
	public void deletePassengerById(@PathVariable int id)
	{
		service.deletePassengerById(id);
	}
	@GetMapping("/find/details")
	public List<PassengerDTO> findPassengerDetails(){

	    return service.getPassengersWithBookings();

	}
	@PutMapping("/{id}")
	public Passenger updatePassenger(
	        @PathVariable int id,
	        @RequestBody Passenger passenger
	) {

	    return service.updatePassenger(id, passenger);

	}
}
