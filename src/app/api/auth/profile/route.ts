import bcrypt from "bcryptjs";

import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/lib/models/UserModel";

export const PUT = auth(async (request) => {
  if (!request.auth) {
    return Response.json({ message: "Not authorized" }, { status: 401 });
  }

  const { user } = request.auth;
  const { name, email, password } = await request.json();

  await dbConnect();

  try {
    const dbUser = await UserModel.findById(user._id);
    if (!dbUser) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    dbUser.name = name;
    dbUser.email = email;
    dbUser.password = password
      ? await bcrypt.hash(password, 5)
      : dbUser.password;

    await dbUser.save();
    return Response.json({ message: "User updated" });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return Response.json({ message: errorMessage }, { status: 500 });
  }
});
