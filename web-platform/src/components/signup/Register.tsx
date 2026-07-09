"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, Loader2, CheckCircle2, XCircle, Eye, EyeOff, User, Mail, Lock, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographySmall } from "@/components/ui/typography";
import { toast } from "sonner";
import api from "@/services/api";

const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and privacy policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const perks = [
  { icon: Star, text: "AI-powered health insights" },
  { icon: Users, text: "Connect with top specialists" },
  { icon: Award, text: "Certified secure platform" },
];

export function RegisterComponent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/signup", {
        name: data.fullName,
        email: data.email,
        password: data.password,
      });

      if (response.data && response.data.success) {
        toast.success("Account created successfully. Please sign in.");
        router.push("/login");
      } else {
        toast.error(response.data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldState = (hasError: boolean, isTouched: boolean) => {
    if (hasError) return "border-red-400 bg-red-50/30 focus-visible:border-red-400";
    if (isTouched && !hasError) return "border-emerald-400 bg-emerald-50/20 focus-visible:border-emerald-500";
    return "border-slate-200 focus-visible:border-blue-500";
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Panel — Branded Side */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-linear-to-br from-indigo-600 via-blue-600 to-cyan-600 flex-col justify-between p-12">
        {/* Decorative blobs */}
        <div className="absolute top-[-100px] right-[-100px] w-[450px] h-[450px] rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute bottom-[-150px] left-[-80px] w-[550px] h-[550px] rounded-full bg-blue-900/30 pointer-events-none" />

        {/* Floating card decorations */}
        <div className="absolute top-1/4 right-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 ring-1 ring-white/20 w-44 rotate-3 pointer-events-none">
          <div className="text-xs text-blue-200 font-medium mb-1">Heart Rate</div>
          <div className="text-2xl font-bold text-white">72 bpm</div>
          <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-emerald-400 rounded-full" />
          </div>
          <div className="text-xs text-emerald-300 mt-1 font-medium">Normal range ✓</div>
        </div>

        <div className="absolute top-1/2 right-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 ring-1 ring-white/20 w-40 -rotate-2 pointer-events-none">
          <div className="text-xs text-blue-200 font-medium mb-1">AI Analysis</div>
          <div className="text-lg font-bold text-white">Report ready</div>
          <div className="text-xs text-blue-300 mt-1">Reviewed by AI</div>
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
            Start your<br />
            <span className="text-cyan-200">health journey</span><br />
            today
          </h2>
          <p className="text-blue-200 text-base leading-relaxed max-w-xs mb-8">
            Join thousands of patients and healthcare professionals who trust MediCare AI for their health management.
          </p>

          {/* Perks */}
          <div className="space-y-3">
            {perks.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 shrink-0">
                  <Icon className="h-4 w-4 text-cyan-200" />
                </div>
                <span className="text-sm text-blue-100 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Panel — Form */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-10 bg-white overflow-y-auto">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-blue-600">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900">MediCare AI</span>
        </div>

        <div className="w-full max-w-[440px]">
          {/* Header */}
          <div className="mb-7">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create account</h1>
            <p className="text-slate-500 mt-1.5 text-sm">Get started — it&apos;s free and takes under a minute</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Full name</Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                  <User className="h-[18px] w-[18px]" />
                </div>
                <Input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  className={`h-11 rounded-xl bg-slate-50 border pl-11 pr-9 text-slate-900 placeholder:text-slate-400 font-medium text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${getFieldState(!!errors.fullName, !!touchedFields.fullName)}`}
                  {...register("fullName")}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {errors.fullName ? <XCircle className="h-[18px] w-[18px] text-red-500" /> : touchedFields.fullName ? <CheckCircle2 className="h-[18px] w-[18px] text-emerald-500" /> : null}
                </div>
              </div>
              {errors.fullName && <TypographySmall className="text-red-500">{errors.fullName.message}</TypographySmall>}
            </div>

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
                  className={`h-11 rounded-xl bg-slate-50 border pl-11 pr-9 text-slate-900 placeholder:text-slate-400 font-medium text-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${getFieldState(!!errors.email, !!touchedFields.email)}`}
                  {...register("email")}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {errors.email ? <XCircle className="h-[18px] w-[18px] text-red-500" /> : touchedFields.email ? <CheckCircle2 className="h-[18px] w-[18px] text-emerald-500" /> : null}
                </div>
              </div>
              {errors.email && <TypographySmall className="text-red-500">{errors.email.message}</TypographySmall>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Password</Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                  <Lock className="h-[18px] w-[18px]" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={`h-11 rounded-xl bg-slate-50 border pl-11 pr-10 font-medium text-sm tracking-widest placeholder:tracking-normal placeholder:text-slate-400 text-slate-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${getFieldState(!!errors.password, !!touchedFields.password)}`}
                  {...register("password")}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                  {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
              {errors.password && <TypographySmall className="text-red-500">{errors.password.message}</TypographySmall>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">Confirm password</Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                  <Lock className="h-[18px] w-[18px]" />
                </div>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className={`h-11 rounded-xl bg-slate-50 border pl-11 pr-10 font-medium text-sm tracking-widest placeholder:tracking-normal placeholder:text-slate-400 text-slate-900 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0 ${getFieldState(!!errors.confirmPassword, !!touchedFields.confirmPassword)}`}
                  {...register("confirmPassword")}
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                  {showConfirmPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
              {errors.confirmPassword && <TypographySmall className="text-red-500">{errors.confirmPassword.message}</TypographySmall>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="acceptTerms"
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 focus:ring-2 cursor-pointer shrink-0"
                {...register("acceptTerms")}
              />
              <label htmlFor="acceptTerms" className="text-sm text-slate-600 cursor-pointer leading-snug">
                I agree to the{" "}
                <a href="/terms" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">Terms of Service</a>
                {" "}and{" "}
                <a href="/privacy" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">Privacy Policy</a>
              </label>
            </div>
            {errors.acceptTerms && <TypographySmall className="text-red-500 -mt-2">{errors.acceptTerms.message}</TypographySmall>}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 mt-1"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </span>
              ) : "Create free account"}
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
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
