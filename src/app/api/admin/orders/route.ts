/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }

  if (!req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Admin permission needed" },
      { status: 401 }
    );
  }

  await dbConnect();
  const orders = await OrderModel.find()
    .sort({ createdAt: -1 })
    .populate("user", "name");

  return Response.json(orders);
}) as any;
