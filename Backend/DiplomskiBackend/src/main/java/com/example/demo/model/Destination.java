package com.example.demo.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="destination")
public class Destination {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="title_bs")
	private String titleBs;
	
	@Column(name="title_en")
	private String titleEn;
	
	@Column(name="type_bs")
	private String typeBs;
	
	@Column(name="type_en")
	private String typeEn;
	
	@Column(name="price")
	private double price;
	
	@Column(name="total_seats")
	private int totalSeats;
	
	@Column(name="booked_seats")
	private int bookedSeats;
	
	@Column(name="departure")
	private LocalDate departure;
	
	@Column(name="return_date")
	private LocalDate returnDate;
	
	@Column(name="nights")
	private int nights;
	
	@Column(name="itinerary_bs")
	private String itineraryBs;
	
	@Column(name="itinerary_en")
	private String itineraryEn;
	
	@ManyToOne
	@JoinColumn(name = "Continent_id")
	private Continent continent;

	@OneToMany(mappedBy = "destination")
	@JsonIgnore
	private List<Booking> bookings;
	
	@OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, fetch = FetchType.EAGER,orphanRemoval = true)
	private List<DestinationImage> images = new ArrayList<>();
	
	
	public List<Booking> getBookings() {
		return bookings;
	}

	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}

	public List<DestinationImage> getImages() {
		return images;
	}

	public void setImages(List<DestinationImage> images) {
		this.images = images;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitleBs() {
		return titleBs;
	}

	public void setTitleBs(String titleBs) {
		this.titleBs = titleBs;
	}

	public String getTitleEn() {
		return titleEn;
	}

	public void setTitleEn(String titleEn) {
		this.titleEn = titleEn;
	}

	public String getTypeBs() {
		return typeBs;
	}

	public void setTypeBs(String typeBs) {
		this.typeBs = typeBs;
	}

	public String getTypeEn() {
		return typeEn;
	}

	public void setTypeEn(String typeEn) {
		this.typeEn = typeEn;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public int getTotalSeats() {
		return totalSeats;
	}

	public void setTotalSeats(int totalSeats) {
		this.totalSeats = totalSeats;
	}

	public int getBookedSeats() {
		return bookedSeats;
	}

	public void setBookedSeats(int bookedSeats) {
		this.bookedSeats = bookedSeats;
	}

	public LocalDate getDeparture() {
		return departure;
	}

	public void setDeparture(LocalDate departure) {
		this.departure = departure;
	}

	public LocalDate getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}

	public int getNights() {
		return nights;
	}

	public void setNights(int nights) {
		this.nights = nights;
	}

	public String getItineraryBs() {
		return itineraryBs;
	}

	public void setItineraryBs(String itineraryBs) {
		this.itineraryBs = itineraryBs;
	}

	public String getItineraryEn() {
		return itineraryEn;
	}

	public void setItineraryEn(String itineraryEn) {
		this.itineraryEn = itineraryEn;
	}

	public Continent getContinent() {
		return continent;
	}

	public void setContinent(Continent continent) {
		this.continent = continent;
	}
}
