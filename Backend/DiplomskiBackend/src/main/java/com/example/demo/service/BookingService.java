package com.example.demo.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Booking;
import com.example.demo.model.BookingRequest;
import com.example.demo.model.Destination;
import com.example.demo.model.Passenger;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.DestinationRepository;
import com.example.demo.repository.PassengerRepository;

@Service
public class BookingService {

	@Autowired
	BookingRepository repo;
	@Autowired
	DestinationRepository destinationRepository;
	@Autowired
	PassengerRepository passengerRepository;
	public Booking saveBooking(BookingRequest request){

	    Booking booking = new Booking();

	    booking.setPackageName(request.getPackageName());
	    booking.setStatus(request.getStatus());
	    booking.setNoteBs(request.getNoteBs());
	    booking.setNoteEn(request.getNoteEn());


	    Destination destination =
	        destinationRepository.findById(request.getDestinationId())
	        .orElseThrow();


	    Passenger passenger =
	        passengerRepository.findById(request.getPassengerId())
	        .orElseThrow();


	    booking.setDestination(destination);
	    booking.setPassenger(passenger);

	    booking.setTotalPrice(destination.getPrice());
	    return repo.save(booking);
	}
	public Optional<Booking> findBookingById(int id)
	{
		return repo.findById(id);
	}
	public List<Booking> findAllBooking()
	{
		return repo.findAll();
	}
	public void deleteBookingById(int id)
	{
		repo.deleteById(id);
	}
	public Booking updateBooking(int id, Booking booking){

	    Booking existing = repo.findById(id)
	            .orElseThrow();


	    existing.setStatus(booking.getStatus());
	    existing.setNoteEn(booking.getNoteEn());
	    existing.setNoteBs(booking.getNoteBs());

	    return repo.save(existing);
	}
}
