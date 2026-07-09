import React from "react";
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from "@/components/ui/typography";


export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f0f0ee] py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl p-8 sm:p-16 rounded-[40px] border border-white/50 shadow-xl shadow-gray-200/50">
        <TypographyH1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-8">Privacy Policy</TypographyH1>
        
        <div className="prose prose-slate max-w-none text-gray-700 space-y-6">
          <TypographyP>
            Welcome to MediCare AI. Your privacy is critically important to us. We understand that medical and health information is highly sensitive, and we are committed to protecting the data you share with our platform.
          </TypographyP>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl my-8">
            <TypographyH3 className="font-bold text-yellow-800 m-0 mb-2">Important AI Disclaimer</TypographyH3>
            <TypographyP className="text-yellow-700 m-0">
              Please note that MediCare AI is an Artificial Intelligence service platform. While we strive for accuracy, the AI can make mistakes or misinterpret data. You should never follow its advice blindly. Always consult with a qualified doctor or healthcare professional for any medical decisions, diagnoses, or treatments.
            </TypographyP>
          </div>

          <TypographyH2 className="text-xl font-bold text-gray-900">Information We Collect</TypographyH2>
          <TypographyP>
            When you use our services, we may collect personal information such as your name, email address, and any medical data you choose to upload (such as lab reports or skin images). This data is used solely to provide and improve our AI diagnostic and assistance services.
          </TypographyP>

          <TypographyH2 className="text-xl font-bold text-gray-900">How We Use Your Information</TypographyH2>
          <TypographyP>
            The information we collect is processed by our AI models to generate insights, answer queries, and schedule appointments. We do not sell your personal or medical data to third parties. All data is encrypted in transit and at rest.
          </TypographyP>

          <TypographyH2 className="text-xl font-bold text-gray-900">Your Rights</TypographyH2>
          <TypographyP>
            You have the right to access, modify, or delete your data from our platform at any time. By continuing to use MediCare AI, you acknowledge and consent to our data practices as outlined in this policy.
          </TypographyP>

          <TypographyP className="text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
            Last updated: {new Date().toLocaleDateString()}
          </TypographyP>
        </div>
      </div>
    </div>
  );
}
