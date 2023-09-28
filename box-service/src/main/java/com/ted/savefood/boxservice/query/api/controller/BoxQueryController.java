package com.ted.savefood.boxservice.query.api.controller;

import com.ted.savefood.boxservice.common.modelDto.BoxDto;
import com.ted.savefood.boxservice.query.api.queries.GetBoxQuery;
import com.ted.savefood.boxservice.query.api.queries.GetBoxesByShopQuery;
import com.ted.savefood.boxservice.query.api.queries.GetBoxesQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/boxes")
public class BoxQueryController {

    private final QueryGateway queryGateway;

    public BoxQueryController(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }

    @GetMapping("/{city}")
    public List<BoxDto> getAllBoxes(@PathVariable String city) {
        GetBoxesQuery getBoxesQuery = new GetBoxesQuery(city);

        return queryGateway.query(
                getBoxesQuery,
                ResponseTypes.multipleInstancesOf(BoxDto.class))
                .join();
    }

    @GetMapping("/getByShopId/{shopId}")
    public List<BoxDto> getAllBoxesByShopId(@PathVariable String shopId) {
        GetBoxesByShopQuery getBoxesByShopQuery = new GetBoxesByShopQuery(shopId);

        return queryGateway.query(
                        getBoxesByShopQuery,
                        ResponseTypes.multipleInstancesOf(BoxDto.class))
                .join();
    }

    @GetMapping("/getById/{boxId}")
    public BoxDto getBoxById(@PathVariable String boxId) {
        GetBoxQuery getBoxQuery = new GetBoxQuery(boxId);

        return queryGateway.query(
                        getBoxQuery,
                        ResponseTypes.instanceOf(BoxDto.class))
                .join();
    }
}
