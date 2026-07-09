import { NextResponse } from "next/server";
import { otpStore } from "@/lib/otpStore";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    // Store in our in-memory store
    otpStore.set(email, { otp, expiresAt });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not defined. Logging OTP to console for debugging:", otp);
      return NextResponse.json({ 
        success: true, 
        message: "OTP generated (mocked because RESEND_API_KEY is missing).",
        _debugOtp: otp
      });
    }

    // Send email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "MediCare AI <onboarding@resend.dev>",
        to: email,
        subject: "Your MediCare AI Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #4f46e5; text-align: center;">MediCare AI Verification Code</h2>
            <p>Hello,</p>
            <p>We received a request to reset your password. Use the following 6-digit verification code to proceed:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; padding: 10px 20px; background-color: #f3f4f6; border-radius: 4px; color: #1f2937;">${otp}</span>
            </div>
            <p>This code is valid for 5 minutes. If you did not request a password reset, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">&copy; 2026 MediCare AI. All rights reserved.</p>
          </div>
        `,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Resend API error:", data);
      return NextResponse.json({ error: data.message || "Failed to send email via Resend" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    console.error("Send OTP error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
