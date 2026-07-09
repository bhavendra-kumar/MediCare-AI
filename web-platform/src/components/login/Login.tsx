"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Activity, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographySmall } from "@/components/ui/typography";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import api from "@/services/api";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const features = [
  "Personalized health dashboard",
  "AI-powered symptom analysis",
  "Smart appointment scheduling",
  "Secure medical records",
];

export function LoginComponent() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data && response.data.success) {
        login(response.data.token, response.data.user);
        toast.success("Successfully logged in");
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Panel — Branded Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 flex-col justify-between p-12">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-120px] left-[-60px] w-[500px] h-[500px] rounded-full bg-indigo-900/40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/10 pointer-events-none" />

        {/* ECG line decoration */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 800 100" className="w-full" preserveAspectRatio="none">
            <polyline
              points="0,50 100,50 140,10 160,90 180,50 220,50 260,50 300,20 320,80 340,50 400,50 500,50 540,15 560,85 580,50 620,50 800,50"
              fill="none" stroke="white" strokeWidth="3"
            />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">MediCare AI</span>
          </div>
          <p className="text-blue-200 text-sm font-medium ml-14">Your intelligent health companion</p>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center py-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Healthcare<br />
            <span className="text-blue-200">reimagined</span> with AI
          </h2>
          <p className="text-blue-200 text-base leading-relaxed max-w-sm">
            Access your personalized health dashboard, AI-powered insights, and smart appointment management — all in one place.
          </p>

          {/* Features list */}
          <div className="mt-8 space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/20 shrink-0">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-200" />
                </div>
                <span className="text-sm text-blue-100 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Panel — Form Side */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12 bg-white">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">MediCare AI</span>
        </div>

        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 mt-2 text-sm">Sign in to access your health dashboard</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
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
                  className={`h-11 rounded-xl bg-slate-50 border pl-11 pr-4 text-slate-900 placeholder:text-slate-400 font-medium text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${errors.email ? "border-red-400 bg-red-50/30 focus-visible:border-red-400" : "border-slate-200 focus-visible:border-blue-500"}`}
                  {...register("email")}
                />
              </div>
              {errors.email && <TypographySmall className="text-red-500">{errors.email.message}</TypographySmall>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
                <Link href="/forgot-password" className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                  <Lock className="h-[18px] w-[18px]" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`h-11 rounded-xl bg-slate-50 border pl-11 pr-10 font-medium text-sm tracking-widest placeholder:tracking-normal placeholder:text-slate-400 text-slate-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${errors.password ? "border-red-400 bg-red-50/30 focus-visible:border-red-400" : "border-slate-200 focus-visible:border-blue-500"}`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
              {errors.password && <TypographySmall className="text-red-500">{errors.password.message}</TypographySmall>}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 mt-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign in"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-xs text-slate-400 font-medium">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
