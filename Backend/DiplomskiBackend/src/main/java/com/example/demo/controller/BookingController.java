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
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Booking;
import com.example.demo.model.BookingRequest;
import com.example.demo.service.BookingService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/booking")
public class BookingController {
	
	@Autowired
	BookingService service;

	@PostMapping("/save")
	public Booking saveBooking(@RequestBody BookingRequest request)
	{
	    return service.saveBooking(request);
	}
	@GetMapping("/find/{id}")
	public Optional<Booking> findBookingById(@PathVariable int id)
	{
		return service.findBookingById(id);
	}
	@GetMapping("/find/all")
	public List<Booking> findAllBooking()
	{
		return service.findAllBooking();
	}
	@DeleteMapping("/delete/{id}")
	public void deleteBookingById(@PathVariable int id)
	{
		service.deleteBookingById(id);
	}
	 @PutMapping("/{id}")
	    public Booking updateBooking(
	            @PathVariable int id,
	            @RequestBody Booking booking
	    ){
	        return service.updateBooking(id, booking);
	    }
}
