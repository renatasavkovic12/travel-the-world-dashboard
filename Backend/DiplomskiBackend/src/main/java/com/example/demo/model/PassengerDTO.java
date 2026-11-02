package com.example.demo.model;

public class PassengerDTO {

    private int id;
    private String name;
    private String prezime;
    private String email;
    private String avatarUrl;
    private String phoneNumber;
    private String packageName;
    private String status;
    private String noteBs;
    private String noteEn;
    private int bookingId;

    public PassengerDTO(
            int id,
            String name,
            String prezime,
            String email,
            String avatarUrl,
            int bookingId,
            String phoneNumber,
            String packageName,
            String status,
            String noteBs,
            String noteEn
    ) {
        this.id = id;
        this.name = name;
        this.prezime = prezime;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.bookingId = bookingId;
        this.phoneNumber = phoneNumber;
        this.packageName = packageName;
        this.status = status;
        this.noteBs = noteBs;
        this.noteEn = noteEn;
    }
	public String getPrezime() {
		return prezime;
	}
	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAvatarUrl() {
		return avatarUrl;
	}
	public void setAvatarUrl(String avatarUrl) {
		this.avatarUrl = avatarUrl;
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
	public int getBookingId() {
		return bookingId;
	}
	public void setBookingId(int bookingId) {
		this.bookingId = bookingId;
	}
}