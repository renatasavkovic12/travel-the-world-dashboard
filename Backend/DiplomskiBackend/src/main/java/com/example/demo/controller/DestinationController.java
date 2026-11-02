package com.example.demo.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
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

import com.example.demo.model.Destination;
import com.example.demo.service.DestinationService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/destination")
public class DestinationController {

	@Autowired
	DestinationService service;
	@PostMapping("/save")
	public Destination saveDestination(@RequestBody Destination d)
	{
		return service.saveDestination(d);
	}
	@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Destination saveDestination(
	        @RequestPart("destination") Destination destination,
	        @RequestPart(value = "image", required = false) MultipartFile image
	) throws IOException {

	    return service.saveDestination(destination, image);
	}
	@GetMapping("/find/{id}")
	public Optional<Destination> findDestinationById(@PathVariable int id)
	{
		return service.findDestinationById(id);
	}
	@GetMapping("/find/all")
	public List<Destination> findAllDestination()
	{
		return service.findAllDestination();
	}
	@DeleteMapping("/delete/{id}")
	public void deleteDestinationById(@PathVariable int id)
	{
		service.deleteDestinationById(id);
	}
	@PutMapping(value="/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Destination updateDestination(
	        @PathVariable int id,
	        @RequestPart("destination") Destination destination,
	        @RequestPart(value = "image", required = false) MultipartFile image
	) throws IOException {

	    return service.updateDestination(id, destination, image);
	}
}
