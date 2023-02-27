package com.ted.savefood.paymentservice.command.api.eventhandler;

import com.ted.savefood.commonfunctionality.events.CancelPaymentEvent;
import com.ted.savefood.commonfunctionality.events.PaymentProcessedEvent;
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
    public void on(CancelPaymentEvent cancelPaymentEvent){
        Payment payment = paymentRepository.findById(cancelPaymentEvent.getPaymentId()).get();

        payment.setPaymentStatus(cancelPaymentEvent.getPaymentStatus());

        paymentRepository.save(payment);
    }
}
