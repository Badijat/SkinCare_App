package com.tus.care.contollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tus.care.dto.Product;
import com.tus.care.services.ProductService;

@RestController
public class ProductController {

	@Autowired
	private ProductService productService;
	
//	@GetMapping("/")
//	public String index() {
//		return "<h1>BeautyStore Application </h1>";
//	}
	
    //http://localhost:9092/products
	@GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    //http://localhost:9092/products/6
  @GetMapping("/products/{id}")
  public Product getProductById(@PathVariable Long id) {
      return productService.getProductById(id)
              .orElseThrow(() -> new RuntimeException("Product not found"));
  }
  //Get via postman 
  //http://localhost:9092/products/search/brand/CeraVe
  @RequestMapping("/products/search/brand/{queryBrand}") 
  public ResponseEntity<List<Product>> getProductByBrand(@PathVariable("queryBrand") String brand){
      List<Product> productsByBrand = productService.getProductByBrand(brand);
      if (productsByBrand.size() > 0) {
          return new ResponseEntity<>(productsByBrand, HttpStatus.OK);
      } else {
          return new ResponseEntity<>(productsByBrand, HttpStatus.NO_CONTENT);
      }
  }
  
  //Get via postman 
  //http://localhost:9092/products/search/type/serum
  @GetMapping("products/search/type/{queryType}")
  public ResponseEntity<List<Product>> getProductByType(@PathVariable("queryType") String type) {
      List<Product> productsByType = productService.getProductByType(type);
      if (!productsByType.isEmpty()) {
          return new ResponseEntity<>(productsByType, HttpStatus.OK);
      } else {
          return new ResponseEntity<>(productsByType, HttpStatus.NO_CONTENT);
      }
  }
  
  @GetMapping("products/search/skin_concern/{querySkin_Concern}")
  public ResponseEntity<List<Product>> getProductsBySkinConcern(@PathVariable("querySkin_Concern") String skinConcern) {
      List<Product> productsBySkinConcern = productService.getProductsBySkinConcern(skinConcern);
      if (!productsBySkinConcern.isEmpty()) {
          return new ResponseEntity<>(productsBySkinConcern, HttpStatus.OK);
      } else {
          return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
  }


  
  
  
  
  
  
  //http://localhost:9092/products/search/deals/23
  @GetMapping("products/search/deals/{price}")
  public ResponseEntity<List<Product>> getProductsByPriceLessThan(@PathVariable("price") double dealPrice) {
      List<Product> productsByDeals = productService.getProductsByDealPrice(dealPrice);
      if (!productsByDeals.isEmpty()) {
          return new ResponseEntity<>(productsByDeals, HttpStatus.OK);
      } else {
          return new ResponseEntity<>(productsByDeals, HttpStatus.NO_CONTENT);
      }
  }


    
    
    
    
    
}
