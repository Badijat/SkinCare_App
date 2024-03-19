package com.tus.care.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tus.care.dto.Product;

public interface AdminRepo extends JpaRepository<Product,Long> {

	List<Product> findByName(String name);
	List<Product> findByNameContaining(String name);
}
