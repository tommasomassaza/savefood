package com.ted.savefood.reviewservice.controller;

import com.ted.savefood.reviewservice.model.Customer;
import com.ted.savefood.reviewservice.model.Review;
import com.ted.savefood.reviewservice.model.Shop;
import com.ted.savefood.reviewservice.repository.ReviewRepository;
import jakarta.persistence.criteria.Join;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @Autowired
    ReviewRepository repository;

    @GetMapping
    public List<Review> getAllReviews() {
        System.out.println("Get all reviews...");

        List<Review> reviews = new LinkedList<>();
        repository.findAll().forEach(reviews::add);

        return reviews;
    }

    @PostMapping
    public Review postReview(@RequestBody Review review) {
        Review _review = repository.save(new Review(review.getDescription(), review.getStars()));
        return _review;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable("id") long id) {
        System.out.println("Delete review with ID = " + id + "...");

        repository.deleteById(id);

        return new ResponseEntity<>("Review has been deleted!", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteAllReviews() {
        System.out.println("Delete all reviews...");

        repository.deleteAll();

        return new ResponseEntity<>("All reviews have been deleted!", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable("id") long id, @RequestBody Review review) {
        System.out.println("Update review with ID = " + id + "...");

        Optional<Review> reviewData = repository.findById(id);

        if (reviewData.isPresent()) {
            Review _review = reviewData.get();
            _review.setDescription(review.getDescription());
            _review.setStars(review.getStars());
            return new ResponseEntity<>(repository.save(_review), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //region CUSTOM CODE
    public static Specification<Review> hasShopWithId(long id) {
        return (root, query, criteriaBuilder) -> {
            Join<Review, Shop> ShopReviews = root.join("reviews");
            return criteriaBuilder.equal(ShopReviews.get("id"), id);
        };
    }

    @GetMapping("/joinshop")
    //restituisce una lista di reviews fatte al negozio con Id 1
    public List<Review> SearchReviewByShopId() {

        Specification<Review> specification = hasShopWithId('1');

        List<Review> reviews = new LinkedList<>();
        repository.findAll(specification).forEach(reviews::add);

        return reviews;

    }



    public static Specification<Review> hasCustomerWithEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            Join<Review, Customer> CustomerReviews = root.join("reviews");
            return criteriaBuilder.equal(CustomerReviews.get("email"), "obelix@gmail.com");
        };
    }

    @GetMapping("/joincustomer")
    //restituisce una lista di reviews fatte al negozio con Id 1
    public List<Review> SearchReserviewByCustomerEmail() {

        Specification<Review> specification = hasCustomerWithEmail("obelix@gmail.com");

        List<Review> reviews = new LinkedList<>();
        repository.findAll(specification).forEach(reviews::add);

        return reviews;

    }

    //endregion


}
