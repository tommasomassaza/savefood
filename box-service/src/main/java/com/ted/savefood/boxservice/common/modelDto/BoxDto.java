package com.ted.savefood.boxservice.common.modelDto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Nullable;

@Data
public class BoxDto {
    @Nullable
    private String boxId;
    private String shopId;
    private String name;
    private String description;
    private float price;
    private int size;
    private String pickUpTime;
    private String city;
    private int quantity;
    private MultipartFile image;
}
