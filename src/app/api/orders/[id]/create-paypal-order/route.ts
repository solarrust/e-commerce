import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";
import { paypal } from "@/lib/paypal";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }

  await dbConnect();
  const order = await OrderModel.findById(params.id);

  if (!order) {
    return Response.json({ message: "Order not found" }, { status: 404 });
  }

  try {
    const paypalOrder = await paypal.createOrder(order.totalPrice);
    return Response.json(paypalOrder);
  } catch (error: unknown) {
    return Response.json({ message: (error as Error).message }, { status: 500 });
  }
}
