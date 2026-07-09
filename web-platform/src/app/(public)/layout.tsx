"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Activity, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75" />
      </div>

      {!["/", "/login", "/register", "/forgot-password"].includes(pathname) && (
        <header className="fixed inset-x-0 top-0 z-50 pt-4 sm:pt-6 pointer-events-none">
          <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 lg:px-8 pointer-events-auto" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
                <span className="sr-only">MediCare AI</span>
                <Activity className="h-7 w-7 text-blue-600 group-hover:scale-105 transition-transform duration-300" />
                <span className="text-xl font-bold text-slate-900 tracking-tight dark:text-white drop-shadow-sm">MediCare AI</span>
              </Link>
            </div>
            
            <div className="flex lg:hidden">
              <div className="flex items-center gap-2 rounded-full px-2 py-2 bg-white/60 backdrop-blur-[20px] border border-white/40 shadow-sm">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <div
                className="flex items-center gap-3 sm:gap-4 rounded-full px-2 py-2 pr-2 pl-4 shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                }}
              >
                <Link
                  href="/login"
                  className="text-[14px] font-medium text-gray-800 hover:text-gray-900 px-2 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-blue-600 px-5 py-2 text-[14px] font-medium text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                >
                  Get started
                </Link>
              </div>
            </div>
          </nav>

          {mobileMenuOpen && (
            <div className="lg:hidden" role="dialog" aria-modal="true">
              <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-slate-950/80" />
              <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10 dark:bg-slate-950 dark:ring-white/10">
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                    <span className="sr-only">MediCare AI</span>
                    <Activity className="h-8 w-8 text-sky-600" />
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-slate-500/10">
                    <div className="py-6 flex flex-col gap-3">
                      <Button variant="outline" asChild className="w-full justify-center">
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                      </Button>
                      <Button asChild className="w-full justify-center">
                        <Link href="/register" onClick={() => setMobileMenuOpen(false)}>Get started</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header>
      )}

      <main className={`flex-1 w-full ${!["/", "/login", "/register", "/forgot-password"].includes(pathname) ? 'pt-20' : ''}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative bg-slate-950 border-t border-slate-800 pt-16 pb-8 overflow-hidden mt-auto z-10">
        {/* Glow effect at the top border */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        <div className="absolute top-0 left-1/2 w-1/2 -translate-x-1/2 h-[100px] bg-blue-600/20 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold text-white tracking-tight">MediCare AI</span>
              </div>
              <TypographyP className="text-slate-400 max-w-sm leading-relaxed text-base">
                Your intelligent companion for a healthier tomorrow. Empowering proactive health management with cutting-edge AI technology.
              </TypographyP>
            </div>
            
            <div>
              <TypographyH3 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Platform</TypographyH3>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-blue-400 transition-colors duration-200">AI Health Assistant</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors duration-200">Smart Lab Reports</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors duration-200">Skin Analysis</Link></li>
                <li><Link href="#" className="hover:text-blue-400 transition-colors duration-200">Appointments</Link></li>
              </ul>
            </div>
            
            <div>
              <TypographyH3 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Company</TypographyH3>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li><Link href="/about" className="hover:text-blue-400 transition-colors duration-200">About Us</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors duration-200">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors duration-200">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
            <TypographyP className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} MediCare AI, Inc. All rights reserved.
            </TypographyP>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors duration-200">Privacy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors duration-200">Terms</Link>
              <Link href="#" className="hover:text-slate-300 transition-colors duration-200">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
