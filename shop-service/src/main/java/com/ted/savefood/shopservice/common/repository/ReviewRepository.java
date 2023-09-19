package com.ted.savefood.shopservice.common.repository;

import com.ted.savefood.shopservice.common.model.Review;
import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, String> {
}
