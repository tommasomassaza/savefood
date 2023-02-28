package com.ted.savefood.boxservice.command.api.events;

import lombok.Data;

@Data
public class BoxCancelledEvent {
    private String boxId;
}
