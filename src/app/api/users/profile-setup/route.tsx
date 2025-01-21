import { connect } from "@/dbConfig/dbConfig";
import User from "@/app/actions/userModel";
import { NextRequest, NextResponse } from "next/server";
import { Request } from "express";
import mongoose, { ObjectId } from "mongoose";
import { cookies } from "next/headers";

connect();

export async function POST(req: NextRequest, preferences: any) {
  try {

    console.log(cookies)



    const id = req.cookies.get("userId")?.value;

    if (!id) {
      return NextResponse.json(
        { error: "User ID not found in cookies" },
        { status: 400 }
      );
    }

    const castId = new mongoose.Types.ObjectId(id);

    const user = await User.findById(castId);

    if (!user) {
      return NextResponse.json({ error: "User Error" }, { status: 400 });
    }
    preferences = await req.json();

    if (preferences.utrRating) user.utrRating = preferences.utrRating;
    if (preferences.experience) user.experience = preferences.experience;
    if (preferences.playStyle) user.playStyle = preferences.playStyle;
    if (preferences.courtSurface) user.courtSurface = preferences.courtSurface;
    if (preferences.availability) user.availability = preferences.availability;
    if (preferences.isProfileComplete)
      user.isProfileComplete = preferences.isProfileComplete;
    if (preferences.dateOfBirth) user.dateOfBirth = preferences.dateOfBirth;

    await user.save();

    const response = NextResponse.json({
      message: "Profile Created Successfully",
      success: true,
      user,
    });

    response.cookies.set(
      "isProfileComplete",
      preferences.isProfileComplete.toString(),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
      }
    );

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
