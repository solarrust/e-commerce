import Link from "next/link";

import ProductDetails from "@/components/Products/ProductDetails";
import ProductService from "@/lib/services/productService";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await ProductService.getBySlug(slug);

  if (product) {
    return {
      title: `${product.name} | E-commerce App`,
      description: product.description,
    };
  } else {
    return {
      title: "Product not found | E-commerce App",
    };
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await ProductService.getBySlug(slug);

  return (
    <>
      {product ? (
        <>
          <div className="container">
            <Link
              href="/"
              className="link"
            >
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
