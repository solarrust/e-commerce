"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

import useCartService from "@/lib/hooks/useCartStore";

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
          <Link href="/cart" className={styles.button}>
            Cart{" "}
            {mounted && items.length != 0 && (
              <span>{items.reduce((a, c) => a + c.qty, 0)}</span>
            )}
          </Link>
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
