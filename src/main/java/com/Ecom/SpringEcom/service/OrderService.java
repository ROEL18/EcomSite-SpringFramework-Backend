package com.Ecom.SpringEcom.service;

import com.Ecom.SpringEcom.model.Order;
import com.Ecom.SpringEcom.model.OrderItem;
import com.Ecom.SpringEcom.model.Product;
import com.Ecom.SpringEcom.model.DTO.OrderItemRequest;
import com.Ecom.SpringEcom.model.DTO.OrderItemResponse;
import com.Ecom.SpringEcom.model.DTO.OrderRequest;
import com.Ecom.SpringEcom.model.DTO.OrderResponse;
import com.Ecom.SpringEcom.repo.OrderRepo;
import com.Ecom.SpringEcom.repo.ProductRepo;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final ProductRepo productRepo;
    private final OrderRepo orderRepo;

    public OrderService(ProductRepo productRepo, OrderRepo orderRepo) {
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
    }

    public OrderResponse placeOrder(OrderRequest request) {

        Order order = new Order();

        String orderId = "ORD" + UUID.randomUUID()
                .toString()
                .substring(0, 8)
                .toUpperCase();

        order.setOrderId(orderId);
        order.setCustomerName(request.customerName());
        order.setEmail(request.email());
        order.setStatus("PLACED");
        order.setOrderDate(LocalDate.now());

        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest itemReq : request.items()) {

            Product product = productRepo.findById(itemReq.productId())
                    .orElseThrow(() -> new RuntimeException(
                            "Product not found with id: " + itemReq.productId()
                    ));

            if (itemReq.quantity() <= 0) {
                throw new RuntimeException("Quantity must be greater than 0");
            }

            if (product.getStockQuantity() < itemReq.quantity()) {
                throw new RuntimeException(
                        "Not enough stock for product: " + product.getName()
                );
            }

            product.setStockQuantity(product.getStockQuantity() - itemReq.quantity());
            productRepo.save(product);

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(itemReq.quantity())
                    .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(itemReq.quantity())))
                    .order(order)
                    .build();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);

        Order savedOrder = orderRepo.save(order);

        List<OrderItemResponse> itemResponses = new ArrayList<>();

        for (OrderItem item : savedOrder.getItems()) {
            OrderItemResponse itemResponse = new OrderItemResponse(
                    item.getProduct().getName(),
                    item.getQuantity(),
                    item.getTotalPrice()
            );
            itemResponses.add(itemResponse);
        }

        return new OrderResponse(
                savedOrder.getOrderId(),
                savedOrder.getCustomerName(),
                savedOrder.getEmail(),
                savedOrder.getStatus(),
                savedOrder.getOrderDate(),
                itemResponses
        );
    }

    public List<OrderResponse> getAllOrdersResponses() {

        List<Order> orders = orderRepo.findAll();
        List<OrderResponse> responses = new ArrayList<>();

        for (Order order : orders) {

            List<OrderItemResponse> itemResponses = new ArrayList<>();

            for (OrderItem item : order.getItems()) {
                OrderItemResponse itemResponse = new OrderItemResponse(
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getTotalPrice()
                );
                itemResponses.add(itemResponse);
            }

            OrderResponse response = new OrderResponse(
                    order.getOrderId(),
                    order.getCustomerName(),
                    order.getEmail(),
                    order.getStatus(),
                    order.getOrderDate(),
                    itemResponses
            );

            responses.add(response);
        }

        return responses;
    }
}