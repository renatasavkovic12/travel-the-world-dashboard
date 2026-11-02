package com.example.demo.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.DestinationImage;
import com.example.demo.repository.DestinationImageRepository;

@Service
public class DestinationImageService {

	@Autowired
	DestinationImageRepository repo;
	
	public DestinationImage saveDestinationImage(DestinationImage image)
	{
		return repo.save(image);
	}
	public Optional<DestinationImage> findDestinationImageById(int id)
	{
		return repo.findById(id);
	}
	public List<DestinationImage> findAllDestinationImage()
	{
		return repo.findAll();
	}
	public void deleteDestinationImageById(int id)
	{
		repo.deleteById(id);
	}
}
