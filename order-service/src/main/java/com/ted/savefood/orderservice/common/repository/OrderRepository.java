package com.ted.savefood.orderservice.common.repository;

import com.ted.savefood.orderservice.common.model.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order,String > {
}
