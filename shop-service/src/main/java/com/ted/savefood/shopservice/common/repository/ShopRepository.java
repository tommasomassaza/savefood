package com.ted.savefood.shopservice.common.repository;

import com.ted.savefood.shopservice.common.model.Shop;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ShopRepository extends CrudRepository<Shop, String> {
    List<Shop> findAllBySellerId(String sellerId);
}
