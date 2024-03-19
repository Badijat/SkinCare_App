package com.tus.care.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AdminNotFoundException extends RuntimeException{

	public AdminNotFoundException(String message) {
		super(message);
	}
}
