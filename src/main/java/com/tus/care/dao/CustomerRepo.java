package com.tus.care.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tus.care.dto.Customer;

public interface CustomerRepo extends JpaRepository<Customer,Long> {

}
