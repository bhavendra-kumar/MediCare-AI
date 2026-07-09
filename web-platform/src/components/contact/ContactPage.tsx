"use client";

import React, { useState } from "react";
import { Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { TypographyH1, TypographyH3, TypographyP } from "@/components/ui/typography";


export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0ee] py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <TypographyH1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">Contact Us</TypographyH1>
          <TypographyP className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about MediCare AI? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon as possible.
          </TypographyP>
        </div>

        {/* Contact Form */}
        <div className="w-full">
          <div className="bg-white/70 backdrop-blur-xl p-8 sm:p-12 rounded-[32px] border border-white/50 shadow-xl shadow-gray-200/50">
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full min-h-[400px]">
                  <div className="h-20 w-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <TypographyH3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</TypographyH3>
                  <TypographyP className="text-gray-600 max-w-sm">
                    Thank you for reaching out. Our team will review your message and respond shortly.
                  </TypographyP>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-8 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                        placeholder="John Doe"
                      />
                      {errors.name && <TypographyP className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</TypographyP>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <TypographyP className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</TypographyP>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                      placeholder="How can we help you?"
                    />
                    {errors.subject && <TypographyP className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.subject}</TypographyP>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'}`}
                      placeholder="Write your message here..."
                    />
                    {errors.message && <TypographyP className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message}</TypographyP>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 px-8 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
