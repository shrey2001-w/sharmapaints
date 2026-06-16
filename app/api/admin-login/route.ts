import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const admin = await Admin.findOne({
      email: body.email,
      password: body.password,
    });

    if (!admin) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}