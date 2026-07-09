"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  Menu,
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  FileText,
  ScanLine,
  Calendar,
  ChevronDown,
  Bot,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TypographyH3, TypographyP } from "@/components/ui/typography";


const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Skin Check", href: "/skin-analysis", icon: ScanLine },
  { name: "Appointments", href: "/appointments", icon: Calendar },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="h-dvh w-full bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 flex flex-col relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-multiply dark:mix-blend-overlay"></div>

        {/* Top Navbar */}
        <header className="flex-none relative z-100 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="max-w-[1400px] mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/dashboard" className="flex items-center gap-2 lg:w-1/4">
              <Activity className="h-7 w-7 text-blue-600" />
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                MediCare <span className="text-blue-500 font-light">AI</span>
              </span>
            </Link>

            <div className="flex lg:hidden flex-1 justify-end items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6 text-slate-600" />
              </Button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center items-center gap-1.5">
              {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right section */}
            <div className="hidden lg:flex lg:w-1/4 justify-end items-center gap-8">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => router.push("/settings")}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 ring-2 ring-slate-100 dark:ring-slate-800 transition-all group-hover:ring-blue-100 object-cover">
                    <AvatarImage
                      src={
                        user?.avatar ||
                        `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=e2e8f0&color=0f172a`
                      }
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"></span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="lg:hidden z-100 relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-950 shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold">MediCare AI</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-2">
                  <div className="flex items-center gap-4 p-4 mb-6 rounded-2xl bg-slate-50 dark:bg-slate-900">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <TypographyH3 className="font-semibold text-slate-900 dark:text-white">
                        {user?.name || "User"}
                      </TypographyH3>
                      <TypographyP className="text-sm text-slate-500">{user?.email}</TypographyP>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-4 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-colors ${
                            isActive
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900"
                          }`}
                        >
                          <item.icon
                            className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                          />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    <Settings className="h-5 w-5 text-slate-400" /> Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-5 w-5" /> Logout
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <main className="w-full relative z-10 py-6 px-4 sm:py-8 sm:px-6 lg:py-10 max-w-[1400px] mx-auto min-h-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Floating AI Chat Icon */}
        <Link
          href="/chat"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-110 hover:bg-emerald-600 active:scale-95"
        >
          <Bot className="h-7 w-7" />
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950"></span>
          </span>
        </Link>
      </div>
    </ProtectedRoute>
  );
}
