package com.ted.savefood.userservice.controller;

import com.ted.savefood.userservice.model.Customer;
import com.ted.savefood.userservice.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    @Autowired
    CustomerRepository repository;

    @GetMapping
    public List<Customer> getAllCustomers() {
        System.out.println("Get all customers...");

        List<Customer> customers = new LinkedList<>();
        repository.findAll().forEach(customers::add);

        return customers;
    }

    @PostMapping
    public Customer postCustomer(@RequestBody Customer customer) {
        Customer _customer = repository.save(new Customer(customer.getEmail(), customer.getPassword(), customer.getGeographicLocation()));
        return _customer;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable("id") long id) {
        System.out.println("Delete customer with ID = " + id + "...");

        repository.deleteById(id);

        return new ResponseEntity<>("Customer has been deleted!", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllCustomers() {
        System.out.println("Delete all customer...");

        repository.deleteAll();

        return new ResponseEntity<>("All customer have been deleted!", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable("id") long id, @RequestBody Customer customer) {
        System.out.println("Update customer with ID = " + id + "...");

        Optional<Customer> customerData = repository.findById(id);

        if (customerData.isPresent()) {
            Customer _customer = customerData.get();
            _customer.setEmail(customer.getEmail());
            _customer.setPassword(customer.getPassword());
            _customer.setGeographicLocation(customer.getGeographicLocation());
            return new ResponseEntity<>(repository.save(_customer), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}