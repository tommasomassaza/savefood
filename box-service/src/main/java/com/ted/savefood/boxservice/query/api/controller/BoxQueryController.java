package com.ted.savefood.boxservice.query.api.controller;

import com.ted.savefood.boxservice.common.modelDto.BoxDto;
import com.ted.savefood.boxservice.query.api.queries.GetBoxesQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/boxes")
public class BoxQueryController {

    private QueryGateway queryGateway;

    public BoxQueryController(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }

    @GetMapping
    public List<BoxDto> getAllBoxes(){
        GetBoxesQuery getBoxesQuery = new GetBoxesQuery();

        return queryGateway.query(
                getBoxesQuery,
                ResponseTypes.multipleInstancesOf(BoxDto.class))
                .join();
    }
}
