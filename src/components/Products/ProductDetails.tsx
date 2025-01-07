import Image from "next/image";

import { Product } from "@/lib/models/ProductModel";
import { convertDocToObj } from "@/lib/utils";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";

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

        <p className={styles.productRating}>
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
        </p>

        <p className={styles.productDescription}>{product.description}</p>

        <footer className={styles.productFooter}>
          {product.countInStock !== 0 && (
            <AddToCart
              item={{
                ...convertDocToObj(product),
                qty: 0,
                color: "",
                size: "",
              }}
            />
          )}
        </footer>
      </div>
    </div>
  );
}
