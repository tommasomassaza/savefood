package com.ted.savefood.userservice.controller;

import com.ted.savefood.userservice.model.Seller;
import com.ted.savefood.userservice.repository.SellerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {
    @Autowired
    SellerRepository repository;

    @GetMapping
    public List<Seller> getAllSellers() {
        System.out.println("Get all sellers...");

        List<Seller> sellers = new LinkedList<>();
        repository.findAll().forEach(sellers::add);

        return sellers;
    }

    @PostMapping
    public Seller postSeller(@RequestBody Seller seller) {
        Seller _seller = repository.save(new Seller(seller.getEmail(), seller.getPassword()));
        return _seller;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSeller(@PathVariable("id") long id) {
        System.out.println("Delete seller with ID = " + id + "...");

        repository.deleteById(id);

        return new ResponseEntity<>("Seller has been deleted!", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllSellers() {
        System.out.println("Delete all sellers...");

        repository.deleteAll();

        return new ResponseEntity<>("All sellers have been deleted!", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Seller> updateSeller(@PathVariable("id") long id, @RequestBody Seller seller) {
        System.out.println("Update seller with ID = " + id + "...");

        Optional<Seller> sellerData = repository.findById(id);

        if (sellerData.isPresent()) {
            Seller _seller = sellerData.get();
            _seller.setEmail(seller.getEmail());
            _seller.setPassword(seller.getPassword());
            return new ResponseEntity<>(repository.save(_seller), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}