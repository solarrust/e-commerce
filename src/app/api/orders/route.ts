import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel, { OrderItem } from "@/lib/models/OrderModel";
import ProductModel from "@/lib/models/ProductModel";
import { round2 } from "@/lib/utils";

const calcPrices = (orderItems: OrderItem[]) => {
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, taxPrice, shippingPrice, totalPrice };
};

export const POST = auth(async (req) => {
  if (!req.auth) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }
  const { user } = req.auth;

  if (!user) {
    return Response.json({ message: "No user found" }, { status: 401 });
  }

  try {
    const payload = await req.json();
    await dbConnect();
    const dbProductPrices = await ProductModel.find(
      {
        _id: { $in: payload.items.map((x: { _id: string }) => x._id) },
      },
      "price"
    );
    const dbOrderItems = payload.items.map((x: { _id: string }) => ({
      ...x,
      product: x._id,
      price: dbProductPrices.find((x) => x._id === x._id).price,
      _id: undefined,
    }));
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      user: user._id,
    });

    const createdOrder = await newOrder.save();

    return Response.json(
      { message: "Order created", order: createdOrder },
      { status: 201 }
    );
  } catch (error: unknown) {
    return Response.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
});
