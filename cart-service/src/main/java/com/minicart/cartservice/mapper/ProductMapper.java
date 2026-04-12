package com.minicart.cartservice.mapper;

import com.minicart.cartservice.dto.ProductRequest;
import com.minicart.cartservice.dto.ProductResponse;
import com.minicart.cartservice.entity.Product;

public final class ProductMapper {

    private ProductMapper() {
    }

    public static Product toEntity(ProductRequest request) {
        Product product = new Product();
        product.setName(request.name().trim());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setStock(request.stock());
        product.setActive(request.active() == null ? Boolean.TRUE : request.active());
        return product;
    }

    public static void updateEntity(Product product, ProductRequest request) {
        product.setName(request.name().trim());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setStock(request.stock());
        product.setActive(request.active() == null ? product.getActive() : request.active());
    }

    public static ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getActive()
        );
    }
}
