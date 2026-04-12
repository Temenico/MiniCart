package com.minicart.cartservice.service.impl;

import com.minicart.cartservice.dto.ProductRequest;
import com.minicart.cartservice.dto.ProductResponse;
import com.minicart.cartservice.entity.Product;
import com.minicart.cartservice.exception.ProductNotFoundException;
import com.minicart.cartservice.mapper.ProductMapper;
import com.minicart.cartservice.repository.ProductRepository;
import com.minicart.cartservice.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public ProductResponse create(ProductRequest request) {
        Product savedProduct = productRepository.save(ProductMapper.toEntity(request));
        return ProductMapper.toResponse(savedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> findAll() {
        return productRepository.findAll()
                .stream()
                .map(ProductMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse findById(Long id) {
        return ProductMapper.toResponse(findProductOrThrow(id));
    }

    @Override
    @Transactional
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = findProductOrThrow(id);
        ProductMapper.updateEntity(product, request);
        Product updatedProduct = productRepository.save(product);
        return ProductMapper.toResponse(updatedProduct);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Product product = findProductOrThrow(id);
        productRepository.delete(product);
    }

    private Product findProductOrThrow(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("No se encontró el producto con id " + id));
    }
}
