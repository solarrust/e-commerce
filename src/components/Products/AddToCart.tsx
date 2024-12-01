"use client";
import { useEffect, useState } from "react";

// import { useRouter } from "next/router";
import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@mui/material";

import styles from "./AddToCart.module.css";

export default function AddToCart({ item }: { item: OrderItem }) {
  // const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((i) => i.slug === item.slug));
  }, [item.slug, items]);

  const addToCartHandler = () => {
    increase(item);
  };

  return existItem ? (
    <div className={styles.quantity}>
      <Button
        aria-label="decrease"
        variant="outlined"
        onClick={() => decrease(existItem)}
      >
        <RemoveIcon fontSize="inherit" />
      </Button>
      <span>{existItem.qty}</span>
      <Button
        aria-label="increase"
        variant="outlined"
        onClick={() => increase(existItem)}
      >
        <AddIcon fontSize="inherit" />
      </Button>
    </div>
  ) : (
    <Button
      variant="contained"
      onClick={addToCartHandler}
      size="large"
      sx={{ width: "100%" }}
    >
      Add to Cart
    </Button>
  );
}
