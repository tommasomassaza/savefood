package com.ted.savefood.shopservice.controller;

import com.ted.savefood.shopservice.model.Shop;
import com.ted.savefood.shopservice.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shops")
public class ShopController {
    @Autowired
    ShopRepository repository;

    @GetMapping
    public List<Shop> getAllShops() {
        System.out.println("Get all shops...");

        List<Shop> shops = new LinkedList<>();
        repository.findAll().forEach(shops::add);

        return shops;
    }

    @PostMapping
    public Shop postShop(@RequestBody Shop shop) {
        Shop _shop = repository.save(new Shop(shop.getName(), shop.getAddress(), shop.getDescription(), shop.getTelephoneNumber()));
        return _shop;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShop(@PathVariable("id") long id) {
        System.out.println("Delete shop with ID = " + id + "...");

        repository.deleteById(id);

        return new ResponseEntity<>("Shop has been deleted!", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllShops() {
        System.out.println("Delete all shops...");

        repository.deleteAll();

        return new ResponseEntity<>("All shops have been deleted!", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shop> updateShop(@PathVariable("id") long id, @RequestBody Shop shop) {
        System.out.println("Update shop with ID = " + id + "...");

        Optional<Shop> shopData = repository.findById(id);

        if (shopData.isPresent()) {
            Shop _shop = shopData.get();
            _shop.setName(shop.getName());
            _shop.setAddress(shop.getAddress());
            _shop.setDescription(shop.getDescription());
            _shop.setTelephoneNumber(shop.getTelephoneNumber());
            return new ResponseEntity<>(repository.save(_shop), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
