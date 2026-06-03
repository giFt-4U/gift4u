package com.gift4u.app.domain.order.service;

import com.gift4u.app.domain.Product.entity.Product;
import com.gift4u.app.domain.Product.repository.ProductRepository;
import com.gift4u.app.domain.order.dto.OrderCreateRequest;
import com.gift4u.app.domain.order.dto.OrderItemRequest;
import com.gift4u.app.domain.order.dto.OrderItemResponse;
import com.gift4u.app.domain.order.dto.OrderResponse;
import com.gift4u.app.domain.order.entity.Order;
import com.gift4u.app.domain.order.entity.OrderItem;
import com.gift4u.app.domain.order.repository.OrderItemRepository;
import com.gift4u.app.domain.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private static final int MIN_QUANTITY = 1;
    private static final int MAX_QUANTITY = 99;
    private static final int DELIVERY_FEE = 0;

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;

    // 주문 생성
    @Transactional
    public OrderResponse createOrder(OrderCreateRequest request) {

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("주문할 상품이 없습니다.");
        }

        List<OrderItemTemp> tempItems = new ArrayList<>();

        int totalProductPrice = 0;

        for (OrderItemRequest itemRequest : request.getItems()) {

            Product product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException("상품이 없습니다.")
                    );

            int quantity = clampQuantity(itemRequest.getQuantity());

            int itemTotalPrice = product.getPrice() * quantity;

            totalProductPrice += itemTotalPrice;

            tempItems.add(new OrderItemTemp(product, quantity));
        }

        int finalPrice = totalProductPrice + DELIVERY_FEE;

        Order order = Order.create(
                request.getUserId(),
                request.getReceiverName(),
                request.getReceiverPhone(),
                request.getAddress(),
                request.getAddressDetail(),
                request.getZipCode(),
                request.getDeliveryMemo(),
                totalProductPrice,
                DELIVERY_FEE,
                finalPrice
        );

        Order savedOrder = orderRepository.save(order);

        List<OrderItem> savedItems = new ArrayList<>();

        for (OrderItemTemp tempItem : tempItems) {
            OrderItem orderItem = OrderItem.create(
                    savedOrder,
                    tempItem.product(),
                    tempItem.quantity()
            );

            savedItems.add(orderItemRepository.save(orderItem));
        }

        return toResponse(savedOrder, savedItems);
    }

    // 주문 상세 조회
    public OrderResponse getOrder(Long orderId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("주문 정보가 없습니다.")
                );

        List<OrderItem> orderItems =
                orderItemRepository.findByOrder_Id(orderId);

        return toResponse(order, orderItems);
    }

    // 사용자 주문 목록 조회
    public List<OrderResponse> getOrdersByUser(Long userId) {

        List<Order> orders =
                orderRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return orders.stream()
                .map(order -> {
                    List<OrderItem> orderItems =
                            orderItemRepository.findByOrder_Id(order.getId());

                    return toResponse(order, orderItems);
                })
                .toList();
    }

    private int clampQuantity(int quantity) {

        if (quantity < MIN_QUANTITY) {
            return MIN_QUANTITY;
        }

        if (quantity > MAX_QUANTITY) {
            return MAX_QUANTITY;
        }

        return quantity;
    }

    private OrderResponse toResponse(
            Order order,
            List<OrderItem> orderItems
    ) {
        List<OrderItemResponse> itemResponses = orderItems.stream()
                .map(this::toItemResponse)
                .toList();

        return OrderResponse.builder()
                .id(order.getId())
                .userId(order.getUserId())
                .receiverName(order.getReceiverName())
                .receiverPhone(order.getReceiverPhone())
                .address(order.getAddress())
                .addressDetail(order.getAddressDetail())
                .zipCode(order.getZipCode())
                .deliveryMemo(order.getDeliveryMemo())
                .totalProductPrice(order.getTotalProductPrice())
                .deliveryFee(order.getDeliveryFee())
                .finalPrice(order.getFinalPrice())
                .orderStatus(order.getOrderStatus())
                .paymentStatus(order.getPaymentStatus())
                .createdAt(order.getCreatedAt())
                .items(itemResponses)
                .build();
    }

    private OrderItemResponse toItemResponse(OrderItem item) {

        return OrderItemResponse.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .productName(item.getProductName())
                .productImageUrl(item.getProductImageUrl())
                .quantity(item.getQuantity())
                .orderPrice(item.getOrderPrice())
                .totalPrice(item.getTotalPrice())
                .build();
    }

    private record OrderItemTemp(
            Product product,
            int quantity
    ) {
    }
}