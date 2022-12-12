package com.ted.savefood.reviewservice.repository;

import com.ted.savefood.reviewservice.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface ReviewRepository extends CrudRepository<Review, Long>, JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {
}

