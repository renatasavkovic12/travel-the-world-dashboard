package com.example.demo.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Booking;
import com.example.demo.model.ContinentChart;
import com.example.demo.model.Dashboard;
import com.example.demo.model.Destination;
import com.example.demo.model.Passenger;
import com.example.demo.model.RevenueChart;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.DestinationRepository;
import com.example.demo.repository.PassengerRepository;
@Service
public class DashboardService {


    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private DestinationRepository destinationRepository;

    @Autowired
    private PassengerRepository passengerRepository;

    public Dashboard getStatistics(){
        List<Booking> bookings =
                bookingRepository.findAll();
        List<Destination> destinations =
                destinationRepository.findAll();
        List<Passenger> passengers =
                passengerRepository.findAll();
        double revenue =
                bookings.stream()
                .filter(b ->
                    !"CANCELLED".equals(b.getStatus())
                )
                .mapToDouble(
                    Booking::getTotalPrice
                )
                .sum();
        YearMonth currentMonth =
                getLastBookingMonth(bookings);
        YearMonth previousMonth =
                currentMonth.minusMonths(1);
        long activeTours =
                getActiveToursForDate(
                    destinations,
                    LocalDate.now()
                );
        long activePassengers =
        	    getActivePassengersOnTour(
        	        bookings,
        	        LocalDate.now()
        	    );
        long currentActive =
                getActiveToursForMonth(
                    destinations,
                    currentMonth
                );
        long previousActive =
                getActiveToursForMonth(
                    destinations,
                    previousMonth
                );
        double activePercentage =
                calculatePercentageChange(
                    currentActive,
                    previousActive
                );
        long totalBookings =
                bookings.stream()
                .filter(b ->
                    !"CANCELLED".equals(b.getStatus())
                )
                .count();
        long totalPassengers =
                passengerRepository.count();
        long currentPassengers =
                getPassengersForMonth(
                    passengers,
                    currentMonth
                );
        long previousPassengers =
                getPassengersForMonth(
                    passengers,
                    previousMonth
                );
        double passengerPercentage =
                calculatePercentageChange(
                    currentPassengers,
                    previousPassengers
                );
        List<RevenueChart> revenueChart =
                new ArrayList<>();
        for(int i = 5; i >= 0; i--){
            YearMonth month =
                    YearMonth.now()
                    .minusMonths(i);
            double monthRevenue =
                    getRevenueForMonth(
                        bookings,
                        month
                    );
            revenueChart.add(
                new RevenueChart(
                    month.getMonth()
                    .toString(),
                    monthRevenue
                )
            );
        }
        List<ContinentChart> continentChart =
                bookings.stream()
                .filter(b ->
                    !"CANCELLED".equals(b.getStatus())
                )
                .collect(Collectors.groupingBy(
                    b -> b.getDestination().getContinent(),
                    Collectors.counting()
                ))
                .entrySet()
                .stream()
                .map(e ->
                    new ContinentChart(
                        e.getKey().getNameEn(),
                        e.getKey().getNameBs(),
                        e.getValue()
                    )
                )
                .toList();
        long currentBookings =
                getBookingsForMonth(
                    bookings,
                    currentMonth
                );
        long previousBookings =
                getBookingsForMonth(
                    bookings,
                    previousMonth
                );
        double bookingPercentage =
                calculatePercentageChange(
                    currentBookings,
                    previousBookings
                );
        double currentRevenue =
                getRevenueForMonth(
                    bookings,
                    currentMonth
                );
        double previousRevenue =
                getRevenueForMonth(
                    bookings,
                    previousMonth
                );
        double revenuePercentage =
                calculatePercentageChange(
                    currentRevenue,
                    previousRevenue
                );
        String revenueChange =
                formatPercentage(
                    revenuePercentage
                );
        String bookingChange =
                formatPercentage(
                    bookingPercentage
                );
        String activeChange =
                formatPercentage(
                    activePercentage
                );
        String passengerChange =
                formatPercentage(
                    passengerPercentage
                );

        return new Dashboard(
        	    revenue,
        	    activeTours,
        	    activePassengers,
        	    totalBookings,
        	    totalPassengers,
        	    revenueChange,
        	    activeChange,
        	    bookingChange,
        	    passengerChange,
        	    revenueChart,
        	    continentChart
        	);

    }
    private long getPassengersForMonth(
            List<Passenger> passengers,
            YearMonth month
    ){

        return passengers.stream()

                .filter(p ->
                    p.getCreatedAt() != null
                )

                .filter(p ->
                    YearMonth.from(
                        p.getCreatedAt()
                    )
                    .equals(month)
                )

                .count();

    }
    private long getActivePassengersOnTour(List<Booking> bookings, LocalDate date) {

        System.out.println("=================================");
        System.out.println("DANAS: " + date);
        System.out.println("=================================");

        for (Booking b : bookings) {

            if (b.getDestination() == null) {
                System.out.println("Booking " + b.getId() + " -> NEMA DESTINACIJU");
                continue;
            }

            System.out.println(
                "Booking " + b.getId()
                + " | status = " + b.getStatus()
                + " | passenger = "
                + (b.getPassenger() != null ? b.getPassenger().getId() : "NULL")
                + " | departure = " + b.getDestination().getDeparture()
                + " | returnDate = " + b.getDestination().getReturnDate()
            );
        }

        long result = bookings.stream()
                .filter(b -> !"CANCELLED".equals(b.getStatus()))
                .filter(b -> b.getDestination() != null)
                .filter(b -> b.getDestination().getDeparture() != null)
                .filter(b -> b.getDestination().getReturnDate() != null)
                .filter(b -> !b.getDestination().getDeparture().isAfter(date))
                .filter(b -> !b.getDestination().getReturnDate().isBefore(date))
                .map(Booking::getPassenger)
                .filter(p -> p != null)
                .distinct()
                .count();

        System.out.println("=================================");
        System.out.println("AKTIVNI PUTNICI = " + result);
        System.out.println("=================================");

        return result;
    }
    private long getActiveToursForMonth(
            List<Destination> destinations,
            YearMonth month
    ){
        return destinations.stream()

                .filter(d ->
                    d.getDeparture() != null
                )

                .filter(d ->
                    YearMonth.from(
                        d.getDeparture()
                    )
                    .equals(month)
                )

                .count();
    }
    private double calculatePercentageChange(
            double current,
            double previous
    ){
        if(previous == 0){
            return 0;
        }
        return ((current - previous)
                / previous) * 100;
    }
    private YearMonth getLastBookingMonth(
            List<Booking> bookings
    ){
        return bookings.stream()

                .filter(b ->
                    b.getCreatedAt() != null
                )

                .map(b ->
                    YearMonth.from(
                        b.getCreatedAt()
                    )
                )

                .max(Comparator.naturalOrder())

                .orElse(
                    YearMonth.now()
                );
    }
    private double getRevenueForMonth(
            List<Booking> bookings,
            YearMonth month
    ){
        return bookings.stream()

                .filter(b ->
                    YearMonth.from(
                        b.getCreatedAt()
                    )
                    .equals(month)
                )
                .filter(b ->
                    !"CANCELLED"
                    .equals(b.getStatus())
                )
                .mapToDouble(
                    Booking::getTotalPrice
                )
                .sum();

    }
    private long getBookingsForMonth(
            List<Booking> bookings,
            YearMonth month
    ){
        return bookings.stream()

                .filter(b ->
                    YearMonth.from(
                        b.getCreatedAt()
                    )
                    .equals(month)
                )
                .filter(b ->
                    !"CANCELLED"
                    .equals(b.getStatus())
                ).count();
    }
    private String formatPercentage(
            double value
    ){
        return String.format(
            "%+.1f%%",
            value
        );
    }
    private long getActiveToursForDate(
            List<Destination> destinations,
            LocalDate date
    ){
        return destinations.stream()
                .filter(d ->
                    d.getDeparture()
                    .isAfter(date)
                )
                .count();
    }
}