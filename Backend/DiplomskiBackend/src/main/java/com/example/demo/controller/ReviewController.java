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

import com.example.demo.model.Review;
import com.example.demo.service.ReviewService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/review")
public class ReviewController {

	@Autowired
	ReviewService service;
	@PostMapping("/save")
	public Review saveReview(@RequestBody Review r)
	{
		return service.saveReview(r);
	}
	@GetMapping("/find/{id}")
	public Optional<Review> findReviewById(@PathVariable int id)
	{
		return service.findReviewById(id);
	}
	@GetMapping("/find/all")
	public List<Review> findAllReview()
	{
		return service.findAllReview();
	}
	@DeleteMapping("/delete/{id}")
	public void deleteReviewById(@PathVariable int id)
	{
		service.deleteReviewById(id);
	}
}
