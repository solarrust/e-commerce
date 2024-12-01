import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/lib/models/ProductModel";
import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";

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
          <Rating
            name="read-only"
            value={product.rating}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon
                style={{ color: "rgb(184 184 184 / 0.4)" }}
                fontSize="inherit"
              />
            }
          />
          <span>({product.numReviews} Reviews)</span>
        </footer>
      </div>
    </div>
  );
}
