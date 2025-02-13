import React from "react";

import ThemeToggler from "@/components/ThemeToggler/ThemeToggler";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrapper">
        <ThemeToggler />
      </div>
      <div>
        Made for fun by{" "}
        <a href="https://github.com/solarrust/e-commerce">Alёna Batitskaia</a>
      </div>
    </footer>
  );
}
