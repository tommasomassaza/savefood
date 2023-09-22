package com.ted.savefood.reviewservice.query.api.projection;

import com.ted.savefood.reviewservice.common.model.Review;
import com.ted.savefood.reviewservice.common.modelDto.ReviewDto;
import com.ted.savefood.reviewservice.common.repository.ReviewRepository;
import com.ted.savefood.reviewservice.query.api.queries.GetReviewsByShopId;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReviewProjection {
    private final ReviewRepository reviewRepository;

    public ReviewProjection(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @QueryHandler
    public List<ReviewDto> handle(GetReviewsByShopId getReviewsByShopId) {
        List<Review> reviews = new LinkedList<>();
        reviewRepository.findAllByShopId(getReviewsByShopId.getShopId()).forEach(reviews::add);

        return reviews.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private ReviewDto toDto(Review review) {
        ReviewDto reviewDto = new ReviewDto();
        BeanUtils.copyProperties(review, reviewDto);

        return reviewDto;
    }
}
