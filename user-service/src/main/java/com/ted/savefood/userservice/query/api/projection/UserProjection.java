package com.ted.savefood.userservice.query.api.projection;

import com.ted.savefood.commonutils.model.CardDetails;
import com.ted.savefood.commonutils.query.GetUserPaymentDetailsQuery;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.stereotype.Component;

@Component
public class UserProjection {
    @QueryHandler
    public CardDetails getUserPaymentDetails(GetUserPaymentDetailsQuery getUserPaymentDetailsQuery){
        // ideally get the details from the db or form
        return CardDetails.builder()
                .name("Tommaso Massaza")
                .validUntilYear(2025)
                .validUntilMonth(01)
                .cardNumber("37345342675934")
                .cvv(238)
                .build();
    }
}
