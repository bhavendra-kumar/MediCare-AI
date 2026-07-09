"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Upload, FileText, Search, CheckCircle, X, AlertTriangle,
  ChevronDown, ChevronUp, FileSearch, Clock, Sparkles,
  Activity, ShieldCheck, AlertCircle, TrendingUp, ExternalLink,
  Stethoscope, Brain, ListChecks, Info, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH1, TypographyH3, TypographyP, TypographySmall } from "@/components/ui/typography";
import { toast } from "sonner";
import api from "@/services/api";

/* ─── Types ─────────────────────────────────────── */
interface Report {
  filename: string;
  file_url: string;
  analysis: string;
  created_at: string;
}

type ScanPhase = "idle" | "scanning" | "done";

/* ─── Markdown → Structured renderer ─────────────── */
interface ParsedSection {
  type: "heading" | "paragraph" | "bullets" | "numbered";
  level?: number;
  text?: string;
  items?: string[];
}

function parseMarkdown(text: string): ParsedSection[] {
  const lines = text.split("\n");
  const sections: ParsedSection[] = [];
  let bulletBuffer: string[] = [];
  let numberedBuffer: string[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      sections.push({ type: "bullets", items: [...bulletBuffer] });
      bulletBuffer = [];
    }
  };
  const flushNumbered = () => {
    if (numberedBuffer.length > 0) {
      sections.push({ type: "numbered", items: [...numberedBuffer] });
      numberedBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) { flushBullets(); flushNumbered(); continue; }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      flushBullets(); flushNumbered();
      sections.push({ type: "heading", level: headingMatch[1].length, text: headingMatch[2] });
      continue;
    }
    const bulletMatch = line.match(/^[*\-]\s+(.+)/);
    if (bulletMatch) { flushNumbered(); bulletBuffer.push(bulletMatch[1]); continue; }
    const numberedMatch = line.match(/^\d+\.\s+(.+)/);
    if (numberedMatch) { flushBullets(); numberedBuffer.push(numberedMatch[1]); continue; }

    flushBullets(); flushNumbered();
    sections.push({ type: "paragraph", text: line });
  }
  flushBullets(); flushNumbered();
  return sections.filter(Boolean);
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) return <strong key={i} className="font-semibold text-slate-900 dark:text-white">{boldMatch[1]}</strong>;
    return <span key={i}>{part}</span>;
  });
}

function getSectionMeta(heading: string) {
  const h = heading.toLowerCase();
  if (h.includes("summary") || h.includes("overview"))
    return { icon: <Brain className="h-4 w-4" />, accent: "text-blue-700 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800/50", dot: "bg-blue-500" };
  if (h.includes("finding") || h.includes("anomal") || h.includes("concern") || h.includes("abnormal"))
    return { icon: <AlertCircle className="h-4 w-4" />, accent: "text-amber-700 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800/50", dot: "bg-amber-500" };
  if (h.includes("recommend") || h.includes("action") || h.includes("next"))
    return { icon: <TrendingUp className="h-4 w-4" />, accent: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800/50", dot: "bg-emerald-500" };
  if (h.includes("normal") || h.includes("healthy") || h.includes("good"))
    return { icon: <ShieldCheck className="h-4 w-4" />, accent: "text-green-700 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-200 dark:border-green-800/50", dot: "bg-green-500" };
  if (h.includes("metric") || h.includes("vital") || h.includes("value") || h.includes("reading"))
    return { icon: <Activity className="h-4 w-4" />, accent: "text-purple-700 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-950/30", border: "border-purple-200 dark:border-purple-800/50", dot: "bg-purple-500" };
  if (h.includes("diagnos") || h.includes("impression"))
    return { icon: <Stethoscope className="h-4 w-4" />, accent: "text-rose-700 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-950/30", border: "border-rose-200 dark:border-rose-800/50", dot: "bg-rose-500" };
  return { icon: <ListChecks className="h-4 w-4" />, accent: "text-slate-700 dark:text-slate-300", bg: "bg-slate-50 dark:bg-slate-900/50", border: "border-slate-200 dark:border-slate-700", dot: "bg-slate-400" };
}

function AnalysisRenderer({ text }: { text: string }) {
  const sections = parseMarkdown(text);
  let currentMeta = getSectionMeta("");
  const output: React.ReactNode[] = [];
  let blockBuffer: ParsedSection[] = [];

  const flushBlock = (idx: number) => {
    if (blockBuffer.length === 0) return;
    const meta = currentMeta;
    output.push(
      <div key={`block-${idx}`} className={`rounded-xl border p-4 space-y-3 ${meta.bg} ${meta.border}`}>
        {blockBuffer.map((s, si) => {
          if (s.type === "paragraph")
            return <p key={si} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{renderInline(s.text ?? "")}</p>;
          if (s.type === "bullets")
            return (
              <ul key={si} className="space-y-1.5">
                {s.items!.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${meta.dot}`} />
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          if (s.type === "numbered")
            return (
              <ol key={si} className="space-y-2">
                {s.items!.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className={`shrink-0 flex items-center justify-center h-5 w-5 rounded-full text-[11px] font-bold ${meta.accent} bg-white/60 dark:bg-slate-900/60 border ${meta.border}`}>{ii + 1}</span>
                    <span>{renderInline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          return null;
        })}
      </div>
    );
    blockBuffer = [];
  };

  sections.forEach((section, idx) => {
    if (section.type === "heading") {
      flushBlock(idx);
      currentMeta = getSectionMeta(section.text ?? "");
      output.push(
        <div key={`h-${idx}`} className={`flex items-center gap-2 pt-2 ${currentMeta.accent}`}>
          {currentMeta.icon}
          <span className={`text-xs font-bold uppercase tracking-widest ${currentMeta.accent}`}>{section.text}</span>
        </div>
      );
    } else {
      blockBuffer.push(section);
      if (idx === sections.length - 1) flushBlock(idx);
    }
  });
  flushBlock(sections.length);

  if (output.length === 0)
    return (
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{text}</p>
      </div>
    );

  return <div className="space-y-3">{output}</div>;
}

/* ─── Scan + Results Overlay ─────────────────────── */
function ScanOverlay({
  filename,
  phase,
  analysis,
  fileUrl,
  onClose,
}: {
  filename: string;
  phase: ScanPhase;
  analysis: string;
  fileUrl: string;
  onClose: () => void;
}) {
  const isScanning = phase === "scanning";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className={`bg-white rounded-3xl shadow-2xl flex flex-col items-center w-full transition-all duration-300 ${
          isScanning ? "max-w-sm p-10 gap-6" : "max-w-2xl p-0 gap-0"
        }`}
      >
        {/* ── SCANNING STATE ── */}
        {isScanning && (
          <>
            {/* Animated document */}
            <div className="relative w-32 h-40 shrink-0">
              <div className="absolute inset-0 bg-slate-50 rounded-xl border-2 border-slate-200 shadow-inner overflow-hidden">
                <div className="p-4 pt-6 space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full bg-slate-200 ${
                        i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-4/5" : "w-3/5"
                      }`}
                    />
                  ))}
                </div>
                {/* Scanning beam */}
                <div
                  className="absolute inset-x-0 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-90 shadow-[0_0_12px_4px_rgba(59,130,246,0.6)]"
                  style={{ animation: "scanBeam 1.5s ease-in-out infinite" }}
                />
              </div>
              <div
                className="absolute top-0 right-0 w-6 h-6 bg-slate-200 rounded-bl-xl"
                style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
              />
              <div className="absolute -bottom-3 -right-3 bg-blue-600 rounded-full p-2 shadow-lg shadow-blue-500/40">
                <FileSearch className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900 mb-1">Analyzing Report</h3>
              <p className="text-sm text-slate-500 font-medium truncate max-w-[220px]">{filename}</p>
            </div>

            <div className="w-full space-y-2.5 text-sm">
              {[
                { label: "Uploading document", done: true },
                { label: "Extracting text & data", done: true },
                { label: "Running AI analysis", done: false },
              ].map(({ label, done }) => (
                <div key={label} className="flex items-center gap-3">
                  {done ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
                  )}
                  <span className={done ? "text-slate-500 line-through" : "text-slate-800 font-medium"}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── RESULTS STATE ── */}
        {!isScanning && (
          <>
            {/* Header bar */}
            <div className="w-full flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-linear-to-r from-blue-600 to-indigo-600 rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 rounded-xl p-2">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">AI Analysis Complete</h2>
                  <p className="text-xs text-blue-100 truncate max-w-[260px]">{filename}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white rounded-full p-1.5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* All steps done */}
            <div className="w-full px-6 py-3 flex items-center gap-6 bg-emerald-50/50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/40">
              {[
                "Uploading document",
                "Extracting text & data",
                "Running AI analysis",
              ].map((label) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  {label}
                </div>
              ))}
            </div>

            {/* Analysis content — structured */}
            <div className="w-full px-6 py-5 overflow-y-auto max-h-[60vh]">
              {/* Disclaimer pill */}
              <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                <Info className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                  AI-generated summary — not a substitute for professional medical advice.
                </p>
              </div>
              <AnalysisRenderer text={analysis || "No analysis returned."} />
              {fileUrl && (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
                >
                  <ExternalLink className="h-3 w-3" /> View original file
                </a>
              )}
            </div>

            {/* Footer */}
            <div className="w-full px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end rounded-b-3xl bg-white dark:bg-slate-950">
              <Button
                onClick={onClose}
                className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6"
              >
                Done
              </Button>
            </div>
          </>
        )}

        <style>{`
          @keyframes scanBeam {
            0% { top: 0%; }
            50% { top: 85%; }
            100% { top: 0%; }
          }
        `}</style>
      </div>
    </div>
  );
}

/* ─── Report card component ──────────────────────── */
function ReportCard({ report, onDelete }: { report: Report; onDelete: (filename: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(report.created_at);
  const formattedDate = isNaN(date.getTime())
    ? report.created_at
    : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  // Strip markdown symbols from the preview line
  const firstLine = report.analysis
    ?.split("\n")
    .find((l) => l.trim().length > 10) ?? "View full analysis below.";
  const cleanPreview = firstLine
    .replace(/^[#*>\-]+\s*/g, "")
    .replace(/\*\*/g, "")
    .trim();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <div
        className="flex items-center justify-between p-5 cursor-pointer gap-4"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-11 w-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center shrink-0">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{report.filename}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Clock className="h-3 w-3 text-slate-400" />
              <TypographySmall className="text-xs text-slate-400">{formattedDate}</TypographySmall>
            </div>
            {!expanded && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 max-w-[380px]">{cleanPreview}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-200 dark:ring-emerald-800/50">
            <CheckCircle className="h-3 w-3" /> Analyzed
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(report.filename);
            }}
            className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-colors"
            title="Delete report"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-slate-100 dark:border-slate-800 px-5 pb-5 pt-4">
          {/* Section label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
              <Brain className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              AI Analysis Summary
            </span>
          </div>
          {/* Disclaimer */}
          <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
            <Info className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
              AI-generated summary — not a substitute for professional medical advice.
            </p>
          </div>
          {/* Rendered analysis */}
          <div className="max-h-96 overflow-y-auto pr-1">
            <AnalysisRenderer text={report.analysis} />
          </div>
          {report.file_url && (
            <a
              href={report.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors"
            >
              <ExternalLink className="h-3 w-3" /> View original file
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main ReportsList component ─────────────────── */
export function ReportsList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [scanPhase, setScanPhase] = useState<ScanPhase>("idle");
  const [scanFilename, setScanFilename] = useState("");
  const [scanAnalysis, setScanAnalysis] = useState("");
  const [scanFileUrl, setScanFileUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteReport = async (filename: string) => {
    try {
      const res = await api.delete(`/reports/${filename}`);
      if (res.data?.success) {
        toast.success("Report deleted successfully");
        setReports((prev) => prev.filter((r) => r.filename !== filename));
      } else {
        toast.error(res.data?.message || "Failed to delete report");
      }
    } catch (err) {
      console.error("Failed to delete report", err);
      toast.error("Failed to delete report");
    }
  };

  // Fetch history on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/reports/history");
        if (res.data?.success) {
          setReports(res.data.data ?? []);
        }
      } catch {
        toast.error("Could not load report history.");
      } finally {
        setIsLoadingHistory(false);
      }
    };
    fetchHistory();
  }, []);

  const handleFile = useCallback(async (file: File) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF, JPG, PNG, or WebP files are supported.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("File must be smaller than 20 MB.");
      return;
    }

    setScanFilename(file.name);
    setScanAnalysis("");
    setScanFileUrl("");
    setScanPhase("scanning");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/reports/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        const newReport: Report = {
          filename: res.data.filename ?? file.name,
          file_url: res.data.file_url ?? "",
          analysis: res.data.analysis ?? "",
          created_at: new Date().toISOString(),
        };
        // Add to list in background
        setReports((prev) => [newReport, ...prev]);
        // Show results in overlay
        setScanAnalysis(newReport.analysis);
        setScanFileUrl(newReport.file_url);
        setScanPhase("done");   // ← stays open showing summary
      } else {
        throw new Error(res.data?.message ?? "Analysis failed. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to analyze report.";
      toast.error(msg);
      setScanPhase("idle");
      setScanFilename("");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, []);

  const closeScanOverlay = () => {
    setScanPhase("idle");
    setScanFilename("");
    setScanAnalysis("");
    setScanFileUrl("");
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const filtered = reports.filter((r) =>
    r.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Scan + Results overlay */}
      {scanPhase !== "idle" && (
        <ScanOverlay
          filename={scanFilename}
          phase={scanPhase}
          analysis={scanAnalysis}
          fileUrl={scanFileUrl}
          onClose={closeScanOverlay}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Medical Reports
        </TypographyH1>
        <Button
          className="gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 rounded-xl"
          onClick={() => fileInputRef.current?.click()}
          disabled={scanPhase !== "idle"}
        >
          <Upload className="h-4 w-4" /> Upload New Report
        </Button>
      </div>

      {/* Upload drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 group
          ${isDragging
            ? "border-blue-500 bg-blue-50 scale-[1.01]"
            : "border-slate-300 bg-white hover:border-blue-400 hover:bg-blue-50/30"
          }`}
      >
        <div
          className={`rounded-2xl p-4 mb-1 transition-colors duration-200 ${
            isDragging ? "bg-blue-100" : "bg-slate-100 group-hover:bg-blue-100"
          }`}
        >
          <Upload
            className={`h-7 w-7 transition-colors duration-200 ${
              isDragging ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"
            }`}
          />
        </div>
        <TypographyH3 className="text-base font-semibold text-slate-800">
          {isDragging ? "Drop to analyze" : "Upload a medical report"}
        </TypographyH3>
        <TypographyP className="text-sm text-slate-500 text-center max-w-xs">
          Drag &amp; drop your PDF, JPG, or PNG file here, or click to browse. AI will extract and
          summarize it instantly.
        </TypographyP>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl mt-1 pointer-events-none"
          tabIndex={-1}
        >
          Browse Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={onFileInput}
        />
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search reports..."
          className="pl-10 rounded-xl border-slate-200 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Report list */}
      {isLoadingHistory ? (
        <div className="flex items-center justify-center py-16 gap-3 text-slate-400">
          <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
          <span className="text-sm font-medium">Loading reports...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
          <div className="p-4 rounded-2xl bg-slate-100">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <p className="text-sm font-medium">
            {searchTerm
              ? "No reports match your search."
              : "No reports yet. Upload your first one!"}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-500 font-semibold"
            >
              <X className="h-3 w-3" /> Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((report, i) => (
            <ReportCard key={`${report.filename}-${i}`} report={report} onDelete={handleDeleteReport} />
          ))}
        </div>
      )}
    </div>
  );
}
