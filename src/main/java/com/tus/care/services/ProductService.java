package com.tus.care.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tus.care.dao.ProductRepo;
import com.tus.care.dto.Product;

@Service
public class ProductService {

	@Autowired
	private ProductRepo productRepo;
	
	public List<Product> getAllProducts(){
		return productRepo.findAll();
	}
	
	public Optional<Product> getProductById(Long id){
		return productRepo.findById(id);
	}
	
    public List<Product> getProductByBrand(String brand) {
        return productRepo.findByBrandContaining(brand);
    }
    
    public List<Product> getProductByType(String type) {
        return productRepo.findByTypeContaining(type);
    }

	//ProductsBySkinConcern
    public List<Product> getProductsBySkinConcern(String skinConcern) {
        return productRepo.findBySkinConcernContaining(skinConcern);
    }
    
//    public List<Product> findByDealsMoreThan(double price) {
//        return productRepo.findByDealsMoreThan(price);
//    }
    
    
	
}
