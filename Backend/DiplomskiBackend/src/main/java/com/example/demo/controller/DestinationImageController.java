package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.DestinationImage;
import com.example.demo.service.DestinationImageService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/destinationimage")
public class DestinationImageController {

	@Autowired
	DestinationImageService service;
	@PostMapping("/save")
	public DestinationImage saveDestinationImage(@RequestBody DestinationImage image)
	{
		return service.saveDestinationImage(image);
	}
	@GetMapping("/find/{id}")
	public Optional<DestinationImage> findDestinationImageById(@PathVariable int id)
	{
		return service.findDestinationImageById(id);
	}
	@GetMapping("/find/all")
	public List<DestinationImage> findAllDestinationImage()
	{
		return service.findAllDestinationImage();
	}
	@DeleteMapping("/delete/{id}")
	public void deleteDestinationImageById(@PathVariable int id)
	{
		service.deleteDestinationImageById(id);
	}
}
