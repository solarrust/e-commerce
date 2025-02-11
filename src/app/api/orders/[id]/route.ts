import { NextRequest } from "next/server";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";

export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }

  await dbConnect();
  const order = await OrderModel.findById(params.id);

  if (!order) {
    return Response.json({ message: "Order not found" }, { status: 404 });
  }

  return Response.json(order);
}
