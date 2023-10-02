package com.ted.savefood.reviewservice.query.api.queries;

import lombok.Value;

@Value
public class GetReviewsByShopIdQuery {
    private String shopId;
}
