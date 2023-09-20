package com.ted.savefood.boxservice.common.repository;

import com.ted.savefood.boxservice.common.model.Box;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BoxRepository extends CrudRepository<Box,String> {
    List<Box> findAllByShopId(String shopId);
}
