import { Metadata } from "next";

import PlaceOrderForm from "@/components/Forms/PlaceOrderForm";

export const metadata: Metadata = {
  title: "Place Order",
  description: "Place your order",
};

export default async function PlaceOrder() {
  return <PlaceOrderForm />;
}
