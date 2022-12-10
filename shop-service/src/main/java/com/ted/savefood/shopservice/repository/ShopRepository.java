package com.ted.savefood.shopservice.repository;

import com.ted.savefood.shopservice.model.Shop;
import org.springframework.data.repository.CrudRepository;

public interface ShopRepository extends CrudRepository<Shop, Long> {
}
