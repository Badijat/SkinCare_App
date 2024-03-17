package com.tus.care.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tus.care.dto.Product;

public interface ProductRepo extends JpaRepository<Product, Long> {

	List<Product> findByBrand(String brand);
	List<Product> findByBrandContaining(String brand);
	
	List<Product> findByType(String type);
	List<Product> findByTypeContaining(String type);

	List<Product> findBySkinConcernContaining(String skinConcern);

    @Query("SELECT p FROM Product p WHERE (p.rrp - p.online) >= :dealPrice")
    List<Product> findByDealsMoreThan(@Param("dealPrice") double dealPrice);


}
