package com.minicart.cartservice.service;

import com.minicart.cartservice.dto.ProductRequest;
import com.minicart.cartservice.dto.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse create(ProductRequest request);

    List<ProductResponse> findAll();

    ProductResponse findById(Long id);

    ProductResponse update(Long id, ProductRequest request);

    void delete(Long id);
}
