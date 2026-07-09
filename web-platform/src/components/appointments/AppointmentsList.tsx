"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar as CalendarIcon, Clock, CheckCircle2, ChevronRight,
  Stethoscope, Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from "@/components/ui/typography";
import api from "@/services/api";


interface Doctor {
  id: string;
  name: string;
  specialty: string;
  language: string;
  available: string;
  experience: string;
  rating: number;
}

interface RawDoctor {
  id?: string;
  name: string;
  specialization?: string;
  specialty?: string;
  language?: string;
  available?: string;
  experience?: string;
  rating?: number;
}

export function AppointmentsList() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [bookingModal, setBookingModal] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/appointments/doctors");
        if (response.data && response.data.success) {
          const mapped = response.data.data.map((doc: RawDoctor, index: number): Doctor => ({
            id: doc.id || index.toString(),
            name: doc.name,
            specialty: doc.specialization || doc.specialty || "General Physician",
            language: doc.language || "English",
            available: doc.available || "Today, 2:00 PM",
            experience: doc.experience || "5 years",
            rating: doc.rating || 4.8,
          }));
          setDoctorsList(mapped);
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        toast.error("Failed to load doctors list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctorsList.filter((d) => d.language === selectedLanguage);
  const selectedDoctor = bookingModal ? doctorsList.find((d) => d.id === bookingModal) : null;

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }
    setIsBooking(true);
    try {
      const response = await api.post("/appointments/book", {
        doctor: selectedDoctor?.name,
        date: selectedDate,
        time: selectedTime,
      });

      if (response.data && response.data.success) {
        const demoBooking = {
          doctor: selectedDoctor?.name,
          specialty: selectedDoctor?.specialty,
          date: selectedDate,
          time: selectedTime,
          type: "Online Consultation",
        };
        localStorage.setItem("demo_consultation", JSON.stringify(demoBooking));
        toast.success("Consultation Booked Successfully!");
        setBookingModal(null);
        router.push("/dashboard");
      } else {
        toast.error("Failed to book consultation.");
      }
    } catch (err) {
      console.error("Error booking appointment:", err);
      toast.error("An error occurred during booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      <div className="text-center max-w-2xl mx-auto mt-6">
        <TypographyH1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Online Doctor Consultations
        </TypographyH1>
        <TypographyP className="mt-4 text-lg text-slate-500 dark:text-slate-400">
          Book an instant online consultation with specialist doctors in your native language.
        </TypographyP>
      </div>

      {/* Language Selector */}
      <div className="flex flex-col items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
          <Globe2 className="h-5 w-5 text-sky-500" />
          Choose Consultation Language
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {["English", "Telugu", "Hindi"].map((lang) => (
            <Button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              variant={selectedLanguage === lang ? "default" : "outline"}
              className={selectedLanguage === lang ? "bg-sky-600 hover:bg-sky-700 text-white" : "dark:text-slate-300 dark:border-slate-700"}
            >
              {lang}
            </Button>
          ))}
        </div>
      </div>

      {/* Doctors List */}
      <div>
        <TypographyH2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
          Available Doctors ({selectedLanguage})
        </TypographyH2>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <TypographyP className="text-slate-500 dark:text-slate-400">Loading available doctors...</TypographyP>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredDoctors.map((doc) => (
              <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow dark:border-slate-800 bg-white dark:bg-slate-950">
                <div className="flex flex-col h-full">
                  <div className="p-6 flex-1 flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-slate-100 dark:border-slate-800 shadow-sm">
                      <AvatarFallback className="bg-sky-100 text-sky-700 font-bold text-xl dark:bg-sky-900/50 dark:text-sky-300">
                        {doc.name.split(" ").filter(Boolean)[1]?.[0] || doc.name[0] || "D"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <TypographyH3 className="text-lg font-bold text-slate-900 dark:text-white">{doc.name}</TypographyH3>
                      <div className="flex items-center gap-1.5 text-sm text-sky-600 dark:text-sky-400 font-medium mt-1">
                        <Stethoscope className="h-4 w-4" /> {doc.specialty}
                      </div>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Next Available: {doc.available}
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 border-t border-slate-100 p-4 dark:bg-slate-900/50 dark:border-slate-800">
                    <Button
                      className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                      onClick={() => setBookingModal(doc.id)}
                    >
                      Book Now <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            {filteredDoctors.length === 0 && (
              <div className="md:col-span-2 text-center py-12">
                <TypographyP className="text-slate-500">No doctors currently available for {selectedLanguage}.</TypographyP>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <TypographyH2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Schedule Consultation</TypographyH2>
              <TypographyP className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                Booking demo consultation with <strong className="text-slate-700 dark:text-slate-300">{selectedDoctor?.name}</strong>.
              </TypographyP>
              <div className="space-y-4">
                <div className="space-y-2.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" /> Select Date
                  </label>
                  <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="dark:bg-slate-900 dark:border-slate-800" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Select Time
                  </label>
                  <Input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} className="dark:bg-slate-900 dark:border-slate-800" />
                </div>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 flex gap-3 justify-end border-t border-slate-100 dark:border-slate-800">
              <Button variant="ghost" disabled={isBooking} onClick={() => setBookingModal(null)} className="dark:hover:bg-slate-800">Cancel</Button>
              <Button onClick={handleBook} disabled={isBooking} className="bg-sky-600 hover:bg-sky-700 text-white">
                {isBooking ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
