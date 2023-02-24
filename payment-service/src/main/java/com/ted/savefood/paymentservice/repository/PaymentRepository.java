package com.ted.savefood.paymentservice.repository;

import com.ted.savefood.paymentservice.model.Payment;
import org.springframework.data.repository.CrudRepository;

public interface PaymentRepository extends CrudRepository<Payment, String> {
}
