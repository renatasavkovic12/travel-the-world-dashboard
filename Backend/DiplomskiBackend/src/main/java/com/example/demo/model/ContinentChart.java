package com.example.demo.model;

public class ContinentChart {


    private String continentEn;
    private String continentBs;
    private long bookings;

    public ContinentChart() {}

    public ContinentChart(
            String continentEn,String continentBs,
            long bookings
    ){
        this.continentEn = continentEn;
        this.continentBs = continentBs;
        this.bookings = bookings;
    }
    public String getContinentEn() {
		return continentEn;
	}

	public void setContinentEn(String continentEn) {
		this.continentEn = continentEn;
	}

	public String getContinentBs() {
		return continentBs;
	}

	public void setContinentBs(String continentBs) {
		this.continentBs = continentBs;
	}

	public long getBookings(){
        return bookings;
    }
    public void setBookings(long bookings){
        this.bookings = bookings;
    }
}