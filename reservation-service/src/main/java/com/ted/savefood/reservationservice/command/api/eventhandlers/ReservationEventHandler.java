package com.ted.savefood.reservationservice.command.api.eventhandlers;

import com.ted.savefood.commonutils.events.OrderReservedEvent;
import com.ted.savefood.reservationservice.common.model.Reservation;
import com.ted.savefood.reservationservice.common.repository.ReservationRepository;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class ReservationEventHandler {

    public ReservationRepository reservationRepository;

    public ReservationEventHandler(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @EventHandler
    public void on(OrderReservedEvent orderReservedEvent){
        Reservation reservation = new Reservation();
        BeanUtils.copyProperties(orderReservedEvent,reservation);

        reservationRepository.save(reservation);
    }
}
