import ProductItem from "@/components/Products/ProductItem";
import data from "@/lib/data";
import { Product } from "@/lib/models/ProductModel";

export default function Home() {
  return (
    <>
      <h2 className="title">Latest Products</h2>
      <div className="container">
        <div className="catalog">
          {data.products.map((product: Product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
