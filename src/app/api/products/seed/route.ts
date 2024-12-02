import { NextResponse } from "next/server";

import data from "@/lib/data";
import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/lib/models/ProductModel";
import UserModel from "@/lib/models/UserModel";

export const GET = async () => {
  const { users, products } = data;

  await dbConnect();
  await UserModel.deleteMany();
  await UserModel.insertMany(users);

  await ProductModel.deleteMany();
  await ProductModel.insertMany(products);

  return NextResponse.json({
    message: "Data seeded successfully",
    users,
    products,
  });
};
