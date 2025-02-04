"use client";
import { useEffect, useState } from "react";

// import { useRouter } from "next/router";
import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, IconButton } from "@mui/material";

import styles from "./AddToCart.module.css";

export default function AddToCart({ item }: { item: OrderItem }) {
  // const router = useRouter();
  const { items, increase, decrease, remove } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((i) => i.slug === item.slug));
  }, [item.slug, items]);

  const addToCartHandler = () => {
    increase(item);
  };

  return existItem ? (
    <div className={styles.quantity}>
      <IconButton
        aria-label="decrease"
        onClick={() => decrease(existItem)}
      >
        <RemoveIcon fontSize="inherit" />
      </IconButton>
      <span>{existItem.qty}</span>
      <IconButton
        aria-label="increase"
        onClick={() => increase(existItem)}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        aria-label="remove"
        onClick={() => remove(existItem)}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  ) : (
    <Button
      variant="contained"
      onClick={addToCartHandler}
      size="large"
      fullWidth
    >
      Add to Cart
    </Button>
  );
}
