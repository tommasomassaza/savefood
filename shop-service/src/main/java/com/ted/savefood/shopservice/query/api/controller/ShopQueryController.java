package com.ted.savefood.shopservice.query.api.controller;

import com.ted.savefood.shopservice.common.modelDto.ShopDto;
import com.ted.savefood.shopservice.query.api.queries.GetShopsQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shops")
public class ShopQueryController {

    private final QueryGateway queryGateway;

    public ShopQueryController(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }

    @GetMapping
    public List<ShopDto> getAllBoxes() {
        GetShopsQuery getShopsQuery = new GetShopsQuery();

        return queryGateway.query(
                        getShopsQuery,
                        ResponseTypes.multipleInstancesOf(ShopDto.class))
                .join();
    }
}
