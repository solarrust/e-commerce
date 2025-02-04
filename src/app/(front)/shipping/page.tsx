import { Metadata } from "next";

import ShippingForm from "@/components/Forms/ShippingForm";

export const metadata: Metadata = {
  title: "Shipping Address",
  description: "Enter your shipping address",
};

export default async function Shipping() {
  return <ShippingForm />;
}
