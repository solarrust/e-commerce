"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";

export default function CartDetails() {
  // const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <div className="container">
          <h2 className="title">Shopping Cart</h2>
        </div>

        <div className="container">
          {items.length === 0 ? (
            <h3>
              Cart is Empty.{" "}
              <Link href="/" className="link">
                Go shopping →
              </Link>
            </h3>
          ) : (
            <div>
              <div>
                <div>
                  {items.map((item) => (
                    <div key={item.slug} className="row">
                      <div>
                        <Link href={`/products/${item.slug}`}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                        </Link>
                      </div>
                      <div>
                        <h3>
                          <Link href={`/products/${item.slug}`}>
                            {item.name}
                          </Link>
                        </h3>
                        <p>${item.price}</p>
                        <div>
                          <button type="button" onClick={() => decrease(item)}>
                            -
                          </button>
                          <span>{item.qty}</span>
                          <button type="button" onClick={() => increase(item)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="container">
          <p>Final ${itemsPrice}</p>
        </div>
      </>
    )
  );
}
