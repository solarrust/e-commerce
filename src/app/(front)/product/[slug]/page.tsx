import Link from "next/link";

import ProductDetails from "@/components/Products/ProductDetails";
import data from "@/lib/data";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = data.products.find((product) => product.slug === slug);

  return (
    <>
      {product ? (
        <>
          <div className="container">
            <Link href="/" className="link">
              ← Back to products
            </Link>
          </div>
          <div className="container">
            <ProductDetails product={product} />
          </div>
        </>
      ) : (
        <div>Product not found</div>
      )}
    </>
  );
}
