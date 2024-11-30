import React from "react";
import Link from "next/link";

import Menu from "./Menu";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <div className="container">
          <Link href="/" className={`link`}>
            E-commerce
          </Link>
          <Menu />
        </div>
      </nav>
    </header>
  );
}
