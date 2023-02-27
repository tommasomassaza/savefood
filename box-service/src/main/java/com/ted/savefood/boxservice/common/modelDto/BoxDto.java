package com.ted.savefood.boxservice.common.modelDto;

import lombok.Data;

import javax.annotation.Nullable;

@Data
public class BoxDto {
    @Nullable
    private String boxId;
    private String shopId;
    private String name;
    private String description;
    private int size;
    private String pickUpTime;
}
