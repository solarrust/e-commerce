import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";

export async function PUT(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const { name, email, password } = await request.json();

  await dbConnect();
  try {
    const dbUser = await UserModel.findById(session.user._id);

    if (!dbUser) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password
      ? await bcrypt.hash(password, 5)
      : dbUser.password;

    await dbUser.save();
    return Response.json({ message: "User has been updated" });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return Response.json({ message: errorMessage }, { status: 500 });
  }
}
