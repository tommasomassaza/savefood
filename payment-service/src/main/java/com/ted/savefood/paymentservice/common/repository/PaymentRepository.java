package com.ted.savefood.paymentservice.common.repository;

import com.ted.savefood.paymentservice.common.model.Payment;
import org.springframework.data.repository.CrudRepository;

public interface PaymentRepository extends CrudRepository<Payment, String> {
}
