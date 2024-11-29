import React from "react";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        Made for fun by{" "}
        <a href="https://github.com/solarrust/e-commerce">Alёna Batitskaia</a>
      </div>
    </footer>
  );
}
