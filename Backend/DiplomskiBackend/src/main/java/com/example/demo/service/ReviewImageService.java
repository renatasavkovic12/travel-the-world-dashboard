package com.example.demo.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.ReviewImage;
import com.example.demo.repository.ReviewImageRepository;

@Service
public class ReviewImageService {

	@Autowired
	ReviewImageRepository repo;
	
	public ReviewImage saveReviewImage(ReviewImage image)
	{
		return repo.save(image);
	}
	public Optional<ReviewImage> findReviewImageById(int id)
	{
		return repo.findById(id);
	}
	public List<ReviewImage> findAllReviewImage()
	{
		return repo.findAll();
	}
	public void deleteReviewImageById(int id)
	{
		repo.deleteById(id);
	}
}
