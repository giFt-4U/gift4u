package com.gift4u.app.domain.order.controller;

import com.gift4u.app.domain.order.dto.OrderCreateRequest;
import com.gift4u.app.domain.order.dto.OrderResponse;
import com.gift4u.app.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // 주문 생성
    @PostMapping
    public OrderResponse createOrder(
            @RequestBody OrderCreateRequest request
    ) {
        return orderService.createOrder(request);
    }

    // 주문 상세 조회
    @GetMapping("/{orderId}")
    public OrderResponse getOrder(
            @PathVariable Long orderId
    ) {
        return orderService.getOrder(orderId);
    }

    // 사용자 주문 목록 조회
    @GetMapping("/user/{userId}")
    public List<OrderResponse> getOrdersByUser(
            @PathVariable Long userId
    ) {
        return orderService.getOrdersByUser(userId);
    }
}