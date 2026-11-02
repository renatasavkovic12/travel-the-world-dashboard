package com.example.demo.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Review;
import com.example.demo.repository.ReviewRepository;

@Service
public class ReviewService {

	@Autowired
	ReviewRepository repo;
	
	public Review saveReview(Review r)
	{
		return repo.save(r);
	}
	public Optional<Review> findReviewById(int id)
	{
		return repo.findById(id);
	}
	public List<Review> findAllReview()
	{
		return repo.findAll();
	}
	public void deleteReviewById(int id)
	{
		repo.deleteById(id);
	}
}
