package com.ted.savefood.shopservice.command.api.eventHandler;

import com.ted.savefood.shopservice.command.api.events.ReviewCancelledEvent;
import com.ted.savefood.shopservice.command.api.events.ReviewCreatedEvent;
import com.ted.savefood.shopservice.command.api.events.ShopCreatedEvent;
import com.ted.savefood.shopservice.common.model.Review;
import com.ted.savefood.shopservice.common.model.Shop;
import com.ted.savefood.shopservice.common.repository.ReviewRepository;
import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class ReviewEventHandler {
    private final ReviewRepository reviewRepository;

    public ReviewEventHandler(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @EventHandler
    public void on(ReviewCreatedEvent reviewCreatedEvent) {
        Review review = new Review();
        BeanUtils.copyProperties(reviewCreatedEvent, review);

        reviewRepository.save(review);
    }
    @EventHandler
    public void on(ReviewCancelledEvent reviewCancelledEvent) {
        reviewRepository.deleteById(reviewCancelledEvent.getReviewId());
    }
}
