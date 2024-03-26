package com.tus.care.controllers;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import java.util.Optional;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tus.care.dto.Product;
import com.tus.care.dao.AdminRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AdminController.class)
public class AdminControllerTest {

    @Mock
    private AdminRepo adminRepo;

    @InjectMocks // Auto inject adminRepo into AdminController
    private AdminController adminController;

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
    }

//    @Test
//    public void getAllProductsTest() throws Exception {
//        when(adminRepo.findAll()).thenReturn(null/* return a list of products here */);
//
//        mockMvc.perform(get("/admin-products")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hashCode(/* expected size */)));
//    }
//
//    @Test
//    public void getProductByIdTest() throws Exception {
//        Long productId = 1L;
//        Product product = new Product(); // Set up product details
//        product.setId(productId);
//
//        when(adminRepo.findById(productId)).thenReturn(Optional.of(product));
//
//        mockMvc.perform(get("/admin-products/{id}", productId)
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id", is(productId.intValue())));
//    }
//
//    @Test
//    public void createProductTest() throws Exception {
//        Product product = new Product(); // Set up product details
//
//        when(adminRepo.save(any(Product.class))).thenReturn(product);
//
//        mockMvc.perform(post("/admin-products")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(product)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.id", is(product.getId().intValue())));
//    }

    // Continue writing tests for updateProduct, deleteProductById, getProductByName, etc.
}

