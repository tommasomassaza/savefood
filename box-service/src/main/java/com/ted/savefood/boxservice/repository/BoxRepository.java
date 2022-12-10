package com.ted.savefood.boxservice.repository;

import com.ted.savefood.boxservice.model.Box;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BoxRepository extends CrudRepository<Box, Long> {
    List<Box> findBySize(int size);
}
