interface OTPData {
  otp: string;
  expiresAt: number;
}

// Store OTPs in a global map
// Using global object to persist state across hot-reloads in Next.js dev server
const globalForOtp = global as unknown as {
  otpStore?: Map<string, OTPData>;
};

export const otpStore = globalForOtp.otpStore || new Map<string, OTPData>();

if (process.env.NODE_ENV !== "production") {
  globalForOtp.otpStore = otpStore;
}
