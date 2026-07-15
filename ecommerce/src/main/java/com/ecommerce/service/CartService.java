package com.ecommerce.service;

import com.ecommerce.dto.CartDto;
import com.ecommerce.dto.CartResponseDto;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.CartNotFound;
import com.ecommerce.exception.ProductNotFound;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    private final CartRepository repository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    public CartService(CartRepository repository, ProductRepository productRepository, ModelMapper modelMapper) {
        this.repository = repository;
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
    }

    public CartDto addToCart(CartDto dto){
        Cart existing=repository.findByProductId(dto.getProductId()).orElse(null);
        if (existing!=null){
            existing.setQuantity(dto.getQuantity()+ existing.getQuantity());
            Cart saved =repository.save(existing);
            return modelMapper.map(saved,CartDto.class);
        }
        Product product= productRepository.findById(dto.getProductId())
                .orElseThrow(()->new ProductNotFound("Product Not Found..!"));
        Cart cart=new Cart();
        cart.setQuantity(dto.getQuantity());
        cart.setProduct(product);
        Cart saved=repository.save(cart);
        return modelMapper.map(saved,CartDto.class);
    }

    public List<CartResponseDto> getCartItems(){
        List<Cart> carts=repository.findAll();
        return carts.stream().map(
                cart ->{
                    CartResponseDto dto=new CartResponseDto();
                    dto.setCartId(cart.getId());
                    dto.setProductId(cart.getProduct().getId());
                    dto.setProductName(cart.getProduct().getName());
                    dto.setQuantity(cart.getQuantity());
                    dto.setPrice(cart.getProduct().getPrice());
                    dto.setCategory(cart.getProduct().getCategory());
                    dto.setImageUrl(cart.getProduct().getImageUrl());
                    dto.setSubtotal(cart.getProduct().getPrice()*cart.getQuantity());
                    
                    return dto;
                }
        ).toList();
    }

    public CartDto updateQuantity( long productId, CartDto dto){
        System.out.println(productId);
        Cart cart=findItem(productId);
        cart.setQuantity(dto.getQuantity());
        Cart saved=repository.save(cart);
        return modelMapper.map(saved,CartDto.class);
    }

    public void removeFromCart(long productId){
        Cart cart =findItem(productId);
        repository.delete(cart);
    }

    public void clearCart(){
        repository.deleteAll();
    }

    public double getCartTotal(){
        double total=0;
        List<Cart> carts=repository.findAll();
        for (Cart cart :carts){
            total+=cart.getProduct().getPrice()*cart.getQuantity();
        }
        return total;
    }
    public Cart findItem(long productId){
        return repository.findByProductId(productId).orElseThrow(()->new CartNotFound("item not found..!"));
    }

}
