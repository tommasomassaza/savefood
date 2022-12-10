package com.ted.savefood.reviewservice.repository;

import com.ted.savefood.reviewservice.model.Review;
import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, Long> {
}
