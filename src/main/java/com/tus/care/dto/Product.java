package com.tus.care.dto;

import javax.persistence.*;
import javax.validation.constraints.Size;


@Entity
@Table(name = "products") 
public class Product { 

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	private Long id; 
	private double price;

    @Size(min=3) //the name has to be a minimum size of 3 (validation)
	private String name;
    private String brand;
    private String type;
    private String scent;
    
    @Lob //used to specify that a field should be mapped to a Large Object (LOB) in the database.
    private String description;
    private String images;
    //`volume`, `skin_concern`, `ingredients`, `usage`, `benefits`, `in_stock`
    private String volume;
    private String skinConcern;;
    private String ingredients;
    private String usage;
    private String benefits;
    private Long quantity_in_stock;
    
    
    public Product() {
    	
    }

	public Product(Long id, double price, @Size(min = 3) String name, String brand, String type, String scent,
			String description, String images, String volume, String skinConcern, String ingredients, String usage,
			String benefits, Long quantity_in_stock) {
		super();
		this.id = id;
		this.price = price;
		this.name = name;
		this.brand = brand;
		this.type = type;
		this.scent = scent;
		this.description = description;
		this.images = images;
		this.volume = volume;
		this.skinConcern = skinConcern;
		this.ingredients = ingredients;
		this.usage = usage;
		this.benefits = benefits;
		this.quantity_in_stock = quantity_in_stock;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getScent() {
		return scent;
	}

	public void setScent(String scent) {
		this.scent = scent;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImages() {
		return images;
	}

	public void setImages(String images) {
		this.images = images;
	}

	public String getVolume() {
		return volume;
	}

	public void setVolume(String volume) {
		this.volume = volume;
	}

	public String getSkinConcern() {
		return skinConcern;
	}

	public void setSkinConcern(String skinConcern) {
		this.skinConcern = skinConcern;
	}

	public String getIngredients() {
		return ingredients;
	}

	public void setIngredients(String ingredients) {
		this.ingredients = ingredients;
	}

	public String getUsage() {
		return usage;
	}

	public void setUsage(String usage) {
		this.usage = usage;
	}

	public String getBenefits() {
		return benefits;
	}

	public void setBenefits(String benefits) {
		this.benefits = benefits;
	}

	public Long getQuantity_in_stock() {
		return quantity_in_stock;
	}

	public void setQuantity_in_stock(Long quantity_in_stock) {
		this.quantity_in_stock = quantity_in_stock;
	}


}