package com.ted.savefood.reviewservice.common.repository;

import com.ted.savefood.reviewservice.common.model.Review;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReviewRepository extends CrudRepository<Review, String> {
    List<Review> findAllByShopId(String shopId);
}
