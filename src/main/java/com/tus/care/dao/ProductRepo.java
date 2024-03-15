package com.tus.care.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tus.care.dto.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {

	List<Product> findByBrand(String brand);
	List<Product> findByBrandContaining(String brand);
	
	List<Product> findByType(String type);
	List<Product> findByTypeContaining(String type);
	
	List<Product> findByPriceLessThan(double price);
	
	//ProductsBySkinConcern
	List<Product> findBySkinConcernContaining(String skinConcern);

	
}
