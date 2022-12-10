package com.ted.savefood.reservationservice.repository;

import com.ted.savefood.reservationservice.model.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<Reservation, Long> {
}
