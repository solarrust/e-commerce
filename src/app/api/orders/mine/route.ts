import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import orderModel from "@/lib/models/OrderModel";

export async function GET() {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }

  const { user } = session as unknown as { user: { _id: string } };
  await dbConnect();

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const orders = await orderModel.find({ user: user._id });
  return Response.json(orders);
}
