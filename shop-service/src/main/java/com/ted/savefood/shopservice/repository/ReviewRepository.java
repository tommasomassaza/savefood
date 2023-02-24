package com.ted.savefood.shopservice.repository;

import com.ted.savefood.shopservice.model.Review;
import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, Long> {
}
