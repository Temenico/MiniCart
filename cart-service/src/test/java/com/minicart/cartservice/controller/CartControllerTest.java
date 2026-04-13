package com.minicart.cartservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minicart.cartservice.dto.AddCartItemRequest;
import com.minicart.cartservice.dto.CartItemResponse;
import com.minicart.cartservice.dto.CartResponse;
import com.minicart.cartservice.dto.UpdateCartItemRequest;
import com.minicart.cartservice.exception.CartNotFoundException;
import com.minicart.cartservice.exception.GlobalExceptionHandler;
import com.minicart.cartservice.service.CartService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CartController.class)
@Import(GlobalExceptionHandler.class)
class CartControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CartService cartService;

    @Test
    void shouldCreateEmptyCart() throws Exception {
        CartResponse response = new CartResponse(
                1L,
                LocalDateTime.now(),
                BigDecimal.ZERO,
                List.of()
        );

        Mockito.when(cartService.createCart()).thenReturn(response);

        mockMvc.perform(post("/carts"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.total").value(0));
    }

    @Test
    void shouldFindCartById() throws Exception {
        CartItemResponse itemResponse = new CartItemResponse(
                20L,
                3L,
                "Arroz",
                2,
                new BigDecimal("6.00"),
                new BigDecimal("12.00")
        );

        CartResponse response = new CartResponse(
                1L,
                LocalDateTime.now(),
                new BigDecimal("12.00"),
                List.of(itemResponse)
        );

        Mockito.when(cartService.findById(1L)).thenReturn(response);

        mockMvc.perform(get("/carts/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.items[0].productName").value("Arroz"));
    }

    @Test
    void shouldAddItemToCart() throws Exception {
        AddCartItemRequest request = new AddCartItemRequest(3L, 2);
        CartResponse response = new CartResponse(
                1L,
                LocalDateTime.now(),
                new BigDecimal("12.00"),
                List.of(new CartItemResponse(20L, 3L, "Arroz", 2, new BigDecimal("6.00"), new BigDecimal("12.00")))
        );

        Mockito.when(cartService.addItem(Mockito.eq(1L), Mockito.any(AddCartItemRequest.class))).thenReturn(response);

        mockMvc.perform(post("/carts/1/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[0].quantity").value(2))
                .andExpect(jsonPath("$.total").value(12.00));
    }

    @Test
    void shouldReturnValidationErrorWhenQuantityIsInvalid() throws Exception {
        AddCartItemRequest request = new AddCartItemRequest(3L, 0);

        mockMvc.perform(post("/carts/1/items")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("La validación de la solicitud falló"))
                .andExpect(jsonPath("$.validationErrors.quantity").exists());
    }

    @Test
    void shouldUpdateItemQuantity() throws Exception {
        UpdateCartItemRequest request = new UpdateCartItemRequest(5);
        CartResponse response = new CartResponse(
                1L,
                LocalDateTime.now(),
                new BigDecimal("30.00"),
                List.of(new CartItemResponse(20L, 3L, "Arroz", 5, new BigDecimal("6.00"), new BigDecimal("30.00")))
        );

        Mockito.when(cartService.updateItemQuantity(Mockito.eq(1L), Mockito.eq(20L), Mockito.any(UpdateCartItemRequest.class)))
                .thenReturn(response);

        mockMvc.perform(put("/carts/1/items/20")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[0].quantity").value(5))
                .andExpect(jsonPath("$.total").value(30.00));
    }

    @Test
    void shouldDeleteItemFromCart() throws Exception {
        mockMvc.perform(delete("/carts/1/items/20"))
                .andExpect(status().isNoContent());
    }

    @Test
    void shouldDeleteCart() throws Exception {
        mockMvc.perform(delete("/carts/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void shouldReturnNotFoundWhenCartDoesNotExist() throws Exception {
        Mockito.when(cartService.findById(99L))
                .thenThrow(new CartNotFoundException("No se encontró el carrito con id 99"));

        mockMvc.perform(get("/carts/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("No se encontró el carrito con id 99"));
    }
}
