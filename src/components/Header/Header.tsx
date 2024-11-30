import React from "react";
import Link from "next/link";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <div className="container">
          <Link href="/" className={styles.logo}>
            E-commerce
          </Link>
          <ul className={styles.headerList}>
            <li>
              <Link href="/cart" className={styles.button}>
                Cart
              </Link>
            </li>
            <li>
              <Link href="/signin" className={styles.button}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
