import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";

export async function GET() {
  await dbConnect();
  const categories = await ProductModel.find().distinct("category");

  return Response.json(categories);
}
