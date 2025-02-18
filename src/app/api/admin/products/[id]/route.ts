import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  const session = await auth();

  if (!session) {
    return Response.json(
      { message: "unauthorized" },
      {
        status: 401,
      }
    );
  }

  if (!session.user?.isAdmin) {
    return Response.json(
      { message: "Admin permission needed" },
      {
        status: 401,
      }
    );
  }

  try {
    await dbConnect();
    const product = await ProductModel.findById(params.id!);
    if (product) {
      await product.deleteOne();
      return Response.json({ message: "Product deleted successfully" });
    } else {
      return Response.json(
        { message: "Product not found" },
        {
          status: 404,
        }
      );
    }
  } catch (err: unknown) {
    return Response.json(
      { message: (err as Error).message },
      {
        status: 500,
      }
    );
  }
}
