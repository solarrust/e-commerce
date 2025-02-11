import { Metadata } from "next";

import MyOrders from "@/components/MyOrders/MyOrders";

export const metadata: Metadata = {
  title: "My Orders",
};

export default async function OrdersHistory() {
  return <MyOrders />;
}
