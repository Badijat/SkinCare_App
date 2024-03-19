package com.tus.care.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tus.care.dto.Orders;


public interface OrdersRepo extends JpaRepository<Orders,Long> {

}
