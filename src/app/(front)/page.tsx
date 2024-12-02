import { Metadata } from "next";
import { EmblaOptionsType } from "embla-carousel";

import Carousel from "@/components/Carousel/Carousel";
import ProductItem from "@/components/Products/ProductItem";
import { Product } from "@/lib/models/ProductModel";
import ProductService from "@/lib/services/productService";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "E-commerce App",
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "E-commerce App created with Next.js & MongoDB",
};

export default async function Home() {
  const featuredProducts = JSON.parse(
    JSON.stringify(await ProductService.getFeatured())
  );
  const latestProducts = await ProductService.getLatest();

  const OPTIONS: EmblaOptionsType = { axis: "y", dragFree: true, loop: true };

  return (
    <>
      <Carousel slides={featuredProducts} options={OPTIONS} />
      <h2 className="title">Latest Products</h2>
      <div className="container">
        <div className="catalog">
          {latestProducts.map((product: Product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
