package com.example.demo.service;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Continent;
import com.example.demo.repository.ContinentRepository;

@Service
public class ContinentService {

	@Autowired
	ContinentRepository repo;
	

	private final String uploadDir = "uploads/";


    public Continent saveContinent(Continent c, MultipartFile image) {

        if(image != null && !image.isEmpty()) {

            try {
                String originalName = image.getOriginalFilename();
                String fileName = UUID.randomUUID() 
                        + "_" 
                        + originalName;
               Path path = Paths.get(uploadDir + fileName);
                
                Files.createDirectories(path.getParent());
                Files.write(path, image.getBytes());
                c.setImageUrl("/uploads/" + fileName);

            } catch(IOException e) {
                throw new RuntimeException("Greška pri spremanju slike", e);
            }
        }
        return repo.save(c);
    }
	public Optional<Continent> findContinentById(int id)
	{
		return repo.findById(id);
	}
	public List<Continent> findAllContinent()
	{
		return repo.findAll();
	}
	public void deleteContinentById(int id)
	{
		Continent continent = repo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Continent not found"));

	    repo.delete(continent);
	}
}
