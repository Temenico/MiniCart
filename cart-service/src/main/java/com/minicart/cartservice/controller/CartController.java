package com.minicart.cartservice.controller;

import com.minicart.cartservice.dto.AddCartItemRequest;
import com.minicart.cartservice.dto.CartResponse;
import com.minicart.cartservice.dto.UpdateCartItemRequest;
import com.minicart.cartservice.service.CartService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CartResponse createCart() {
        return cartService.createCart();
    }

    @GetMapping
    public List<CartResponse> findAll() {
        return cartService.findAll();
    }

    @GetMapping("/{id}")
    public CartResponse findById(@PathVariable Long id) {
        return cartService.findById(id);
    }

    @PostMapping("/{id}/items")
    public CartResponse addItem(@PathVariable Long id, @Valid @RequestBody AddCartItemRequest request) {
        return cartService.addItem(id, request);
    }

    @PutMapping("/{id}/items/{itemId}")
    public CartResponse updateItem(
            @PathVariable Long id,
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateCartItemRequest request
    ) {
        return cartService.updateItemQuantity(id, itemId, request);
    }

    @DeleteMapping("/{id}/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable Long id, @PathVariable Long itemId) {
        cartService.deleteItem(id, itemId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCart(@PathVariable Long id) {
        cartService.deleteCart(id);
    }
}
