package com.ecommerce.service;

import com.ecommerce.dto.ProductDto;
import com.ecommerce.entity.Product;
import com.ecommerce.exception.ProductNotFound;
import com.ecommerce.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;
    private final ModelMapper modelMapper;

    public ProductService(ProductRepository repository, ModelMapper modelMapper) {
        this.repository = repository;
        this.modelMapper = modelMapper;
    }

    public List<ProductDto> getAllProduct(){
        return repository.findAll().stream().map(
                product -> modelMapper.map(product,ProductDto.class)
        ).toList();
    }

    public ProductDto createProduct(ProductDto productDto){
        Product p=modelMapper.map(productDto,Product.class);
        Product saved=repository.save(p);
        return modelMapper.map(saved,ProductDto.class);
    }

    public ProductDto updateProduct(long id, ProductDto productDto){
        Product product=findProduct(id);
        modelMapper.map(productDto,product);
       Product saved= repository.save(product);
        return modelMapper.map(saved,ProductDto.class);
    }

    public void deleteProduct(long id){
        Product product=findProduct(id);
        repository.delete(product);
    }

    public ProductDto getProductById(long id){
        Product p=findProduct(id);
        return modelMapper.map(p,ProductDto.class);
    }

    public List<ProductDto> getProductByCategory(String category){
        List<Product> products= repository.findByCategory(category);
        if (products.isEmpty()){
            throw new ProductNotFound("No products found in category: " + category);
        }
        return products.stream().map(
                product -> modelMapper.map(product,ProductDto.class)
        ).toList();
    }

    public List<ProductDto> searchProductByName(String name){
        List<Product> products=repository.findByNameContainingIgnoreCase(name);
        if (products.isEmpty()){
            throw new ProductNotFound("No product found with name: " + name);
        }
        return products.stream().map(
                product -> modelMapper.map(product,ProductDto.class)
        ).toList();
    }

    private Product findProduct(long id){
        return repository.findById(id).orElseThrow(()->new ProductNotFound("Product Not Found..!"));
    }
}
