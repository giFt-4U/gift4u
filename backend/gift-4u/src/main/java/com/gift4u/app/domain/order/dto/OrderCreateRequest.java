package com.gift4u.app.domain.order.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderCreateRequest {

    private Long userId;

    private String receiverName;

    private String receiverPhone;

    private String address;

    private String addressDetail;

    private String zipCode;

    private String deliveryMemo;

    private List<OrderItemRequest> items;
}