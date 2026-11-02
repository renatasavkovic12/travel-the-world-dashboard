package com.example.demo.service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Destination;
import com.example.demo.model.DestinationImage;
import com.example.demo.repository.DestinationRepository;

@Service
public class DestinationService {

	@Autowired
	DestinationRepository repo;
	public Destination saveDestination(Destination d)
	{
		return repo.save(d);
	}
	public Optional<Destination> findDestinationById(int id)
	{
		return repo.findById(id);
	}
	public List<Destination> findAllDestination()
	{
		return repo.findAll();
	}
	public void deleteDestinationById(int id)
	{
		repo.deleteById(id);
	}
	public Destination saveDestination(
	        Destination destination,
	        MultipartFile image
	) throws IOException {


	    if(image != null && !image.isEmpty()) {


	        String fileName =
	                UUID.randomUUID()
	                + "_"
	                + image.getOriginalFilename();


	        Path uploadPath =
	                Paths.get("uploads");
	       

	        if(!Files.exists(uploadPath)){
	            Files.createDirectories(uploadPath);
	        }


	        Files.copy(
	                image.getInputStream(),
	                uploadPath.resolve(fileName)
	        );


	        DestinationImage destinationImage =
	                new DestinationImage();


	        destinationImage.setImageUrl(
	                "/uploads/" + fileName
	        );


	        destinationImage.setDestination(destination);


	        destination.getImages().add(destinationImage);
	    }
	    return repo.save(destination);
	}
	public Destination updateDestination(
	        int id,
	        Destination newData,
	        MultipartFile image
	) throws IOException {

	    Destination destination = repo.findById(id)
	            .orElseThrow();

	    destination.setTitleBs(newData.getTitleBs());
	    destination.setTitleEn(newData.getTitleEn());

	    destination.setTypeBs(newData.getTypeBs());
	    destination.setTypeEn(newData.getTypeEn());

	    destination.setPrice(newData.getPrice());

	    destination.setDeparture(newData.getDeparture());
	    destination.setReturnDate(newData.getReturnDate());

	    destination.setNights(newData.getNights());

	    destination.setTotalSeats(newData.getTotalSeats());

	    destination.setItineraryBs(newData.getItineraryBs());
	    destination.setItineraryEn(newData.getItineraryEn());

	    destination.setContinent(newData.getContinent());


	    if(image != null && !image.isEmpty()) {

	        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

	        Path uploadPath = Paths.get("uploads/destinations/");

	        if(!Files.exists(uploadPath)) {
	            Files.createDirectories(uploadPath);
	        }

	        Files.copy(
	            image.getInputStream(),
	            uploadPath.resolve(fileName),
	            StandardCopyOption.REPLACE_EXISTING
	        );

	        DestinationImage destinationImage = new DestinationImage();
	        destinationImage.setImageUrl("/uploads/destinations/" + fileName);
	        destinationImage.setIsMain(true);
	        destinationImage.setSortOrder(1);
	        destinationImage.setDestination(destination);
	        destination.getImages().clear();
	        destination.getImages().add(destinationImage);
	    }

	    return repo.save(destination);
	}
}
