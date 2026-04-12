package com.minicart.cartservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minicart.cartservice.dto.ProductRequest;
import com.minicart.cartservice.dto.ProductResponse;
import com.minicart.cartservice.exception.GlobalExceptionHandler;
import com.minicart.cartservice.exception.ProductNotFoundException;
import com.minicart.cartservice.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
@Import(GlobalExceptionHandler.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductService productService;

    @Test
    void shouldCreateProduct() throws Exception {
        ProductRequest request = new ProductRequest(
                "Cafetera",
                "Cafetera de goteo",
                new BigDecimal("129.90"),
                12,
                true
        );

        ProductResponse response = new ProductResponse(
                1L,
                "Cafetera",
                "Cafetera de goteo",
                new BigDecimal("129.90"),
                12,
                true
        );

        Mockito.when(productService.create(Mockito.any(ProductRequest.class))).thenReturn(response);

        mockMvc.perform(post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Cafetera"));
    }

    @Test
    void shouldReturnValidationErrorWhenNameIsBlank() throws Exception {
        ProductRequest request = new ProductRequest(
                " ",
                "Producto inválido",
                new BigDecimal("10.00"),
                5,
                true
        );

        mockMvc.perform(post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("La validación de la solicitud falló"))
                .andExpect(jsonPath("$.validationErrors.name").exists());
    }

    @Test
    void shouldListProducts() throws Exception {
        List<ProductResponse> response = List.of(
                new ProductResponse(1L, "Arroz", "Arroz blanco", new BigDecimal("6.50"), 40, true),
                new ProductResponse(2L, "Leche", "Leche entera", new BigDecimal("4.20"), 30, true)
        );

        Mockito.when(productService.findAll()).thenReturn(response);

        mockMvc.perform(get("/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Arroz"))
                .andExpect(jsonPath("$[1].name").value("Leche"));
    }

    @Test
    void shouldReturnNotFoundWhenProductDoesNotExist() throws Exception {
        Mockito.when(productService.findById(999L))
                .thenThrow(new ProductNotFoundException("No se encontró el producto con id 999"));

        mockMvc.perform(get("/products/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("No se encontró el producto con id 999"));
    }

    @Test
    void shouldUpdateProduct() throws Exception {
        ProductRequest request = new ProductRequest(
                "Pan integral",
                "Pan integral 500g",
                new BigDecimal("7.30"),
                18,
                true
        );

        ProductResponse response = new ProductResponse(
                3L,
                "Pan integral",
                "Pan integral 500g",
                new BigDecimal("7.30"),
                18,
                true
        );

        Mockito.when(productService.update(Mockito.eq(3L), Mockito.any(ProductRequest.class))).thenReturn(response);

        mockMvc.perform(put("/products/3")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.name").value("Pan integral"));
    }

    @Test
    void shouldDeleteProduct() throws Exception {
        mockMvc.perform(delete("/products/5"))
                .andExpect(status().isNoContent());
    }
}
