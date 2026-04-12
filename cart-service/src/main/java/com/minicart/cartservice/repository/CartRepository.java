package com.minicart.cartservice.repository;

import com.minicart.cartservice.entity.Cart;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    @Override
    @EntityGraph(attributePaths = {"items", "items.product"})
    List<Cart> findAll();

    @Override
    @EntityGraph(attributePaths = {"items", "items.product"})
    Optional<Cart> findById(Long id);
}
