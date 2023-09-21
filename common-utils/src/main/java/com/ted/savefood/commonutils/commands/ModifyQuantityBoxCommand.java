package com.ted.savefood.commonutils.commands;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModifyQuantityBoxCommand {
    private String orderId;
    private String boxId;
    private int quantity;
}
