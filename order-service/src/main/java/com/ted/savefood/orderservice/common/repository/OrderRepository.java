package com.ted.savefood.orderservice.common.repository;

import com.ted.savefood.orderservice.common.model.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.LinkedList;
import java.util.List;

public interface OrderRepository extends CrudRepository<Order, String> {
    LinkedList<Order> findByUserId(String userId);

    List<Order> findByShopIdIn(List<String> shopIds);
}
