"use client";

import React, { useState } from "react";
import { Camera, Upload, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1, TypographyH3, TypographyP } from "@/components/ui/typography";
import api from "@/services/api";
import { toast } from "sonner";


export function SkinAnalysisFeature() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    condition: string;
    confidence: number;
    severity: "Low" | "Medium" | "High";
    recommendation: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await api.post("/skin/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.success) {
        setResult(response.data.analysis);
        toast.success("Skin analysis completed successfully!");
      } else {
        toast.error("Failed to analyze image.");
      }
    } catch (error) {
      console.error("Skin analysis error:", error);
      const err = error as { response?: { data?: { detail?: string } } };
      toast.error(err.response?.data?.detail || "An error occurred during skin analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <TypographyH1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Skin Disease Analysis</TypographyH1>
        <TypographyP className="text-slate-500 dark:text-slate-400">Upload a clear photo of your skin condition for instant AI evaluation.</TypographyP>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Image Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center dark:border-slate-700 dark:bg-slate-900/50">
              {imagePreview ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Skin preview" className="object-cover w-full h-full" />
                </>
              ) : (
                <div className="text-center p-6 space-y-4">
                  <div className="flex justify-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center dark:bg-sky-900/50">
                      <Upload className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div className="h-12 w-12 rounded-full bg-sky-100 flex items-center justify-center dark:bg-sky-900/50">
                      <Camera className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                    </div>
                  </div>
                  <TypographyP className="text-sm text-slate-500 dark:text-slate-400">Click to upload from gallery or take a picture</TypographyP>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>

            <Button className="w-full" onClick={analyzeImage} disabled={!imagePreview || isAnalyzing}>
              {isAnalyzing ? "Analyzing Image..." : "Analyze Condition"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className="border-sky-200 shadow-md dark:border-sky-900/50">
            <CardHeader className="bg-sky-50/50 border-b border-slate-100 pb-4 dark:bg-slate-900/50 dark:border-slate-800">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-sky-600" />
                Analysis Complete
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <TypographyP className="text-sm font-medium text-slate-500 mb-1 dark:text-slate-400">Detected Condition</TypographyP>
                <TypographyH3 className="text-xl font-bold text-slate-900 dark:text-white">{result.condition}</TypographyH3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900/80">
                  <TypographyP className="text-xs font-medium text-slate-500 mb-1 dark:text-slate-400">Confidence Score</TypographyP>
                  <TypographyP className="text-lg font-semibold text-slate-900 dark:text-white">{result.confidence}%</TypographyP>
                </div>
                <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-900/80">
                  <TypographyP className="text-xs font-medium text-slate-500 mb-1 dark:text-slate-400">Severity Level</TypographyP>
                  <TypographyP className="text-lg font-semibold text-green-600 dark:text-green-500">{result.severity}</TypographyP>
                </div>
              </div>

              <div>
                <TypographyP className="text-sm font-medium text-slate-500 mb-2 dark:text-slate-400">AI Recommendation</TypographyP>
                <div className="rounded-lg bg-sky-50 p-4 border border-sky-100 dark:bg-sky-900/20 dark:border-sky-900/50">
                  <TypographyP className="text-sm text-sky-800 leading-relaxed dark:text-sky-300">{result.recommendation}</TypographyP>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!result && !isAnalyzing && (
          <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30">
            <Info className="h-8 w-8 text-slate-400 mb-3" />
            <TypographyH3 className="text-base font-medium text-slate-900 dark:text-white">Awaiting Assessment</TypographyH3>
            <TypographyP className="text-sm text-slate-500 mt-2 max-w-sm dark:text-slate-400">
              Upload an image to receive instant AI evaluation and recommendations for your skin condition.
            </TypographyP>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 dark:text-amber-500" />
          <TypographyP className="text-sm text-amber-800 dark:text-amber-200/80">
            <strong>Disclaimer:</strong> This AI tool provides informational insights and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a healthcare provider for definitive diagnoses.
          </TypographyP>
        </div>
      </div>
    </div>
  );
}
