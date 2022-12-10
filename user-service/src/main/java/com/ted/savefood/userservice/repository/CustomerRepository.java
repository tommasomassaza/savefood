package com.ted.savefood.userservice.repository;

import com.ted.savefood.userservice.model.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Long> {
}
