import React from "react";
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from "@/components/ui/typography";


export function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#f0f0ee] py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-xl p-8 sm:p-16 rounded-[40px] border border-white/50 shadow-xl shadow-gray-200/50">
        <TypographyH1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-8">Terms of Service</TypographyH1>
        
        <div className="prose prose-slate max-w-none text-gray-700 space-y-6">
          <TypographyP>
            Welcome to MediCare AI. By accessing or using our platform, you agree to be bound by these Terms of Service and our Privacy Policy.
          </TypographyP>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl my-8">
            <TypographyH3 className="font-bold text-red-800 m-0 mb-2">Medical Advice Disclaimer</TypographyH3>
            <TypographyP className="text-red-700 m-0">
              MediCare AI is strictly an Artificial Intelligence service platform. The AI can and will make mistakes or provide incomplete information. The content provided by our platform is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Do not follow the AI&apos;s suggestions blindly. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </TypographyP>
          </div>

          <TypographyH2 className="text-xl font-bold text-gray-900">Use of the Service</TypographyH2>
          <TypographyP>
            You may use our platform only for lawful purposes. You are responsible for ensuring that the data you provide, including lab reports and images, does not violate any third-party rights or laws.
          </TypographyP>

          <TypographyH2 className="text-xl font-bold text-gray-900">Limitation of Liability</TypographyH2>
          <TypographyP>
            In no event shall MediCare AI, its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </TypographyP>

          <TypographyH2 className="text-xl font-bold text-gray-900">Changes to Terms</TypographyH2>
          <TypographyP>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any significant changes. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </TypographyP>

          <TypographyP className="text-sm text-gray-500 mt-12 pt-8 border-t border-gray-200">
            Last updated: {new Date().toLocaleDateString()}
          </TypographyP>
        </div>
      </div>
    </div>
  );
}
