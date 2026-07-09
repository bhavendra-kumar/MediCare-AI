import React from "react";
import { Activity } from "lucide-react";
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from "@/components/ui/typography";


export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f0f0ee] py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-8 sm:p-16 rounded-[40px] border border-white/50 shadow-xl shadow-gray-200/50">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Activity className="h-10 w-10 text-blue-600" />
          <TypographyH1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">About MediCare AI</TypographyH1>
        </div>
        
        <div className="prose prose-lg prose-slate max-w-none text-gray-700">
          <TypographyP className="text-xl leading-relaxed mb-8">
            At MediCare AI, our mission is to bridge the gap between advanced artificial intelligence and human health. We believe in empowering individuals with health literacy and proactive care management through cutting-edge technology.
          </TypographyP>

          <TypographyH2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Our Platform & Services</TypographyH2>
          
          <div className="grid gap-8 mt-8">
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <TypographyH3 className="text-xl font-semibold text-blue-900 mb-3">AI Health Assistant</TypographyH3>
              <TypographyP>
                Get instant answers to your medical queries with our advanced AI conversational agent. Whether you&apos;re feeling under the weather or just have a quick question about a symptom, our assistant is available 24/7.
              </TypographyP>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <TypographyH3 className="text-xl font-semibold text-blue-900 mb-3">Smart Lab Reports</TypographyH3>
              <TypographyP>
                Medical jargon can be confusing. Simply upload your lab results, and our system will analyze them and break down complex medical terms into simplified, actionable insights so you understand exactly what your results mean.
              </TypographyP>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <TypographyH3 className="text-xl font-semibold text-blue-900 mb-3">Skin Disease Detection</TypographyH3>
              <TypographyP>
                Analyze skin conditions instantly with our AI-powered visual recognition system. Upload a photo of a skin concern, and our models will help identify potential issues, allowing you to seek professional medical advice sooner.
              </TypographyP>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <TypographyH3 className="text-xl font-semibold text-blue-900 mb-3">Seamless Appointments</TypographyH3>
              <TypographyP>
                Take control of your proactive care. Schedule, manage, and receive reminders for your doctor appointments all in one convenient place, ensuring you never miss an important check-up.
              </TypographyP>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
