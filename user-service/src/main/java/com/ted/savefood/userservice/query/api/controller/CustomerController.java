package com.ted.savefood.userservice.query.api.controller;

import com.ted.savefood.commonfunctionality.model.CardDetails;
import com.ted.savefood.commonfunctionality.query.GetUserPaymentDetailsQuery;
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

    @GetMapping("{customerId}")
    public CardDetails getUserPaymentDetails(@PathVariable String customerId){
        GetUserPaymentDetailsQuery getUserPaymentDetailsQuery = new GetUserPaymentDetailsQuery(customerId);
        CardDetails cardDetails = queryGateway.query(
                getUserPaymentDetailsQuery,
                ResponseTypes.instanceOf(CardDetails.class)
        ).join();

        return cardDetails;
    }
}
