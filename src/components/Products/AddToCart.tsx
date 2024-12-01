"use client";
import { useEffect, useState } from "react";

// import { useRouter } from "next/router";
import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";

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
    <div>
      <button type="button" onClick={() => decrease(existItem)}>
        -
      </button>
      <span>{existItem.qty}</span>
      <button type="button" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button type="button" className="button" onClick={addToCartHandler}>
      Add to Cart
    </button>
  );
}
