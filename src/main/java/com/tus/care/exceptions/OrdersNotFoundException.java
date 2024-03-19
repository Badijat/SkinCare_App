package com.tus.care.exceptions;

public class OrdersNotFoundException extends RuntimeException{

	public OrdersNotFoundException(String message) {
		super(message);
	}
}
