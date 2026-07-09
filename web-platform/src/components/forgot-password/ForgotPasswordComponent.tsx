"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, ArrowLeft, Eye, EyeOff, Mail, Lock, ShieldCheck, KeyRound, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographySmall } from "@/components/ui/typography";
import { toast } from "sonner";
import api from "@/services/api";

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be exactly 6 digits" }).regex(/^\d+$/, "Must contain only numbers"),
});

const passwordSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type Step = "email" | "otp" | "password";

const stepConfig = {
  email: {
    step: 1,
    icon: Mail,
    title: "Reset your password",
    description: "Enter your email address and we'll send you a 6-digit OTP to reset your password.",
  },
  otp: {
    step: 2,
    icon: ShieldCheck,
    title: "Verify your email",
    description: "We've sent a 6-digit code to your email. Enter it below to continue.",
  },
  password: {
    step: 3,
    icon: KeyRound,
    title: "Create new password",
    description: "Almost done! Set a strong new password for your account.",
  },
};

export function ForgotPasswordComponent() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = React.useState<Step>("email");
  const [isLoading, setIsLoading] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({ resolver: zodResolver(emailSchema) });
  const otpForm = useForm<z.infer<typeof otpSchema>>({ resolver: zodResolver(otpSchema) });
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({ resolver: zodResolver(passwordSchema) });

  const onEmailSubmit = async (data: z.infer<typeof emailSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || "Failed to send OTP");
      setUserEmail(data.email);
      setStep("otp");
      toast.success("OTP sent to your email!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (data: z.infer<typeof otpSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, otp: data.otp }),
      });
      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || "Invalid OTP");
      setStep("password");
      toast.success("OTP verified successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/reset-password", {
        email: userEmail,
        password: data.password,
      });
      if (response.data && !response.data.success) {
        throw new Error(response.data.message || "Failed to reset password");
      }
      const loginResponse = await api.post("/auth/login", {
        email: userEmail,
        password: data.password,
      });
      if (loginResponse.data && !loginResponse.data.success) {
        throw new Error(loginResponse.data.message || "Auto-login failed");
      }
      login(loginResponse.data.token, loginResponse.data.user);
      toast.success("Password reset successfully! Welcome back.");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const current = stepConfig[step];
  const StepIcon = current.icon;

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Panel — Branded Side */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-linear-to-br from-blue-700 via-indigo-700 to-violet-700 flex-col justify-between p-12">
        {/* Decorative elements */}
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-120px] left-[-60px] w-[500px] h-[500px] rounded-full bg-violet-900/40 pointer-events-none" />

        {/* Shield decoration */}
        <div className="absolute top-1/3 right-8 bg-white/10 backdrop-blur-sm rounded-3xl p-8 ring-1 ring-white/20 pointer-events-none">
          <ShieldCheck className="h-16 w-16 text-white/60" strokeWidth={1.5} />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">MediCare AI</span>
          </div>
          <p className="text-indigo-200 text-sm font-medium ml-14">Your intelligent health companion</p>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Account<br />
            <span className="text-violet-200">security</span><br />
            matters
          </h2>
          <p className="text-indigo-200 text-base leading-relaxed max-w-xs mb-8">
            We take your security seriously. Your data is encrypted end-to-end and your identity is always verified before any changes.
          </p>

          {/* Step progress */}
          <div className="space-y-3">
            {(["email", "otp", "password"] as Step[]).map((s, i) => {
              const config = stepConfig[s];
              const Icon = config.icon;
              const isCompleted = current.step > i + 1;
              const isCurrent = step === s;
              return (
                <div key={s} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isCurrent ? "bg-white/15 ring-1 ring-white/25" : isCompleted ? "opacity-60" : "opacity-30"}`}>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${isCurrent ? "bg-white/25" : isCompleted ? "bg-emerald-500/30" : "bg-white/10"}`}>
                    {isCompleted ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <Icon className="h-4 w-4 text-white" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Step {i + 1}</div>
                    <div className="text-xs text-indigo-200">{config.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        </div>

      {/* Right Panel — Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12 bg-white">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">MediCare AI</span>
        </div>

        <div className="w-full max-w-[420px]">
          {/* Back link */}
          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            Back to login
          </Link>

          {/* Step Icon */}
          <div className="mb-6">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4">
              <StepIcon className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{current.title}</h1>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">{current.description}</p>
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`h-1.5 rounded-full transition-all duration-300 ${n === current.step ? "w-8 bg-blue-600" : n < current.step ? "w-4 bg-emerald-500" : "w-4 bg-slate-200"}`} />
            ))}
          </div>

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email address</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                    <Mail className="h-[18px] w-[18px]" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`h-11 rounded-xl bg-slate-50 border pl-11 pr-4 text-slate-900 placeholder:text-slate-400 font-medium text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${emailForm.formState.errors.email ? "border-red-400 bg-red-50/30" : "border-slate-200 focus-visible:border-blue-500"}`}
                    {...emailForm.register("email")}
                  />
                </div>
                {emailForm.formState.errors.email && <TypographySmall className="text-red-500">{emailForm.formState.errors.email.message}</TypographySmall>}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Sending OTP...</span> : "Send OTP"}
              </Button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === "otp" && (
            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-5">
              <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-700 font-medium mb-2">
                Code sent to <span className="font-bold">{userEmail}</span>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="otp" className="text-sm font-semibold text-slate-700">6-digit OTP code</Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  className={`h-14 rounded-xl bg-slate-50 border text-center text-2xl font-bold tracking-[0.5em] text-slate-900 placeholder:text-slate-300 placeholder:tracking-[0.5em] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${otpForm.formState.errors.otp ? "border-red-400 bg-red-50/30" : "border-slate-200 focus-visible:border-blue-500"}`}
                  {...otpForm.register("otp")}
                />
                {otpForm.formState.errors.otp && <TypographySmall className="text-red-500">{otpForm.formState.errors.otp.message}</TypographySmall>}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Verifying...</span> : "Verify OTP"}
              </Button>
              <button type="button" className="w-full text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium" onClick={() => { setStep("email"); otpForm.reset(); }}>
                ← Send to a different email
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === "password" && (
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="newPassword" className="text-sm font-semibold text-slate-700">New password</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                    <Lock className="h-[18px] w-[18px]" />
                  </div>
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className={`h-11 rounded-xl bg-slate-50 border pl-11 pr-10 font-medium text-sm tracking-widest placeholder:tracking-normal placeholder:text-slate-400 text-slate-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${passwordForm.formState.errors.password ? "border-red-400 bg-red-50/30" : "border-slate-200 focus-visible:border-blue-500"}`}
                    {...passwordForm.register("password")}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                    {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                  </button>
                </div>
                {passwordForm.formState.errors.password && <TypographySmall className="text-red-500">{passwordForm.formState.errors.password.message}</TypographySmall>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">Confirm new password</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                    <Lock className="h-[18px] w-[18px]" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className={`h-11 rounded-xl bg-slate-50 border pl-11 pr-10 font-medium text-sm tracking-widest placeholder:tracking-normal placeholder:text-slate-400 text-slate-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${passwordForm.formState.errors.confirmPassword ? "border-red-400 bg-red-50/30" : "border-slate-200 focus-visible:border-blue-500"}`}
                    {...passwordForm.register("confirmPassword")}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                    {showConfirmPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                  </button>
                </div>
                {passwordForm.formState.errors.confirmPassword && <TypographySmall className="text-red-500">{passwordForm.formState.errors.confirmPassword.message}</TypographySmall>}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 mt-1"
              >
                {isLoading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Resetting password...</span> : "Reset password"}
              </Button>
            </form>
          )}

          {/* Footer */}
          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-xs text-slate-400 font-medium">or</span>
            </div>
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
