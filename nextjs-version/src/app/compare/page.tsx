"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DocumentComparisonPage() {
  const [docA, setDocA] = useState("Enterprise_SecOps_v4.pdf");
  const [docB, setDocB] = useState("Global_Compliance_Matrix_2025.xlsx");
  const [diffMode, setDiffMode] = useState<"semantic" | "clause" | "raw">("semantic");

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex">
      <Sidebar />
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="relative pt-16 bg-surface min-h-screen w-full px-6 lg:px-10 py-8">
          <div className="flex flex-col gap-6 max-w-6xl pb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-widest">
                  High-Precision Cross-Corpus Synthesis
                </span>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                  Document Comparison
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Align, diff, and identify semantic discrepancies and legal liabilities between multiple corpus artifacts.
                </p>
              </div>

              {/* Diff Mode Selector */}
              <div className="flex items-center rounded-xl bg-surface-container-high p-1 border border-outline-variant/15">
                <button
                  type="button"
                  onClick={() => setDiffMode("semantic")}
                  className={`px-3 py-1.5 rounded-lg font-citation-chip text-citation-chip transition-all ${
                    diffMode === "semantic"
                      ? "bg-primary-container text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Semantic Delta
                </button>
                <button
                  type="button"
                  onClick={() => setDiffMode("clause")}
                  className={`px-3 py-1.5 rounded-lg font-citation-chip text-citation-chip transition-all ${
                    diffMode === "clause"
                      ? "bg-primary-container text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Clause Alignment
                </button>
                <button
                  type="button"
                  onClick={() => setDiffMode("raw")}
                  className={`px-3 py-1.5 rounded-lg font-citation-chip text-citation-chip transition-all ${
                    diffMode === "raw"
                      ? "bg-primary-container text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Vector Raw Diff
                </button>
              </div>
            </div>

            {/* Document Selectors Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[22px]">description</span>
                  <div className="flex flex-col">
                    <span className="font-code-metadata text-code-metadata text-outline uppercase">Baseline Artifact A</span>
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">{docA}</span>
                  </div>
                </div>
                <span className="font-citation-chip text-citation-chip text-tertiary px-2 py-0.5 rounded bg-surface-container">
                  312 chunks
                </span>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[22px]">table_chart</span>
                  <div className="flex flex-col">
                    <span className="font-code-metadata text-code-metadata text-outline uppercase">Target Artifact B</span>
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">{docB}</span>
                  </div>
                </div>
                <span className="font-citation-chip text-citation-chip text-secondary px-2 py-0.5 rounded bg-surface-container">
                  148 chunks
                </span>
              </div>
            </div>

            {/* Comparison Results Card */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/15 shadow-xl flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">compare</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Synthesized Discrepancies (3 Identified)
                  </h3>
                </div>
                <span className="font-citation-chip text-citation-chip text-tertiary px-2.5 py-1 rounded-full bg-surface-container border border-outline-variant/10">
                  Cosine Alignment: 0.884
                </span>
              </div>

              <div className="space-y-4">
                {/* Discrepancy 1 */}
                <div className="p-4 rounded-xl bg-surface-container border border-amber-500/20 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-amber-400 font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">warning</span>
                      Tenant Deprovisioning SLA Mismatch
                    </span>
                    <span className="font-code-metadata text-code-metadata text-outline">Section 4.2 vs Page 89</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Baseline requires automated purge within <strong className="text-tertiary font-medium">15 minutes</strong>, while Target matrix specifies a standard <strong className="text-secondary font-medium">7-day rollback safeguard window</strong>.
                  </p>
                </div>

                {/* Discrepancy 2 */}
                <div className="p-4 rounded-xl bg-surface-container border border-emerald-500/20 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Data Encryption At Rest (Aligned)
                    </span>
                    <span className="font-code-metadata text-code-metadata text-outline">Section 1.1 vs Page 12</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Both documents consistently enforce AES-256-GCM or Ed25519 cipher suites across all multi-tenant storage nodes.
                  </p>
                </div>

                {/* Discrepancy 3 */}
                <div className="p-4 rounded-xl bg-surface-container border border-blue-500/20 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      Notice Window for Convenience Termination
                    </span>
                    <span className="font-code-metadata text-code-metadata text-outline">Section 8.4 vs Annex B</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Enterprise Client requires a mandatory 30-day written lead time; non-cancelable compute reservations remain payable in full.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
