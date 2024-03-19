package com.tus.care.dto;

import javax.persistence.*;

@Entity
@Table(name = "customer") 
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long id; 
	private String first_name;
	private String last_name;
	private String email;
	private String skin_type;
	private String allergies;
	
	
	public Customer() {
		
	}


	public Customer(Long id, String first_name, String last_name, String email, String skin_type, String allergies) {
		super();
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.skin_type = skin_type;
		this.allergies = allergies;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSkin_type() {
		return skin_type;
	}

	public void setSkin_type(String skin_type) {
		this.skin_type = skin_type;
	}

	public String getAllergies() {
		return allergies;
	}

	public void setAllergies(String allergies) {
		this.allergies = allergies;
	}
	
	
}
