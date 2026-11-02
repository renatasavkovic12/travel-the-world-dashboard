package com.example.demo.service;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Booking;
import com.example.demo.model.Passenger;
import com.example.demo.model.PassengerDTO;
import com.example.demo.repository.PassengerRepository;

@Service
public class PassengerService {

	@Autowired
	PassengerRepository repo;
	public Passenger savePassenger(
	        Passenger p,
	        MultipartFile image
	) {

	    try {

	        if(image != null && !image.isEmpty()) {


	            String uploadDir = "uploads/passengers/";

	            Path uploadPath = Paths.get(uploadDir);


	            if(!Files.exists(uploadPath)){
	                Files.createDirectories(uploadPath);
	            }


	            String fileName =
	                    System.currentTimeMillis()
	                    + "_"
	                    + image.getOriginalFilename();


	            Path filePath =
	                    uploadPath.resolve(fileName);


	            Files.copy(
	                    image.getInputStream(),
	                    filePath,
	                    StandardCopyOption.REPLACE_EXISTING
	            );


	            p.setAvatarUrl(
	                "/uploads/passengers/" + fileName
	            );

	        }


	        return repo.save(p);


	    } catch(Exception e){

	        throw new RuntimeException(
	            "Greška kod upload slike",
	            e
	        );}

	    }
	public Optional<Passenger> findPassengerById(int id)
	{
		return repo.findById(id);
	}
	public List<Passenger> findAllPassenger()
	{
		return repo.findAll();
	}
	public void deletePassengerById(int id)
	{
		repo.deleteById(id);
	}
	public List<PassengerDTO> getPassengersWithBookings(){

	    List<Passenger> passengers = repo.findAll();

	    return passengers.stream()
	            .map(p -> {


	                if(p.getBookings() == null || p.getBookings().isEmpty()) {


	                    return new PassengerDTO(
	                            p.getId(),
	                            p.getName(),
	                            p.getPrezime(),
	                            p.getEmail(),
	                            p.getAvatarUrl(),
	                            0,
	                            p.getPhoneNumber(),
	                            "",
	                            "",
	                            "",
	                            ""
	                    );

	                }

	                Booking booking = p.getBookings().get(0);
	                return new PassengerDTO(
	                        p.getId(),
	                        p.getName(),
	                        p.getPrezime(),
	                        p.getEmail(),
	                        p.getAvatarUrl(),
	                        booking.getId(),
	                        p.getPhoneNumber(),
	                        booking.getPackageName(),
	                        booking.getStatus(),
	                        booking.getNoteBs(),
	                        booking.getNoteEn()
	                );

	            })
	            .toList();
	}
	public Passenger updatePassenger(int id, Passenger passenger) {

	    Passenger existing = repo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Passenger not found"));

	    existing.setName(passenger.getName());
	    existing.setPrezime(passenger.getPrezime());
	    existing.setEmail(passenger.getEmail());
	    existing.setPhoneNumber(passenger.getPhoneNumber());
	    existing.setAvatarUrl(passenger.getAvatarUrl());
	    return repo.save(existing);
	}
}
