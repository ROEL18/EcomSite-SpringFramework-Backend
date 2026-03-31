package com.Ecom.SpringEcom.model.DTO;

public record OrderItemRequest(
        int productId,
        int quantity
) {
}
