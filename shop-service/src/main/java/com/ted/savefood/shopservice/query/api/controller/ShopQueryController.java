package com.ted.savefood.shopservice.query.api.controller;

import com.ted.savefood.shopservice.common.modelDto.ShopDto;
import com.ted.savefood.shopservice.query.api.queries.GetShopQuery;
import com.ted.savefood.shopservice.query.api.queries.GetShopsBySellerQuery;
import com.ted.savefood.shopservice.query.api.queries.GetShopsQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public List<ShopDto> getAllShops() {
        GetShopsQuery getShopsQuery = new GetShopsQuery();

        return queryGateway.query(
                        getShopsQuery,
                        ResponseTypes.multipleInstancesOf(ShopDto.class))
                .join();
    }

    @GetMapping("/{sellerId}")
    public List<ShopDto> getAllShops(@PathVariable String sellerId) {
        GetShopsBySellerQuery getShopsBySellerQuery = new GetShopsBySellerQuery(sellerId);

        return queryGateway.query(
                        getShopsBySellerQuery,
                        ResponseTypes.multipleInstancesOf(ShopDto.class))
                .join();
    }

    @GetMapping("/{shopId}")
    public ShopDto getShopById(@PathVariable String shopId) {
        GetShopQuery getShopQuery = new GetShopQuery(shopId);

        return queryGateway.query(
                        getShopQuery,
                        ResponseTypes.instanceOf(ShopDto.class))
                .join();
    }
}
