import data from "../../lib/models/data";
import { Product } from "../../lib/models/ProductModel";
import ProductItem from "../components/Products/ProductItem";

export default function Home() {
  return (
    <>
      <h2>Latest Products</h2>
      <div className="catalog">
        {data.products.map((product: Product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}