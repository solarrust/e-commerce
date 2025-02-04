import { Metadata } from "next";

import PaymentForm from "@/components/Forms/PaymentForm";

export const metadata: Metadata = {
  title: "Payment Method",
  description: "Select your payment method",
};

export default async function Payment() {
  return <PaymentForm />;
}
