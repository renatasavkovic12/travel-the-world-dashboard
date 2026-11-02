package com.example.demo.model;
public class BookingRequest {

    private String packageName;
    private String status;
    private String noteBs;
    private String noteEn;
    private double totalPrice;

    private int destinationId;
    private int passengerId;


    public int getDestinationId() {
        return destinationId;
    }

    public int getPassengerId() {
        return passengerId;
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

	public String getNoteBs() {
		return noteBs;
	}

	public void setNoteBs(String noteBs) {
		this.noteBs = noteBs;
	}

	public String getNoteEn() {
		return noteEn;
	}

	public void setNoteEn(String noteEn) {
		this.noteEn = noteEn;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public void setDestinationId(int destinationId) {
		this.destinationId = destinationId;
	}

	public void setPassengerId(int passengerId) {
		this.passengerId = passengerId;
	}
}