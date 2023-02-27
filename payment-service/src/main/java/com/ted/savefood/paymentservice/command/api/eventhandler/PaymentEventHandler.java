package com.ted.savefood.paymentservice.command.api.eventhandler;

import com.ted.savefood.commonutils.events.PaymentCancelledEvent;
import com.ted.savefood.commonutils.events.PaymentProcessedEvent;
import com.ted.savefood.paymentservice.common.model.Payment;
import com.ted.savefood.paymentservice.common.repository.PaymentRepository;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class PaymentEventHandler {
    private PaymentRepository paymentRepository;

    @Autowired
    public PaymentEventHandler(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @EventHandler
    public void on(PaymentProcessedEvent paymentProcessedEvent){
        Payment payment
                = Payment.builder()
                .paymentId(paymentProcessedEvent.getPaymentId())
                .orderId(paymentProcessedEvent.getOrderId())
                .paymentStatus("COMPLETED")
                .timeStamp(new Date())
                .build();

        paymentRepository.save(payment);
    }

    @EventHandler
    public void on(PaymentCancelledEvent paymentCancelledEvent){
        Payment payment = paymentRepository.findById(paymentCancelledEvent.getPaymentId()).get();

        payment.setPaymentStatus(paymentCancelledEvent.getPaymentStatus());

        paymentRepository.save(payment);
    }
}
