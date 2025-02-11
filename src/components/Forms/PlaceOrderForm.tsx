"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

import useCartService from "@/lib/hooks/useCartStore";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

import CheckoutSteps from "../Checkout/CheckoutSteps";

import styles from "./Forms.module.css";

export default function PlaceOrderForm() {
  const router = useRouter();
  const {
    paymentMethod,
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    clearCart,
  } = useCartService();

  const { trigger: placeOrder, isMutating: isPlacing } = useSWRMutation(
    "/api/orders/mine",
    // eslint-disable-next-line
    async (url) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethod,
          shippingAddress,
          items,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        clearCart();
        toast.success("Order placed successfully");
        return router.push(`/order/${data.order._id}`);
      } else {
        toast.error(data.message);
      }
    }
  );

  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/payment");
    }

    if (items.length === 0) {
      return router.push("/");
    }
  }, [paymentMethod, router]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <CheckoutSteps current={4} />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Place Order</h1>
        <div className={styles.summaryBlock}>
          <div className={styles.formGroup}>
            <h2>Shipping Address</h2>
            <p>{shippingAddress.fullName}</p>
            <p>
              {shippingAddress.address}, {shippingAddress.city},{" "}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
            <Link href="/shipping">Edit</Link>
          </div>
          <Divider />
          <div className={styles.formGroup}>
            <h2>Payment Method</h2>
            <p>{paymentMethod}</p>
            <Link href="/payment">Edit</Link>
          </div>
          <Divider />
          <div className={styles.formGroup}>
            <h2>Order Items</h2>
            <ul>
              {items.map((item) => (
                <li key={item.slug}>
                  {item.qty} x {item.name} - ${item.price}
                </li>
              ))}
            </ul>
          </div>
          <Divider />
          <div className={styles.formGroup}>
            <h2>Order Summary</h2>
            <p>Items: ${itemsPrice}</p>
            <p>Shipping: ${shippingPrice}</p>
            <p>Tax: ${taxPrice}</p>
            <p>Total: ${totalPrice}</p>
          </div>
          <Button
            variant="contained"
            fullWidth
            onClick={() => placeOrder()}
            disabled={isPlacing}
            loading={isPlacing}
          >
            {isPlacing ? "Placing order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
