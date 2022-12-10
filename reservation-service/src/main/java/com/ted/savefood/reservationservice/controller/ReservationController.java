package com.ted.savefood.reservationservice.controller;

import com.ted.savefood.reservationservice.model.Reservation;
import com.ted.savefood.reservationservice.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {
    @Autowired
    ReservationRepository repository;

    @GetMapping
    public List<Reservation> getAllrReservations() {
        System.out.println("Get all reservations...");

        List<Reservation> reservations = new LinkedList<>();
        repository.findAll().forEach(reservations::add);

        return reservations;
    }

    @PostMapping
    public Reservation postReservation(@RequestBody Reservation reservation) {
        Reservation _reservation = repository.save(new Reservation(reservation.getTransactionTime(), reservation.getPaymentMethod()));
        return _reservation;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable("id") long id) {
        System.out.println("Delete reservation with ID = " + id + "...");

        repository.deleteById(id);

        return new ResponseEntity<>("Reservation has been deleted!", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllReservations() {
        System.out.println("Delete all reservations...");

        repository.deleteAll();

        return new ResponseEntity<>("All reservations have been deleted!", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable("id") long id, @RequestBody Reservation reservation) {
        System.out.println("Update reservation with ID = " + id + "...");

        Optional<Reservation> reservationData = repository.findById(id);

        if (reservationData.isPresent()) {
            Reservation _reservation = reservationData.get();
            _reservation.setTransactionTime(reservation.getTransactionTime());
            _reservation.setPaymentMethod(reservation.getPaymentMethod());
            return new ResponseEntity<>(repository.save(_reservation), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
