"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  FileText,
  ScanLine,
  Calendar,
  Settings,
  ArrowRight,
  Sparkles,
  Shield,
  Lock,
  MessageSquare,
  Bell,
  CheckCircle2,
  Clock,
  Video,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyH3, TypographyP } from "@/components/ui/typography";
import api from "@/services/api";

interface Appointment {
  _id?: string;
  doctor: string;
  date: string;
  time: string;
}

export function Dashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/");
        if (res.data?.success) {
          setAppointments(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      }
    };
    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (appointmentId: string) => {
    try {
      const res = await api.delete(`/appointments/${appointmentId}`);
      if (res.data?.success) {
        toast.success("Appointment deleted successfully");
        setAppointments((prev) => prev.filter((a) => a._id !== appointmentId));
      } else {
        toast.error(res.data?.message || "Failed to delete appointment");
      }
    } catch (err) {
      console.error("Failed to delete appointment", err);
      toast.error("Failed to delete appointment");
    }
  };


  return (
    <div className="space-y-6 w-full max-w-[1300px] mx-auto pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-4xl bg-[#101427] text-white shadow-2xl min-h-[400px] p-6 sm:p-8 lg:p-14 flex items-center"
      >
        <div className="absolute inset-0 bg-linear-to-tr from-blue-900/30 to-transparent"></div>
        <div className="absolute -right-24 bottom-0 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row md:items-center justify-between w-full h-full gap-10">
          <div className="max-w-xl xl:max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 sm:mb-8 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs font-semibold tracking-wide text-white drop-shadow">
              <Sparkles className="w-3.5 h-3.5" /> Next-Generation Healthcare
            </div>
            <TypographyH1 className="text-4xl sm:text-5xl lg:text-[4rem] font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
              Welcome to <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-sky-400">
                MediCare AI
              </span>
            </TypographyH1>
            <TypographyP className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal max-w-[500px] leading-relaxed">
              Your comprehensive, intelligent medical assistant. Save time with instant online appointments, decode complex medical reports, and diagnose skin conditions—all in one seamless platform.
            </TypographyP>
          </div>

          <div className="relative hidden lg:flex items-center justify-center flex-1 h-full min-h-[350px]">
            <div className="relative w-full h-[400px] flex items-center justify-center -translate-x-10 mt-10">
              <div className="absolute bottom-0 w-[280px] h-[70px] rounded-[100%] border-[3px] border-blue-500/80 shadow-[0_0_50px_rgba(59,130,246,0.6)] bg-blue-500/10"></div>
              <div className="absolute bottom-[-15px] w-[350px] h-[90px] rounded-[100%] border border-blue-500/30"></div>
              <div className="relative z-10 w-28 h-28 -translate-y-8 flex items-center justify-center animate-[pulse_4s_infinite]">
                <Shield className="w-28 h-28 text-white filter drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
                <div className="absolute text-blue-600 font-black text-4xl mt-[-4px]">+</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 px-1 py-4">
        {/* AI Chat Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-12 xl:col-span-7"
        >
          <div
            onClick={() => router.push("/chat")}
            className="relative h-full min-h-[250px] sm:min-h-[300px] overflow-hidden rounded-2xl bg-linear-to-br from-white to-purple-50/40 border border-slate-200 p-6 sm:p-8 md:p-10 shadow-md shadow-slate-200/60 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer group dark:bg-slate-900 dark:border-slate-800 dark:from-slate-900 dark:to-indigo-950/30 dark:shadow-none"
          >
            <div className="relative z-10 w-full md:w-[55%] h-full flex flex-col justify-between items-start">
              <div className="w-full">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 sm:mb-5 rounded-md bg-purple-100/80 text-purple-700 text-[10px] font-bold uppercase tracking-wider dark:bg-purple-900/30 dark:text-purple-300">
                  <Sparkles className="w-3.5 h-3.5" /> RECOMMENDED
                </div>
                <TypographyH3 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 dark:text-white mb-2 sm:mb-3">AI Chat Assistant</TypographyH3>
                <TypographyP className="text-slate-500 text-sm sm:text-[15px] leading-relaxed mb-5 sm:mb-6 dark:text-slate-400 font-medium">
                  Get instant, personalized answers to your medical queries. Our advanced AI is available 24/7 to provide guidance, analyze symptoms, and offer health tips.
                </TypographyP>
              </div>
              <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 text-white rounded-full px-5 py-5 font-semibold text-sm shadow-md transition-all group-hover:scale-105">
                <MessageSquare className="mr-2 w-4 h-4" /> Start a Consultation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-[45%] hidden lg:flex items-center justify-center p-6">
              <div className="relative w-48 h-48 drop-shadow-2xl translate-x-4">
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-20 bg-slate-100 rounded-b-[3rem] rounded-t-3xl shadow-xl border-b-4 border-slate-200 z-10 dark:bg-slate-800 dark:border-slate-700">
                  <div className="absolute top-4 left-4 right-4 h-12 bg-slate-900 rounded-xl flex items-center justify-center gap-4 shadow-inner">
                    <div className="w-3 h-2 bg-sky-400 rounded-full animate-pulse shadow-[0_0_10px_#38bdf8]"></div>
                    <div className="flex gap-1 animate-pulse"><div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div><div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div></div>
                    <div className="w-3 h-2 bg-sky-400 rounded-full animate-pulse shadow-[0_0_10px_#38bdf8]"></div>
                  </div>
                </div>
                <div className="absolute top-[88px] left-1/2 -translate-x-1/2 w-1.5 h-8 bg-slate-300 z-0 flex flex-col items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full -mt-2 animate-pulse shadow-[0_0_10px_#c084fc]"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Analyze Reports Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-12 xl:col-span-5"
        >
          <div
            onClick={() => router.push("/reports")}
            className="relative h-full min-h-[250px] sm:min-h-[300px] overflow-hidden rounded-2xl bg-linear-to-br from-white to-sky-50/40 border border-slate-200 p-6 sm:p-8 shadow-md shadow-slate-200/60 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800 dark:from-slate-900 dark:to-sky-950/20 dark:shadow-none group"
          >
            <div className="relative z-10 w-full md:w-[60%] xl:w-[55%]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 text-blue-600 rounded-xl flex flex-col items-center justify-center mb-4 sm:mb-5 shadow-sm dark:bg-blue-900/40 dark:text-blue-400">
                <FileText className="w-5 h-5" />
              </div>
              <TypographyH3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 dark:text-white">Analyze Reports</TypographyH3>
              <TypographyP className="text-slate-500 text-[13px] leading-relaxed mb-4 sm:mb-6 font-medium dark:text-slate-400">
                Upload your lab results and get them simplified into clear, actionable insights using AI.
              </TypographyP>
            </div>
            <button className="relative z-10 w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-50 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:bg-slate-700">
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[55%] pointer-events-none drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 hidden sm:block">
              <div className="w-[180px] h-[220px] bg-white rounded-xl border border-slate-100 shadow-xl relative overflow-hidden dark:bg-slate-800 dark:border-slate-700">
                <div className="absolute top-0 right-0 border-l-30 border-b-30 border-l-slate-100 border-b-white bg-slate-200 dark:border-b-slate-800 dark:border-l-slate-700 dark:bg-slate-600"></div>
                <div className="p-4 pt-6 flex flex-col space-y-4">
                  <div className="w-10 h-10 rounded-full border-[6px] border-blue-400 border-r-slate-100"></div>
                  <div className="space-y-2">
                    <div className="w-full h-2 bg-slate-100 rounded-full dark:bg-slate-700"></div>
                    <div className="w-4/5 h-2 bg-slate-100 rounded-full dark:bg-slate-700"></div>
                    <div className="w-full h-2 bg-slate-100 rounded-full dark:bg-slate-700"></div>
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-blue-100 text-blue-600 text-[9px] font-bold px-2 py-1 rounded-md flex items-center gap-1 dark:bg-blue-900/50 dark:text-blue-300">
                  <Sparkles className="w-2.5 h-2.5" /> AI Analysis
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skin Analysis Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="col-span-1 md:col-span-6 xl:col-span-4"
        >
          <div
            onClick={() => router.push("/skin-analysis")}
            className="relative h-full overflow-hidden rounded-2xl bg-linear-to-br from-white to-emerald-50/40 border border-slate-200 p-6 sm:p-8 shadow-md shadow-slate-200/60 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[250px] sm:min-h-[300px] group dark:bg-slate-900 dark:border-slate-800 dark:from-slate-900 dark:to-emerald-950/20 dark:shadow-none"
          >
            <div className="relative z-10 w-full sm:w-[60%] lg:w-[60%] xl:w-[60%]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100/80 text-emerald-600 rounded-xl flex flex-col items-center justify-center mb-4 sm:mb-5 shadow-sm dark:bg-emerald-900/40 dark:text-emerald-400">
                <ScanLine className="w-5 h-5" />
              </div>
              <TypographyH3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 dark:text-white">Skin Analysis</TypographyH3>
              <TypographyP className="text-slate-500 text-[13px] leading-relaxed mb-4 sm:mb-6 font-medium dark:text-slate-400">
                Analyze skin conditions instantly with our visual recognition system for immediate insights.
              </TypographyP>
            </div>
            <button className="relative z-20 w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-emerald-600 transition-colors group-hover:bg-emerald-50 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:bg-slate-700">
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="absolute -right-4 -bottom-4 w-36 h-36 opacity-100 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 hidden sm:block">
              <div className="w-full h-full bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm dark:bg-slate-800 dark:border-slate-700 flex flex-col p-4 rotate-6">
                <div className="w-full h-full border-[1.5px] border-emerald-500/30 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 relative">
                  <div className="absolute inset-0 overflow-hidden rounded-lg">
                    <div className="w-full h-0.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse mt-4"></div>
                  </div>
                  <ScanLine className="w-8 h-8 text-emerald-400/80" />
                  <div className="w-12 h-1.5 bg-emerald-100 rounded-full dark:bg-emerald-900/50"></div>
                </div>
              </div>
              <div className="absolute -bottom-2 -left-2 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full p-2 shadow-lg dark:bg-emerald-900 dark:border-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Appointments Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-span-1 md:col-span-6 xl:col-span-4"
        >
          <div
            onClick={() => router.push("/appointments")}
            className="relative h-full overflow-hidden rounded-2xl bg-linear-to-br from-white to-orange-50/40 border border-slate-200 p-6 sm:p-8 shadow-md shadow-slate-200/60 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[250px] sm:min-h-[300px] group dark:bg-slate-900 dark:border-slate-800 dark:from-slate-900 dark:to-orange-950/20 dark:shadow-none"
          >
            <div className="relative z-10 w-full md:w-[60%]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100/80 text-orange-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-sm dark:bg-orange-900/40 dark:text-orange-400">
                <Calendar className="w-5 h-5" />
              </div>
              <TypographyH3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 dark:text-white">Appointments</TypographyH3>
              <TypographyP className="text-slate-500 text-[13px] leading-relaxed mb-4 sm:mb-6 font-medium dark:text-slate-400">
                Schedule, manage, and receive reminders for your upcoming doctor appointments.
              </TypographyP>
            </div>
            <button className="relative z-20 w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-orange-600 transition-colors group-hover:bg-orange-50 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:bg-slate-700">
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="absolute -right-4 -bottom-6 w-36 h-36 opacity-100 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 hidden sm:block">
              <div className="w-full h-full bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm dark:bg-slate-800 dark:border-slate-700 flex flex-col rotate-[-4deg]">
                <div className="bg-orange-400 h-8 flex items-center px-4 justify-between">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                  </div>
                </div>
                <div className="p-3 pb-4 grid grid-cols-4 gap-1.5 flex-1 w-full bg-slate-50 dark:bg-slate-900">
                  {[...Array(11)].map((_, i) => (
                    <div key={i} className={`w-full aspect-square rounded-[3px] shadow-sm ${i === 6 ? "bg-orange-400" : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"}`}></div>
                  ))}
                  <div className="w-full aspect-square rounded-[3px] bg-orange-100 flex items-center justify-center border border-orange-200 dark:bg-orange-900/30 dark:border-orange-800 pointer-events-none">
                    <CheckCircle2 className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-2 bg-orange-100 border border-orange-200 text-orange-600 rounded-full p-2 shadow-lg dark:bg-orange-900 dark:border-orange-700 dark:text-orange-400">
                <Bell className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="col-span-1 md:col-span-6 xl:col-span-4"
        >
          <div
            onClick={() => router.push("/settings")}
            className="relative h-full overflow-hidden rounded-2xl bg-linear-to-br from-white to-purple-50/40 border border-slate-200 p-6 sm:p-8 shadow-md shadow-slate-200/60 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[250px] sm:min-h-[300px] group dark:bg-slate-900 dark:border-slate-800 dark:from-slate-900 dark:to-purple-950/20 dark:shadow-none"
          >
            <div className="relative z-10 w-full md:w-[60%]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100/80 text-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-5 shadow-sm dark:bg-purple-900/40 dark:text-purple-400">
                <Settings className="w-5 h-5" />
              </div>
              <TypographyH3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 dark:text-white">Settings</TypographyH3>
              <TypographyP className="text-slate-500 text-[13px] leading-relaxed mb-4 sm:mb-6 font-medium dark:text-slate-400">
                Manage your account preferences and application configuration securely.
              </TypographyP>
            </div>
            <button className="relative z-10 w-10 h-10 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-purple-600 transition-colors group-hover:bg-purple-50 dark:bg-slate-800 dark:border-slate-700 dark:group-hover:bg-slate-700">
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="absolute -right-4 -bottom-6 w-36 h-36 items-center justify-center drop-shadow-2xl opacity-90 transform group-hover:scale-105 transition-transform duration-500 hidden sm:flex">
              <Shield className="w-24 h-24 text-purple-400 fill-purple-100 absolute drop-shadow-lg dark:fill-purple-900/50" />
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center z-10 shadow-inner dark:bg-slate-800">
                <Lock className="w-5 h-5 text-purple-500" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Appointments Section */}
      {appointments.length > 0 && (
        <div className="px-1 py-4">
          <div className="flex items-center justify-between mb-4">
            <TypographyH3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" /> Upcoming Appointments
            </TypographyH3>
            <Button variant="outline" size="sm" onClick={() => router.push("/appointments")}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {appointments.slice(0, 3).map((apt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <Video className="w-3 h-3" /> Online
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {apt.time}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{apt.doctor}</h4>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{apt.date}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  {apt._id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAppointment(apt._id!);
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-colors"
                      title="Delete appointment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
