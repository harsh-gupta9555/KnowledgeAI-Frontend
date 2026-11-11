"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function SummarizePage() {
  const [format, setFormat] = useState<"executive" | "technical" | "action">("executive");
  const [selectedDoc, setSelectedDoc] = useState("Enterprise_SecOps_v4.pdf");

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex">
      <Sidebar />
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="relative pt-16 bg-surface min-h-screen w-full px-6 lg:px-10 py-8">
          <div className="flex flex-col gap-6 max-w-5xl pb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-widest">
                  Neural Compression &amp; Dense Synthesis
                </span>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                  Document Summarization
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Distill voluminous technical manuals, legal treaties, and financial disclosures into auditable synopses.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-primary-container text-on-primary font-headline-sm text-body-sm hover:brightness-110 flex items-center gap-1.5 shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            {/* Config & Format Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setFormat("executive")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  format === "executive"
                    ? "bg-surface-container-high border-primary text-on-surface shadow-md"
                    : "bg-surface-container-low border-outline-variant/15 text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-md text-label-md font-semibold">Executive Briefing</span>
                  <span className="material-symbols-outlined text-primary text-[18px]">auto_stories</span>
                </div>
                <p className="font-code-metadata text-code-metadata text-outline">
                  High-level insights, strategic risks, and top decisions for C-suite stakeholders.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFormat("technical")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  format === "technical"
                    ? "bg-surface-container-high border-tertiary text-on-surface shadow-md"
                    : "bg-surface-container-low border-outline-variant/15 text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-md text-label-md font-semibold">Technical Deep Dive</span>
                  <span className="material-symbols-outlined text-tertiary text-[18px]">memory</span>
                </div>
                <p className="font-code-metadata text-code-metadata text-outline">
                  Algorithms, API payloads, vector parameters, and architectural benchmarks.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFormat("action")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  format === "action"
                    ? "bg-surface-container-high border-secondary text-on-surface shadow-md"
                    : "bg-surface-container-low border-outline-variant/15 text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-md text-label-md font-semibold">Action &amp; SLA Matrix</span>
                  <span className="material-symbols-outlined text-secondary text-[18px]">checklist</span>
                </div>
                <p className="font-code-metadata text-code-metadata text-outline">
                  Deadlines, penalty triggers, indemnification requirements, and operational deliverables.
                </p>
              </button>
            </div>

            {/* Generated Summary Card */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/15 shadow-xl flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">auto_awesome</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Synthesized Summary: {selectedDoc}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-citation-chip text-citation-chip text-tertiary px-2 py-0.5 rounded bg-surface-container border border-outline-variant/10">
                    Compressed 94.2% (18,400 → 1,068 Tok)
                  </span>
                </div>
              </div>

              <div className="font-body-md text-body-md text-on-surface space-y-4 leading-relaxed">
                <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/10">
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-1">
                    Key Architectural Takeaways
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-on-surface-variant text-body-sm font-body-sm">
                    <li>
                      <strong className="text-on-surface">Cryptographic Isolation:</strong> All vector representations are partitioned across dedicated tenant collections in Qdrant with zero shared embeddings across organizational accounts.
                    </li>
                    <li>
                      <strong className="text-on-surface">Deprovisioning Guarantees:</strong> Zero-fill purging triggers automatically within 15 minutes of token revocation signal via secured webhooks.
                    </li>
                    <li>
                      <strong className="text-on-surface">Hybrid Search Benchmark:</strong> BGE reranker produces top-8 passage fusion within 128ms retrieval latency under production load.
                    </li>
                  </ul>
                </div>

                <p className="text-on-surface-variant">
                  In compliance with ISO/IEC 27001 and SOC2 Type II standards, cold data storage maintains immutable logs for access audits. Recovery mechanisms enforce a 7-day rollback safeguard window before irreversible drive block re-writing occurs.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
