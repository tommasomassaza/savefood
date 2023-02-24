package com.ted.savefood.shopservice.repository;

import com.ted.savefood.shopservice.model.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
}
