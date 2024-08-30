import { connect } from "@/dbConfig/dbConfig";
import User from "@/app/actions/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const reqBody = await req.json();
    const { name, email, password } = reqBody;

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isProfileComplete: false,
      isVerified: false,
      isAdmin: false,
      utrRating: [],
      experience: "",
      playStyle: "",
      courtSurface: [],
      availability: [],
      dateOfBirth: null,
    });

    const savedUser = await newUser.save();
    const userId = savedUser._id;
    const isProfileComplete = savedUser.isProfileComplete;

    const tokenData = {
      id: userId,
      username: newUser.name,
      email: newUser.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User created successfully",
      success: true,
      redirectTo: `/profile-setup/${userId}`,
      savedUser,
    });
    response.cookies.set("token", token.toString(), {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    response.cookies.set("userId", userId.toString(), {
      httpOnly: true,
      secure: true,
      path: "/",
    });
    response.cookies.set("isProfileComplete", isProfileComplete.toString(), {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("SignUp Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
