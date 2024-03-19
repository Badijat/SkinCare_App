package com.tus.care.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tus.care.dao.AdminRepo;
import com.tus.care.dao.CustomerRepo;
import com.tus.care.dao.OrdersRepo;
import com.tus.care.dto.Customer;
import com.tus.care.dto.Orders;
import com.tus.care.dto.Product;
import com.tus.care.exceptions.AdminNotFoundException;


@RestController
public class AdminController {
	
	@Autowired
	private AdminRepo adminRepo;
	
	@Autowired
	private CustomerRepo custRepo;
	
	@Autowired
	private OrdersRepo ordersRepo;
	
//    //http://localhost:9094
//	@GetMapping("/")
//	public String index() {
//		return "<h1>Admin Beauty Application </h1>";
//	}
	
	//http://localhost:9094/admin-products
    @GetMapping("/admin-products")
    public Iterable<Product> getAllProducts() {
        return adminRepo.findAll();
    }
	
	//http://localhost:9094/admin-products/6
    @RequestMapping("/admin-products/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable(value = "id") Long id) {
		Optional<Product> product = adminRepo.findById(id);
		if(product.isPresent())
			return ResponseEntity.ok().body(product.get());
		else
			throw new AdminNotFoundException("No product with id ::" + id);
	}
	
    //Create a new product via postman
    //http://localhost:9094/admin-products/
    @PostMapping("/admin-products")
    public ResponseEntity createProduct(@Valid @RequestBody Product product) {
    	Product savedProduct= adminRepo.save(product);
    	return ResponseEntity.status(HttpStatus.OK).body(savedProduct);
    }
    
    //Update
    //http://localhost:9094/admin-products/14
    @PutMapping("/admin-products/{id}")
	public ResponseEntity updateProduct(@PathVariable("id") Long id, @RequestBody Product product) {
		Optional<Product> savedProduct = adminRepo.findById(id);
		if(savedProduct.isPresent()) {
			adminRepo.save(product);
			return ResponseEntity.status(HttpStatus.OK).body(product);
		}else {
			throw new AdminNotFoundException("No product with id ::" + id);
	}
    }
	
    //Delete via postman
    //http://localhost:9092/wines/15
    @DeleteMapping("/admin-products/{id}")
	public void deleteProductById(@PathVariable Long id) {
		Optional<Product> product = adminRepo.findById(id);
		if(product.isPresent()) {
			Product existingProduct = product.get();
			adminRepo.delete(existingProduct);
		}else {
			throw new AdminNotFoundException("No product with id:" + id);
		}
}
	
    //Get via postman 
    //http://localhost:9092/admin-products/name/shower
    @RequestMapping("admin-products/name/{name}") 
    public ResponseEntity<List<Product>> getProductByName(@PathVariable("name") String name){
    List <Product>productsByName = new ArrayList<>();
    productsByName=adminRepo.findByNameContaining(name); 
    if (productsByName.size()>0) {
    	return new ResponseEntity(productsByName, HttpStatus.OK);
    }else {
    	return new ResponseEntity(productsByName, HttpStatus.NO_CONTENT);
    }
}
    
    //Admin can view customers detail
    // /admin-customers
	//http://localhost:9094/admin-customers
    @GetMapping("/admin-customers")
    public Iterable<Customer> getAllCustomers() {
        return custRepo.findAll();
    }
    
	//http://localhost:9094/admin-orders
    @GetMapping("/admin-orders")
    public Iterable<Orders> getAllOrders() {
        return ordersRepo.findAll();
    }
    
    
}
