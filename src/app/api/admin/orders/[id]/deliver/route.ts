import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModel";

export const PUT = auth(async (...request) => {
  const [req, { params }] = request;

  if (!req.auth) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }

  if (!req.auth.user?.isAdmin) {
    return Response.json(
      { message: "Admin permission needed" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    if (!params || !params.id) {
      return Response.json({ message: "Invalid parameters" }, { status: 400 });
    }

    const order = await OrderModel.findById(params.id);
    if (order) {
      if (!order.isPaid) {
        return Response.json(
          { message: "Order not paid yet" },
          { status: 400 }
        );
      }

      order.isDelivered = !order.isDelivered;
      order.deliveredAt = new Date();
      const updateOrder = await order.save();
      return Response.json(updateOrder);
    } else {
      return Response.json({ message: "Order not found" }, { status: 404 });
    }
  } catch (error: unknown) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
});
