package com.ted.savefood.commonutils.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardDetails {
    private String name;
    private String cardNumber;
    private int validUntilMonth;
    private int validUntilYear;
    private int cvv;
}
