import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/lib/models/ProductModel";

import styles from "./ProductItem.module.css";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className={styles.productItem}>
      <figure className={styles.productImageContainer}>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className={styles.productImage}
            priority
          />
        </Link>
      </figure>
      <div className={styles.productInfo}>
        <Link href={`/product/${product.slug}`}>
          <h2>{product.name}</h2>
          <p>{product.brand}</p>
        </Link>
        <footer className={styles.productFooter}>
          <span className={styles.productPrice}>${product.price}</span>
          <span>
            {product.rating} Stars ({product.numReviews} Reviews)
          </span>
        </footer>
      </div>
    </div>
  );
}
