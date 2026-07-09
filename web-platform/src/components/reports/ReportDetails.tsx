"use client";

import React, { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, FileText, Activity, AlertCircle, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { TypographyH1, TypographyP } from "@/components/ui/typography";


export function ReportDetails() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    try {
      setIsExporting(true);
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: document.documentElement.classList.contains("dark") ? "#020617" : "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Medical_Report_${id || "Analysis"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/reports")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <TypographyH1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Comprehensive Blood Panel</TypographyH1>
          <TypographyP className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
            <FileText className="h-4 w-4" /> Validated • Oct 4, 2023
          </TypographyP>
        </div>
        <div className="ml-auto">
          <Button variant="outline" className="gap-2" onClick={handleExportPDF} disabled={isExporting}>
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {isExporting ? "Exporting..." : "Download PDF"}
          </Button>
        </div>
      </div>

      <div ref={reportRef} className="space-y-6 p-1 rounded-xl bg-white dark:bg-slate-950">
        <Card className="border-sky-200 shadow-sm dark:border-sky-900/50">
          <CardHeader className="bg-sky-50/50 border-b border-sky-100 dark:bg-slate-900/50 dark:border-slate-800">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-sky-600" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-slate-700 dark:text-slate-300 space-y-4">
            <TypographyP>
              Your overall blood panel indicates a generally healthy profile. Your complete blood count (CBC) and basic metabolic panel are within normal ranges. However, there are two mild anomalies to observe.
            </TypographyP>
            <ul className="list-disc pl-5 space-y-2">
              <li>Vitamin D levels are slightly below optimal (24 ng/mL vs. recommended 30-100 ng/mL).</li>
              <li>LDL Cholesterol is borderline high (135 mg/dL), though HDL and Triglycerides are excellent.</li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Key Findings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                <div>
                  <TypographyP className="font-semibold text-slate-900 dark:text-white">Vitamin D, 25-OH</TypographyP>
                  <TypographyP className="text-sm text-slate-500 dark:text-slate-400">Reference: 30 - 100 ng/mL</TypographyP>
                </div>
                <div className="text-right">
                  <TypographyP className="font-bold text-red-600 dark:text-red-400">24 ng/mL</TypographyP>
                  <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full dark:bg-red-900/50 dark:text-red-300">LOW</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                <div>
                  <TypographyP className="font-semibold text-slate-900 dark:text-white">LDL Cholesterol</TypographyP>
                  <TypographyP className="text-sm text-slate-500 dark:text-slate-400">Reference: &lt;100 mg/dL</TypographyP>
                </div>
                <div className="text-right">
                  <TypographyP className="font-bold text-amber-600 dark:text-amber-400">135 mg/dL</TypographyP>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full dark:bg-amber-900/50 dark:text-amber-300">HIGH</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                <div>
                  <TypographyP className="font-semibold text-slate-900 dark:text-white">Fasting Glucose</TypographyP>
                  <TypographyP className="text-sm text-slate-500 dark:text-slate-400">Reference: 70 - 99 mg/dL</TypographyP>
                </div>
                <div className="text-right">
                  <TypographyP className="font-bold text-green-700 dark:text-green-500">88 mg/dL</TypographyP>
                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full dark:bg-green-900/50 dark:text-green-300">NORMAL</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose dark:prose-invert text-sm max-w-none text-slate-700 dark:text-slate-300">
                <TypographyP className="font-semibold text-slate-900 dark:text-white mb-2">To address your current findings:</TypographyP>
                <ol className="list-decimal pl-4 space-y-3">
                  <li><strong>Increase Vitamin D Intake:</strong> Consider a daily supplement of 2000 IU of Vitamin D3. Try to get 15 minutes of sun exposure daily.</li>
                  <li><strong>Dietary Adjustments for LDL:</strong> Reduce saturated fats (found in red meat, full-fat dairy) and increase soluble fiber (oats, beans, fruits).</li>
                  <li><strong>Follow-up:</strong> Schedule a brief check-in with your primary care provider next week to discuss maintaining optimal cholesterol levels.</li>
                </ol>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button className="w-full">Schedule Provider Follow-up</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
