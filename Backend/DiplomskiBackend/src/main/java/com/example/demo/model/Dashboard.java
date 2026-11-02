package com.example.demo.model;

import java.util.List;


public class Dashboard {

    private double totalRevenue;
    private long activeTours;
    private long activePassengers;
    private long totalBookings;
    private long totalPassengers;
    private String revenueChange;
    private String activeChange;
    private String bookingChange;
    private String passengerChange;
    private List<RevenueChart> revenueChart;
    private List<ContinentChart> continentChart;
    public Dashboard() {}
    public Dashboard(

            double totalRevenue,

            long activeTours,

            long activePassengers,

            long totalBookings,

            long totalPassengers,

            String revenueChange,

            String activeChange,

            String bookingChange,

            String passengerChange,

            List<RevenueChart> revenueChart,

            List<ContinentChart> continentChart

    ) {
        this.totalRevenue = totalRevenue;
        this.activeTours = activeTours;
        this.activePassengers = activePassengers;
        this.totalBookings = totalBookings;
        this.totalPassengers = totalPassengers;
        this.revenueChange = revenueChange;
        this.activeChange = activeChange;
        this.bookingChange = bookingChange;
        this.passengerChange = passengerChange;
        this.revenueChart = revenueChart;
        this.continentChart = continentChart;
    }
    
    public long getActivePassengers() {
		return activePassengers;
	}
	public void setActivePassengers(long activePassengers) {
		this.activePassengers = activePassengers;
	}
	public double getTotalRevenue() {
        return totalRevenue;
    }
    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
    public long getActiveTours() {
        return activeTours;
    }
    public void setActiveTours(long activeTours) {
        this.activeTours = activeTours;
    }
    public long getTotalBookings() {
        return totalBookings;
    }
    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }
    public long getTotalPassengers() {
        return totalPassengers;
    }
    public void setTotalPassengers(long totalPassengers) {
        this.totalPassengers = totalPassengers;
    }
    public String getRevenueChange() {
        return revenueChange;
    }
    public void setRevenueChange(String revenueChange) {
        this.revenueChange = revenueChange;
    }
    public String getActiveChange() {
        return activeChange;
    }
    public void setActiveChange(String activeChange) {
        this.activeChange = activeChange;
    }
    public String getBookingChange() {
        return bookingChange;
    }
    public void setBookingChange(String bookingChange) {
        this.bookingChange = bookingChange;
    }
    public String getPassengerChange() {
        return passengerChange;
    }
    public void setPassengerChange(String passengerChange) {
        this.passengerChange = passengerChange;
    }
    public List<RevenueChart> getRevenueChart() {
        return revenueChart;
    }
    public void setRevenueChart(List<RevenueChart> revenueChart) {
        this.revenueChart = revenueChart;
    }
    public List<ContinentChart> getContinentChart() {
        return continentChart;
    }
    public void setContinentChart(List<ContinentChart> continentChart) {
        this.continentChart = continentChart;
    }
}