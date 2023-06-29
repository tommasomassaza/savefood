package com.ted.savefood.shopservice.query.api.projection;

import com.ted.savefood.shopservice.common.model.Shop;
import com.ted.savefood.shopservice.common.modelDto.ShopDto;
import com.ted.savefood.shopservice.common.repository.ShopRepository;
import com.ted.savefood.shopservice.query.api.queries.GetShopsQuery;
import org.axonframework.queryhandling.QueryHandler;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ShopProjection {
    private final ShopRepository shopRepository;

    public ShopProjection(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    @QueryHandler
    public List<ShopDto> handle(GetShopsQuery getShopsQuery) {
        List<Shop> shops = new LinkedList<>();
        shopRepository.findAll().forEach(shops::add);

        return shops.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private ShopDto toDto(Shop shop) {
        ShopDto shopDto = new ShopDto();
        BeanUtils.copyProperties(shop, shopDto);

        return shopDto;
    }
}