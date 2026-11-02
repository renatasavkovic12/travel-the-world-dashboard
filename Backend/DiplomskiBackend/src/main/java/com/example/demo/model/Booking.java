package com.example.demo.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name="booking")
public class Booking {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="package_name")
	private String packageName;
	
	@Column(name="status")
	private String status;
	
	@Column(name="note_en")
	private String noteEn;
	
	@Column(name="note_bs")
	private String noteBs;
	
	@Column(name="created_at")
	private LocalDateTime createdAt;
	@PrePersist
	public void prePersist() {
	    createdAt = LocalDateTime.now();
	}
	@ManyToOne
	@JoinColumn(name="Destination_id")
	@JsonIgnore
	private Destination destination;
	
	@ManyToOne
	@JoinColumn(name="Passenger_id")
	private Passenger passenger;

	@Column(name="total_price")
	private double totalPrice;


	public double getTotalPrice() {
	    return totalPrice;
	}


	public void setTotalPrice(double totalPrice) {
	    this.totalPrice = totalPrice;
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getNoteEn() {
		return noteEn;
	}

	public void setNoteEn(String noteEn) {
		this.noteEn = noteEn;
	}

	public String getNoteBs() {
		return noteBs;
	}

	public void setNoteBs(String noteBs) {
		this.noteBs = noteBs;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Destination getDestination() {
		return destination;
	}

	public void setDestination(Destination destination) {
		this.destination = destination;
	}

	public Passenger getPassenger() {
		return passenger;
	}

	public void setPassenger(Passenger passenger) {
		this.passenger = passenger;
	}
}
