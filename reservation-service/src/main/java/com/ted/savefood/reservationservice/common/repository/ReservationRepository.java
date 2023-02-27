package com.ted.savefood.reservationservice.common.repository;

import com.ted.savefood.reservationservice.common.model.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<Reservation,String> {
}
