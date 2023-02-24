package com.ted.savefood.shopservice.repository;

import com.ted.savefood.shopservice.model.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<Reservation, Long> {
}
