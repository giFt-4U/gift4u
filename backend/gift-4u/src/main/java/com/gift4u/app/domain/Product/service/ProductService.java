package com.gift4u.app.domain.Product.service;

import com.gift4u.app.domain.Product.dto.response.ProductResponse;
import com.gift4u.app.domain.Product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Page<ProductResponse> getProducts(
            int page,
            int size,
            String sort
    ) {

        Pageable pageable;

        if ("popular".equals(sort)) {

            pageable = PageRequest.of(
                    page,
                    size,
                    Sort.by("salesCount").descending()
            );

        } else {

            pageable = PageRequest.of(
                    page,
                    size,
                    Sort.by("id").descending()
            );
        }

        return productRepository
                .findAll(pageable)
                .map(ProductResponse::from);
    }
}