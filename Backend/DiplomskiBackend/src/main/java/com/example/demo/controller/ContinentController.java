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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Continent;
import com.example.demo.service.ContinentService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/continent")
public class ContinentController {

	@Autowired
	ContinentService service;
	@PostMapping(value="/save", consumes="multipart/form-data")
	public Continent saveContinent(
	        @RequestPart("continent") Continent c,
	        @RequestPart(value="image", required=false) MultipartFile image
	) {

	    return service.saveContinent(c, image);
	}
	@GetMapping("/find/{id}")
	public Optional<Continent> findContinentById(@PathVariable int id)
	{
		return service.findContinentById(id);
	}
	@GetMapping("/find/all")
	public List<Continent> findAllContinent()
	{
		return service.findAllContinent();
	}
	@DeleteMapping("/delete/{id}")
	public void deleteContinentById(@PathVariable int id)
	{
		service.deleteContinentById(id);
	}
}
