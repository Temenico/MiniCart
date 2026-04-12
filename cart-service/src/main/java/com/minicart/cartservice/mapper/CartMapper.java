package com.minicart.cartservice.mapper;

import com.minicart.cartservice.dto.CartItemResponse;
import com.minicart.cartservice.dto.CartResponse;
import com.minicart.cartservice.entity.Cart;
import com.minicart.cartservice.entity.CartItem;

import java.util.List;

public final class CartMapper {

    private CartMapper() {
    }

    public static CartResponse toResponse(Cart cart) {
        List<CartItemResponse> itemResponses = cart.getItems()
                .stream()
                .map(CartMapper::toItemResponse)
                .toList();

        return new CartResponse(
                cart.getId(),
                cart.getCreatedAt(),
                cart.getTotal(),
                itemResponses
        );
    }

    private static CartItemResponse toItemResponse(CartItem item) {
        return new CartItemResponse(
                item.getId(),
                item.getProduct().getId(),
                item.getProduct().getName(),
                item.getQuantity(),
                item.getUnitPrice(),
                item.getSubtotal()
        );
    }
}
