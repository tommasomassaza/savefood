package com.ted.savefood.boxservice.controller;

import com.ted.savefood.boxservice.model.Box;
import com.ted.savefood.boxservice.repository.BoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/boxes")
public class BoxController {
    @Autowired
    BoxRepository repository;

    @GetMapping
    public List<Box> getAllBoxes() {
        System.out.println("Get all boxes...");

        List<Box> boxes = new LinkedList<>();
        repository.findAll().forEach(boxes::add);

        return boxes;
    }
    
    @PostMapping
    public Box postBox(@RequestBody Box box) {
        Box _box = repository.save(new Box(box.getName(), box.getDescription(), box.getSize(), box.getPickUpTime(), box.getPrice()));
        return _box;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBox(@PathVariable("id") long id) {
        System.out.println("Delete box with ID = " + id + "...");

        repository.deleteById(id);

        return new ResponseEntity<>("Box has been deleted!", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllBoxes() {
        System.out.println("Delete all boxes...");

        repository.deleteAll();

        return new ResponseEntity<>("All boxes have been deleted!", HttpStatus.OK);
    }

    @GetMapping(value = "/size/{size}")
    public List<Box> findBySize(@PathVariable int size) {
        List<Box> boxes = repository.findBySize(size);
        return boxes;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Box> updateBox(@PathVariable("id") long id, @RequestBody Box box) {
        System.out.println("Update box with ID = " + id + "...");

        Optional<Box> boxData = repository.findById(id);

        if (boxData.isPresent()) {
            Box _box = boxData.get();
            _box.setName(box.getName());
            _box.setDescription(box.getDescription());
            _box.setSize(box.getSize());
            _box.setPickUpTime(box.getPickUpTime());
            _box.setPrice(box.getPrice());
            return new ResponseEntity<>(repository.save(_box), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
