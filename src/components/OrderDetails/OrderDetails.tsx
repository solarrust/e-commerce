"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { useSession } from "next-auth/react";
import useSWR from "swr";

import { OrderItem } from "@/lib/models/OrderModel";
import Alert from "@mui/material/Alert";

export default function OrderDetails({
  orderId,
  paypalClientId,
}: {
  orderId: string;
  paypalClientId: string;
}) {
  // const { data: session } = useSession();
  const { data, error } = useSWR(`/api/orders/${orderId}`);

  if (error) return error.message;
  if (!data) return "Loading...";

  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = data;

  return (
    <div className="wrapper">
      <h1>Order {orderId}</h1>
      <div>
        <h2>Shipping</h2>
        <p>
          <strong>Address:</strong> {shippingAddress.address},{" "}
          {shippingAddress.city}, {shippingAddress.postalCode},{" "}
          {shippingAddress.country}
        </p>
        {isDelivered ? (
          <p>
            <strong>Delivered at:</strong> {deliveredAt}
          </p>
        ) : (
          <Alert
            variant="outlined"
            severity="warning"
          >
            Not delivered
          </Alert>
        )}
      </div>
      <div>
        <h2>Payment</h2>
        <p>
          <strong>Method:</strong> {paymentMethod}
        </p>
        {isPaid ? (
          <p>
            <strong>Paid at:</strong> {paidAt}
          </p>
        ) : (
          <Alert
            variant="outlined"
            severity="warning"
          >
            Not paid
          </Alert>
        )}
      </div>
      <div>
        <h2>Order Items</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: OrderItem) => (
              <tr key={item.slug}>
                <td>
                  <Link href={`/product/${item.slug}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                  </Link>
                  <span>
                    {item.name} ({item.color} {item.size})
                  </span>
                </td>
                <td>{item.qty}</td>
                <td>${item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Prices</h2>
        <p>
          <strong>Items:</strong> ${itemsPrice}
        </p>
        <p>
          <strong>Shipping:</strong> ${shippingPrice}
        </p>
        <p>
          <strong>Tax:</strong> ${taxPrice}
        </p>
        <p>
          <strong>Total:</strong> ${totalPrice}
        </p>
      </div>
    </div>
  );
}
