package com.minicart.cartservice.service.impl;

import com.minicart.cartservice.dto.AddCartItemRequest;
import com.minicart.cartservice.dto.CartResponse;
import com.minicart.cartservice.dto.UpdateCartItemRequest;
import com.minicart.cartservice.entity.Cart;
import com.minicart.cartservice.entity.CartItem;
import com.minicart.cartservice.entity.Product;
import com.minicart.cartservice.exception.BusinessValidationException;
import com.minicart.cartservice.exception.CartItemNotFoundException;
import com.minicart.cartservice.exception.CartNotFoundException;
import com.minicart.cartservice.exception.ProductNotFoundException;
import com.minicart.cartservice.mapper.CartMapper;
import com.minicart.cartservice.repository.CartItemRepository;
import com.minicart.cartservice.repository.CartRepository;
import com.minicart.cartservice.repository.ProductRepository;
import com.minicart.cartservice.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public CartResponse createCart() {
        Cart cart = new Cart();
        cart.setTotal(BigDecimal.ZERO);
        Cart savedCart = cartRepository.save(cart);
        return CartMapper.toResponse(savedCart);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CartResponse> findAll() {
        return cartRepository.findAll()
                .stream()
                .map(CartMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CartResponse findById(Long cartId) {
        Cart cart = findCartOrThrow(cartId);
        return CartMapper.toResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse addItem(Long cartId, AddCartItemRequest request) {
        Cart cart = findCartOrThrow(cartId);
        Product product = findProductOrThrow(request.productId());
        validateProductAvailability(product, request.quantity());

        CartItem cartItem = cartItemRepository.findByCartIdAndProductId(cartId, request.productId())
                .orElseGet(() -> createCartItem(cart, product));

        int newQuantity = cartItem.getQuantity() == null ? request.quantity() : cartItem.getQuantity() + request.quantity();
        validateStock(product, newQuantity);

        updateItemValues(cartItem, product, newQuantity);
        recalculateCartTotal(cart);

        Cart savedCart = cartRepository.save(cart);
        return CartMapper.toResponse(savedCart);
    }

    @Override
    @Transactional
    public CartResponse updateItemQuantity(Long cartId, Long itemId, UpdateCartItemRequest request) {
        Cart cart = findCartOrThrow(cartId);
        CartItem cartItem = findCartItemOrThrow(cartId, itemId);
        Product product = cartItem.getProduct();

        validateProductAvailability(product, request.quantity());
        validateStock(product, request.quantity());

        updateItemValues(cartItem, product, request.quantity());
        recalculateCartTotal(cart);

        Cart savedCart = cartRepository.save(cart);
        return CartMapper.toResponse(savedCart);
    }

    @Override
    @Transactional
    public void deleteItem(Long cartId, Long itemId) {
        Cart cart = findCartOrThrow(cartId);
        CartItem cartItem = findCartItemOrThrow(cartId, itemId);

        cart.getItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        recalculateCartTotal(cart);
        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void deleteCart(Long cartId) {
        Cart cart = findCartOrThrow(cartId);
        cartRepository.delete(cart);
    }

    private Cart findCartOrThrow(Long cartId) {
        return cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("No se encontró el carrito con id " + cartId));
    }

    private Product findProductOrThrow(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotFoundException("No se encontró el producto con id " + productId));
    }

    private CartItem findCartItemOrThrow(Long cartId, Long itemId) {
        return cartItemRepository.findByIdAndCartId(itemId, cartId)
                .orElseThrow(() -> new CartItemNotFoundException("No se encontró el ítem " + itemId + " en el carrito " + cartId));
    }

    private void validateProductAvailability(Product product, int quantity) {
        if (Boolean.FALSE.equals(product.getActive())) {
            throw new BusinessValidationException("El producto no está disponible para la venta");
        }
        if (quantity <= 0) {
            throw new BusinessValidationException("La cantidad debe ser mayor que cero");
        }
    }

    private void validateStock(Product product, int quantity) {
        if (product.getStock() < quantity) {
            throw new BusinessValidationException(
                    "Stock insuficiente para el producto con id " + product.getId() + ". Stock disponible: " + product.getStock()
            );
        }
    }

    private CartItem createCartItem(Cart cart, Product product) {
        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        cart.getItems().add(item);
        return item;
    }

    private void updateItemValues(CartItem item, Product product, int quantity) {
        BigDecimal subtotal = product.getPrice().multiply(BigDecimal.valueOf(quantity));
        item.setQuantity(quantity);
        item.setUnitPrice(product.getPrice());
        item.setSubtotal(subtotal);
    }

    private void recalculateCartTotal(Cart cart) {
        BigDecimal total = cart.getItems()
                .stream()
                .map(CartItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotal(total);
    }
}
