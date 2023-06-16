package com.ted.savefood.userservice.query.api.controller;

import com.ted.savefood.commonutils.model.CardDetails;
import com.ted.savefood.commonutils.query.GetUserPaymentDetailsQuery;
import org.axonframework.messaging.responsetypes.ResponseTypes;
import org.axonframework.queryhandling.QueryGateway;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private transient QueryGateway queryGateway;

    public CustomerController(QueryGateway queryGateway) {
        this.queryGateway = queryGateway;
    }

    @GetMapping("{userId}")
    public CardDetails getUserPaymentDetails(@PathVariable String userId){
        GetUserPaymentDetailsQuery getUserPaymentDetailsQuery = new GetUserPaymentDetailsQuery(userId);
        CardDetails cardDetails = queryGateway.query(
                getUserPaymentDetailsQuery,
                ResponseTypes.instanceOf(CardDetails.class)
        ).join();

        return cardDetails;
    }
}
