package com.ted.savefood.orderservice.repository;

import com.ted.savefood.orderservice.model.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order,String > {
}
