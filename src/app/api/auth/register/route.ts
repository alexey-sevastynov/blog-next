import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  const { name, email, password, sex } = await request.json();

  await connect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({ name, email, sex, password: hashedPassword });

  try {
    await newUser.save();
    return new NextResponse("user has been created", { status: 201 });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 }
    );
  }
};
