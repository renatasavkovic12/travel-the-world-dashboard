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

import com.example.demo.model.ReviewImage;
import com.example.demo.service.ReviewImageService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reviewimage")
public class ReviewImageController {

	@Autowired
	ReviewImageService service;
	@PostMapping("/save")
	public ReviewImage saveReviewImage(@RequestBody ReviewImage image)
	{
		return service.saveReviewImage(image);
	}
	@GetMapping("/find/{id}")
	public Optional<ReviewImage> findReviewImageById(@PathVariable int id)
	{
		return service.findReviewImageById(id);
	}
	@GetMapping("/find/all")
	public List<ReviewImage> findAllReviewImage()
	{
		return service.findAllReviewImage();
	}
	@DeleteMapping("/delete/{id}")
	public void deleteReviewImageById(@PathVariable int id)
	{
		service.deleteReviewImageById(id);
	}
}
