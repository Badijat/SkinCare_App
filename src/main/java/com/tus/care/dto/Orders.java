package com.tus.care.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders") 
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long id; 
	private double customer_id;
	private double product_id;
	private double quantity;
	
	public Orders() {  }
	
	public Orders(Long id, double customer_id, double product_id, double quantity) {
		super();
		this.id = id;
		this.customer_id = customer_id;
		this.product_id = product_id;
		this.quantity = quantity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(double customer_id) {
		this.customer_id = customer_id;
	}

	public double getProduct_id() {
		return product_id;
	}

	public void setProduct_id(double product_id) {
		this.product_id = product_id;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	
	
	
}
