"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import useCartService from "@/lib/hooks/useCartStore";
import { Badge } from "@mui/material";

import styles from "./Header.module.css";

export default function Menu() {
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      <ul className={styles.headerList}>
        <li>
          {mounted && (
            <Badge
              badgeContent={items.reduce((a, c) => a + c.qty, 0)}
              color="primary"
            >
              <Link href="/cart" className={styles.button}>
                Cart
              </Link>
            </Badge>
          )}
        </li>
        <li>
          <Link href="/signin" className={styles.button}>
            Sign In
          </Link>
        </li>
      </ul>
    </div>
  );
}
