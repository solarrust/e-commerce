import Image from "next/image";

import { Product } from "@/lib/models/ProductModel";

import AddToCart from "./AddToCart";

import styles from "./ProductDetails.module.css";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className={styles.productDetails}>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        priority
        className={styles.productImage}
      />
      <div className={styles.productList}>
        <h2 className={styles.productName}>{product.name}</h2>
        <p>{product.brand}</p>
        <div>
          <span className={styles.productPrice}>${product.price}</span>
          <span className={styles.productCount}>
            {product.countInStock > 0
              ? `${product.countInStock} In stock`
              : "Unavailable"}
          </span>
        </div>
        <p>
          <span className={styles.productRating}>
            {product.rating} of {product.numReviews} reviews
          </span>
        </p>
        <p className={styles.productDescription}>{product.description}</p>

        <footer className={styles.productFooter}>
          {product.countInStock !== 0 && (
            <AddToCart item={{ ...product, qty: 0, color: "", size: "" }} />
          )}
        </footer>
      </div>
    </div>
  );
}
