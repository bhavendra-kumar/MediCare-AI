"use client";

import React from "react";
import Link from "next/link";
import { MessageSquarePlus, ScanLine, FileText, Clock } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from "@/components/ui/typography";


export function LandingPage() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isReversing = false;
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (video.duration) {
        if (!isReversing && video.currentTime >= video.duration - 0.05) {
          isReversing = true;
          video.pause();
        } else if (isReversing && video.currentTime <= 0.05) {
          isReversing = false;
          video.play().catch(() => { });
        }

        if (isReversing) {
          video.currentTime = Math.max(0, video.currentTime - delta);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 150]);
  const videoY = useTransform(scrollY, [0, 800], [0, 250]);
  const videoScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const videoOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);

  const features = [
    {
      name: "AI Health Assistant",
      description: "Get instant answers to your medical queries with our advanced AI conversational agent.",
      icon: MessageSquarePlus,
    },
    {
      name: "Smart Report Analysis",
      description: "Upload your lab results and get them simplified into actionable insights.",
      icon: FileText,
    },
    {
      name: "Skin Disease Detection",
      description: "Analyze skin conditions instantly with our AI-powered visual recognition system.",
      icon: ScanLine,
    },
    {
      name: "Seamless Appointments",
      description: "Schedule, manage, and receive reminders for your doctor appointments all in one place.",
      icon: Clock,
    },
  ];

  return (
    <div className="bg-[#f0f0ee] min-h-dvh">
      {/* Hero Section */}
      <div className="relative min-h-dvh overflow-hidden bg-[#f0f0ee]">
        {/* Background Video */}
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: videoY, scale: videoScale, opacity: videoOpacity }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
            type="video/mp4"
          />
        </motion.video>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col min-h-dvh">
          {/* Navbar */}
          <nav className="flex items-center justify-end pt-4 sm:pt-6 px-4 sm:px-8 z-50 w-full">
            <div
              className="flex items-center gap-3 sm:gap-4 rounded-full px-2 py-2 pr-2 pl-4"
              style={{ backgroundColor: "#EDEDED" }}
            >
              <Link
                href="/login"
                className="text-[12px] sm:text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="text-[12px] sm:text-[13px] font-medium bg-white text-gray-900 px-4 py-1.5 sm:py-2 rounded-full shadow-sm hover:shadow transition-all border border-gray-100"
              >
                Sign up
              </Link>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="flex-1 flex items-center px-6 sm:px-12 md:px-20 lg:px-28">
            <motion.div
              className="max-w-lg lg:max-w-xl xl:max-w-2xl"
              style={{ opacity: heroOpacity, y: heroY }}
            >
              <a href="#features" className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-500 hover:text-blue-600 transition-colors mb-4 sm:mb-6 group">
                The Future of Medicine
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>

              <TypographyH1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight font-medium text-gray-900 tracking-tight mb-5 sm:mb-6">
                Bridging the gap between AI and human health with{" "}
                <span className="text-blue-600 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase block mt-2">
                  MediCare AI.
                </span>
              </TypographyH1>

              <TypographyP className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-normal mb-8 sm:mb-10 max-w-lg">
                Your intelligent companion for a healthier tomorrow.
              </TypographyP>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-base font-medium text-white bg-blue-600 rounded-full px-8 py-3.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 group"
              >
                Let&apos;s get started
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div id="features" className="relative z-20 bg-[#f0f0ee] px-5 sm:px-8 py-24 sm:py-32 rounded-t-[32px] sm:rounded-t-[40px] mt-[-32px] sm:mt-[-40px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl lg:text-center"
        >
          <span className="inline-block py-2 px-5 rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white text-[13px] font-semibold tracking-wide mb-6 shadow-md shadow-blue-500/20">
            Intelligent Care
          </span>
          <TypographyH2 className="text-3xl sm:text-4xl md:text-5xl leading-[1.15] font-bold tracking-tight text-gray-900 mb-6">
            Everything you need to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">manage your health.</span>
          </TypographyH2>
          <TypographyP className="text-base sm:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto">
            Leveraging cutting-edge technology and computer vision to empower you with health literacy and proactive care management.
          </TypographyP>
        </motion.div>

        <div className="mx-auto mt-16 sm:mt-24 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white p-8 sm:p-10 rounded-[32px] transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2"
              >
                <div className="mb-8 relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-50 to-indigo-50 text-blue-600 transition-all duration-500 group-hover:scale-110 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30">
                  <div className="absolute inset-0 rounded-2xl bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <feature.icon className="h-7 w-7 relative z-10" strokeWidth={1.5} />
                </div>
                <TypographyH3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{feature.name}</TypographyH3>
                <TypographyP className="text-base leading-relaxed text-gray-500">
                  {feature.description}
                </TypographyP>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
