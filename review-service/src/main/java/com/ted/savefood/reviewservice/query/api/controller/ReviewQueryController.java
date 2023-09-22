package com.ted.savefood.reviewservice.query.api.controller;

import com.ted.savefood.reviewservice.common.modelDto.ReviewDto;
import com.ted.savefood.reviewservice.query.api.queries.GetReviewsByShopId;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewQueryController {

    private final QueryGateway queryGateway;

    public ReviewQueryController(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }

    @GetMapping("/{shopId}")
    public List<ReviewDto> getReviewsByShopId(@PathVariable String shopId) {
        GetReviewsByShopId getReviewsByShopId = new GetReviewsByShopId(shopId);

        return queryGateway.query(
                        getReviewsByShopId,
                        ResponseTypes.multipleInstancesOf(ReviewDto.class))
                .join();
    }
}
