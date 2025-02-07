"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import useCartService from "@/lib/hooks/useCartStore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, IconButton } from "@mui/material";

import styles from "./CartDetails.module.css";

export default function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase, remove } = useCartService();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <div className="container">
          <h2 className="title">Shopping Cart</h2>
        </div>

        <div className="container">
          {items.length === 0 ? (
            <h3>
              Cart is Empty.{" "}
              <Link
                href="/"
                className="link"
              >
                Go shopping →
              </Link>
            </h3>
          ) : (
            <ul className={styles.itemsList}>
              {items.map((item) => (
                <li
                  key={item.slug}
                  className={styles.item}
                >
                  <Link href={`/product/${item.slug}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className={styles.itemImage}
                    />
                  </Link>
                  <h3>
                    <Link href={`/product/${item.slug}`}>{item.name}</Link>
                  </h3>
                  <p>${item.price}</p>
                  <div className={styles.quantity}>
                    <IconButton
                      aria-label="decrease"
                      onClick={() => decrease(item)}
                    >
                      <RemoveIcon fontSize="inherit" />
                    </IconButton>
                    <span>{item.qty}</span>
                    <IconButton
                      aria-label="increase"
                      onClick={() => increase(item)}
                    >
                      <AddIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      onClick={() => remove(item)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="container">
          <p>Final ${itemsPrice}</p>
          <Button
            variant="outlined"
            onClick={() => router.push("/shipping")}
          >
            Proceed to Checkout
          </Button>
        </div>
      </>
    )
  );
}
