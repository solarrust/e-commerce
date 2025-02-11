import OrderDetails from "@/components/OrderDetails/OrderDetails";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return {
    title: `Order ${params.id}`,
    description: `Order ${params.id} details`,
  };
}

export default async function OrderDetailsPage(
  props: {
    params: Promise<{ id: string }>;
  }
) {
  const params = await props.params;
  return (
    <OrderDetails
      orderId={params.id}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "local"}
    />
  );
}
