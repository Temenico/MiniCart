package com.minicart.cartservice.service;

import com.minicart.cartservice.dto.AddCartItemRequest;
import com.minicart.cartservice.dto.CartResponse;
import com.minicart.cartservice.dto.UpdateCartItemRequest;

import java.util.List;

public interface CartService {

    CartResponse createCart();

    List<CartResponse> findAll();

    CartResponse findById(Long cartId);

    CartResponse addItem(Long cartId, AddCartItemRequest request);

    CartResponse updateItemQuantity(Long cartId, Long itemId, UpdateCartItemRequest request);

    void deleteItem(Long cartId, Long itemId);

    void deleteCart(Long cartId);
}
