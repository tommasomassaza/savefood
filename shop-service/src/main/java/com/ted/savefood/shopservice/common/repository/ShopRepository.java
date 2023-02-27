package com.ted.savefood.shopservice.common.repository;

import com.ted.savefood.shopservice.common.model.Shop;
import org.springframework.data.repository.CrudRepository;

public interface ShopRepository extends CrudRepository<Shop, Long> {
}
