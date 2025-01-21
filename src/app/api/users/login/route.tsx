import { connect } from "@/dbConfig/dbConfig";
import User from "@/app/actions/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function POST(request: NextRequest, nextResponse: NextResponse) {
  try {
    await connect();
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });


    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.name,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("userId", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    // Set cookies securely
    response.cookies.set(
      "isProfileComplete",
      user.isProfileComplete.toString(),
      {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
        path: "/",
        sameSite: "strict", // Prevents CSRF attacks by not sending the cookie on cross-site requests
      }
    );

    response.cookies.set("token", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
      path: "/",
      sameSite: "strict", // Prevents CSRF attacks by not sending the cookie on cross-site requests
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
