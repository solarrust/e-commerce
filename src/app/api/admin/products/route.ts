import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function GET() {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }

  if (!session.user?.isAdmin) {
    return Response.json(
      { message: "Admin permission needed" },
      { status: 401 }
    );
  }

  await dbConnect();
  const products = await ProductModel.find();

  return Response.json(products);
}

export async function POST() {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }

  if (!session.user?.isAdmin) {
    return Response.json(
      { message: "Admin permission needed" },
      { status: 401 }
    );
  }

  await dbConnect();
  const product = new ProductModel({
    name: "Sample Name",
    slug: "sample-name" + Math.random(),
    image: "/images/shirt1.jpg",
    price: 0,
    category: "Sample Category",
    brand: "Sample Brand",
    countInStock: 0,
    description: "Sample Description",
    rating: 0,
    numReviews: 0,
  });

  try {
    await product.save();
    return Response.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error: unknown) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
