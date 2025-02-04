import { create } from "zustand";
import { persist } from "zustand/middleware";

import { OrderItem } from "../models/OrderModel";
import { round2 } from "../utils";

type Cart = {
  items: OrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
};

export const cartStore = create<Cart>()(
  persist(() => initialState, { name: "cartStore" })
);

export default function useCartService() {
  const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    cartStore();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    increase: (item: OrderItem) => {
      const exist = items.find((i) => i.slug === item.slug);

      const updateCartItems = exist
        ? items.map((i) =>
            i.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : i
          )
        : [...items, { ...item, qty: 1 }];

      const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calcPrice(updateCartItems);

      cartStore.setState({
        items: updateCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
    },
    decrease: (item: OrderItem) => {
      const exist = items.find((i) => i.slug === item.slug);
      if (!exist) return;

      const updateCartItems =
        exist.qty === 1
          ? items.filter((i) => i.slug !== exist.slug)
          : items.map((i) =>
              i.slug === item.slug ? { ...exist, qty: exist.qty - 1 } : i
            );

      const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calcPrice(updateCartItems);

      cartStore.setState({
        items: updateCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
    },
    remove: (item: OrderItem) => {
      const exist = items.find((i) => i.slug === item.slug);
      if (!exist) return;

      const updateCartItems = items.filter((i) => i.slug !== exist.slug);

      const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
        calcPrice(updateCartItems);

      cartStore.setState({
        items: updateCartItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
    },
  };
}

const calcPrice = (items: OrderItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const taxPrice = round2(itemsPrice * 0.15);
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 100);
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);
  return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};
