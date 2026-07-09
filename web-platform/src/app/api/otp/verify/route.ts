import { NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const storedData = otpStore.get(email);

    if (!storedData) {
      return NextResponse.json({ error: "No OTP request found for this email" }, { status: 400 });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(email);
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    if (storedData.otp !== otp) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    // OTP is valid, clear it
    otpStore.delete(email);

    return NextResponse.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("Verify OTP error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
