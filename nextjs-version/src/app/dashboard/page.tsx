"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "Quarter">("7D");
  const [sandboxQuery, setSandboxQuery] = useState("");
  const [syncingKb, setSyncingKb] = useState<string | null>(null);

  const handleSync = (kbName: string) => {
    setSyncingKb(kbName);
    setTimeout(() => {
      setSyncingKb(null);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header />

        {/* Dashboard Main Viewport */}
        <main className="relative pt-16 bg-surface min-h-screen w-full px-6 lg:px-10 py-6">
          {/* Subtle Ambient 3D Graphic in Top Right */}
          <div className="fixed right-8 top-16 w-[420px] h-[420px] pointer-events-none z-0 opacity-15 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full filter blur-[40px] pointer-events-none" />
            <Image
              src="/assets/ai-neural-core.png"
              alt="AI Neural Core Signature Asset"
              width={420}
              height={420}
              className="w-full h-full object-contain pointer-events-none filter drop-shadow-[0_0_35px_rgba(77,142,255,0.45)]"
            />
          </div>

          <div className="relative z-10 flex flex-col w-full pb-16">
            {/* Page Header */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pt-4 mb-8">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-widest">
                    Workspace Core • Node us-east-1
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Knowledge Intelligence Dashboard
                </h1>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  High-dimensional vector embeddings, hybrid indexing latency, and neural retrieval
                  telemetry.
                </p>
              </div>

              <div className="flex items-center gap-space-sm self-start md:self-auto">
                {/* Time Range Selector */}
                <div className="flex items-center rounded-xl bg-surface-container-high p-1 shadow-sm border border-outline-variant/15">
                  <button
                    type="button"
                    onClick={() => setTimeRange("7D")}
                    className={`px-3 py-1.5 rounded-lg font-citation-chip text-citation-chip transition-all ${
                      timeRange === "7D"
                        ? "bg-surface-container text-primary shadow-inner font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    Past 7 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeRange("30D")}
                    className={`px-3 py-1.5 rounded-lg font-citation-chip text-citation-chip transition-all ${
                      timeRange === "30D"
                        ? "bg-surface-container text-primary shadow-inner font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    30D
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeRange("Quarter")}
                    className={`px-3 py-1.5 rounded-lg font-citation-chip text-citation-chip transition-all ${
                      timeRange === "Quarter"
                        ? "bg-surface-container text-primary shadow-inner font-semibold"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    Quarter
                  </button>
                </div>

                <Link
                  href="/documents"
                  className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:brightness-110 shadow-lg transition-all hover:shadow-[0_0_20px_rgba(77,142,255,0.4)]"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  <span>Upload Documents</span>
                </Link>
              </div>
            </section>

            {/* 4 Metric KPI Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-8">
              <div className="rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md flex flex-col justify-between shadow-md relative overflow-hidden group hover:bg-surface-container transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant uppercase tracking-wider">
                    Total Documents
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[18px]">library_books</span>
                  </div>
                </div>
                <div className="mt-space-md flex items-baseline justify-between">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    1,428
                  </span>
                  <span className="font-citation-chip text-citation-chip text-tertiary px-2 py-0.5 rounded bg-tertiary/10">
                    +12% this week
                  </span>
                </div>
                <div className="mt-space-sm flex items-center gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-code-metadata text-code-metadata text-outline">
                    Across 8 federated repositories
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md flex flex-col justify-between shadow-md relative overflow-hidden group hover:bg-surface-container transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant uppercase tracking-wider">
                    Vector Chunks Indexed
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[18px]">grain</span>
                  </div>
                </div>
                <div className="mt-space-md flex items-baseline justify-between">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    84,210
                  </span>
                  <span className="font-citation-chip text-citation-chip text-primary px-2 py-0.5 rounded bg-primary/10">
                    Qdrant connected
                  </span>
                </div>
                <div className="mt-space-sm flex items-center gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                  <span className="font-code-metadata text-code-metadata text-outline">
                    1536-dim text-embedding-3
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md flex flex-col justify-between shadow-md relative overflow-hidden group hover:bg-surface-container transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant uppercase tracking-wider">
                    Queries Resolved
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[18px]">dynamic_form</span>
                  </div>
                </div>
                <div className="mt-space-md flex items-baseline justify-between">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    12,840
                  </span>
                  <span className="font-citation-chip text-citation-chip text-secondary px-2 py-0.5 rounded bg-secondary/10">
                    112ms avg
                  </span>
                </div>
                <div className="mt-space-sm flex items-center gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span className="font-code-metadata text-code-metadata text-outline">
                    P99 latency &lt; 240ms
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md flex flex-col justify-between shadow-md relative overflow-hidden group hover:bg-surface-container transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant uppercase tracking-wider">
                    Grounded Citation Score
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>
                <div className="mt-space-md flex items-baseline justify-between">
                  <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                    99.8%
                  </span>
                  <span className="font-citation-chip text-citation-chip text-tertiary px-2 py-0.5 rounded bg-tertiary/10">
                    0 Hallucination
                  </span>
                </div>
                <div className="mt-space-sm flex items-center gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                  <span className="font-code-metadata text-code-metadata text-outline">
                    Verified cosine threshold &gt; 0.88
                  </span>
                </div>
              </div>
            </section>

            {/* Split Grid: Left Column (7 cols) + Right Column (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              {/* Left Column: Recent Ingestion & Retrieval Distribution */}
              <div className="lg:col-span-7 flex flex-col gap-space-lg">
                {/* Recent Knowledge Ingestion Card */}
                <div className="rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-lg shadow-md flex flex-col">
                  <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/10">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[22px]">
                        stream
                      </span>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Recent Knowledge Ingestion
                        </h2>
                        <p className="font-code-metadata text-code-metadata text-outline">
                          Live asynchronous parser pipeline
                        </p>
                      </div>
                    </div>
                    <span className="font-citation-chip text-citation-chip text-tertiary px-2.5 py-1 rounded-full bg-surface-container flex items-center gap-1.5 border border-outline-variant/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                      WORKER ACTIVE
                    </span>
                  </div>

                  <div className="flex flex-col gap-space-sm mt-4">
                    {/* Item 1 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high transition-all gap-space-sm">
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary flex-shrink-0">
                          <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-body-md text-body-md font-medium text-on-surface truncate">
                            Financial_Report_Q3.pdf
                          </span>
                          <div className="flex items-center gap-space-sm font-code-metadata text-code-metadata text-outline">
                            <span>14.2 MB</span>
                            <span>•</span>
                            <span>1,840 Chunks</span>
                            <span>•</span>
                            <span className="text-tertiary">Semantic Chunking</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md self-end sm:self-auto">
                        <div className="flex flex-col items-end">
                          <span className="font-citation-chip text-citation-chip text-tertiary font-semibold">
                            100% COMPLETE
                          </span>
                          <span className="font-code-metadata text-code-metadata text-outline">
                            42s ago
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-tertiary text-[20px]">
                          check_circle
                        </span>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high transition-all gap-space-sm">
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary flex-shrink-0">
                          <span className="material-symbols-outlined text-[20px]">description</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-body-md text-body-md font-medium text-on-surface truncate">
                            Medical_Trial_Protocol.docx
                          </span>
                          <div className="flex items-center gap-space-sm font-code-metadata text-code-metadata text-outline">
                            <span>8.4 MB</span>
                            <span>•</span>
                            <span>912 Chunks</span>
                            <span>•</span>
                            <span className="text-secondary">BioBERT Embedding</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md self-end sm:self-auto">
                        <div className="flex flex-col items-end">
                          <span className="font-citation-chip text-citation-chip text-secondary font-semibold">
                            PARSING TOKENS (84%)
                          </span>
                          <div className="w-24 h-1.5 bg-surface-container-highest rounded-full overflow-hidden mt-1">
                            <div className="w-[84%] h-full bg-secondary animate-pulse" />
                          </div>
                        </div>
                        <span className="material-symbols-outlined text-secondary text-[20px] animate-spin">
                          sync
                        </span>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-space-md rounded-xl bg-surface-container border border-outline-variant/10 hover:bg-surface-container-high transition-all gap-space-sm">
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary flex-shrink-0">
                          <span className="material-symbols-outlined text-[20px]">gavel</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-body-md text-body-md font-medium text-on-surface truncate">
                            Legal_Master_Services_Agmt.pdf
                          </span>
                          <div className="flex items-center gap-space-sm font-code-metadata text-code-metadata text-outline">
                            <span>3.1 MB</span>
                            <span>•</span>
                            <span>324 Chunks</span>
                            <span>•</span>
                            <span className="text-primary">Recursive Text Splitter</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-md self-end sm:self-auto">
                        <div className="flex flex-col items-end">
                          <span className="font-citation-chip text-citation-chip text-tertiary font-semibold">
                            INDEXED &amp; SECURED
                          </span>
                          <span className="font-code-metadata text-code-metadata text-outline">
                            8m ago
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-tertiary text-[20px]">
                          lock
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Retrieval Distribution by Collection Card */}
                <div className="rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-lg shadow-md flex flex-col">
                  <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/10">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-tertiary text-[22px]">
                        bar_chart
                      </span>
                      <div>
                        <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Retrieval Distribution by Collection
                        </h2>
                        <p className="font-code-metadata text-code-metadata text-outline">
                          Semantic hit density over the past 24 hours
                        </p>
                      </div>
                    </div>
                    <span className="font-code-metadata text-code-metadata text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                      Cos Similarity &gt; 0.82
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg items-center pt-4">
                    {/* Donut Chart */}
                    <div className="flex flex-col items-center justify-center p-space-md bg-surface-container rounded-xl border border-outline-variant/10">
                      <svg className="w-36 h-36" viewBox="0 0 160 160">
                        <circle
                          cx="80"
                          cy="80"
                          fill="transparent"
                          r="64"
                          stroke="#262a35"
                          strokeWidth="16"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          fill="transparent"
                          r="64"
                          stroke="#4cd7f6"
                          strokeDasharray="402"
                          strokeDashoffset="140"
                          strokeLinecap="round"
                          strokeWidth="16"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          fill="transparent"
                          r="64"
                          stroke="#4d8eff"
                          strokeDasharray="402"
                          strokeDashoffset="310"
                          strokeLinecap="round"
                          strokeWidth="16"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          fill="transparent"
                          r="64"
                          stroke="#c0c1ff"
                          strokeDasharray="402"
                          strokeDashoffset="375"
                          strokeLinecap="round"
                          strokeWidth="16"
                        />
                        <text
                          fill="#dfe2f1"
                          fontFamily="Plus Jakarta Sans"
                          fontSize="18"
                          fontWeight="700"
                          textAnchor="middle"
                          x="80"
                          y="75"
                        >
                          12.8k
                        </text>
                        <text
                          fill="#8c909f"
                          fontFamily="JetBrains Mono"
                          fontSize="9"
                          textAnchor="middle"
                          x="80"
                          y="93"
                        >
                          RETRIEVALS
                        </text>
                      </svg>
                    </div>

                    {/* Breakdown bars */}
                    <div className="flex flex-col gap-space-sm">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center font-code-metadata text-code-metadata">
                          <span className="flex items-center gap-2 text-on-surface">
                            <span className="w-2 h-2 rounded bg-tertiary" />
                            Enterprise Compliance
                          </span>
                          <span className="text-tertiary font-bold">58% (7,447)</span>
                        </div>
                        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                          <div className="bg-tertiary h-full w-[58%]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center font-code-metadata text-code-metadata">
                          <span className="flex items-center gap-2 text-on-surface">
                            <span className="w-2 h-2 rounded bg-primary-container" />
                            Engineering Docs &amp; APIs
                          </span>
                          <span className="text-primary font-bold">27% (3,466)</span>
                        </div>
                        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary-container h-full w-[27%]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center font-code-metadata text-code-metadata">
                          <span className="flex items-center gap-2 text-on-surface">
                            <span className="w-2 h-2 rounded bg-secondary" />
                            Financial &amp; Risk Metrics
                          </span>
                          <span className="text-secondary font-bold">11% (1,412)</span>
                        </div>
                        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                          <div className="bg-secondary h-full w-[11%]" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center font-code-metadata text-code-metadata">
                          <span className="flex items-center gap-2 text-on-surface">
                            <span className="w-2 h-2 rounded bg-surface-bright" />
                            Archived / Legacy Core
                          </span>
                          <span className="text-on-surface-variant font-bold">4% (515)</span>
                        </div>
                        <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                          <div className="bg-surface-bright h-full w-[4%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Active Knowledge Bases, Query Sandbox & Health */}
              <div className="lg:col-span-5 flex flex-col gap-space-lg">
                {/* Active Knowledge Bases Card */}
                <div className="rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-lg shadow-md flex flex-col">
                  <div className="flex items-center justify-between pb-space-md border-b border-outline-variant/10">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-secondary text-[22px]">
                        dataset
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Active Knowledge Bases
                      </h2>
                    </div>
                    <Link
                      href="/knowledge-bases"
                      className="text-tertiary hover:underline font-code-metadata text-code-metadata"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="flex flex-col gap-space-sm mt-4">
                    {/* KB 1 */}
                    <div className="p-space-md rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-tertiary text-[18px]">
                            verified_user
                          </span>
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                            kb-corporate-governance
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSync("kb-corporate-governance")}
                          className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-bright font-citation-chip text-citation-chip text-tertiary flex items-center gap-1 transition-all"
                        >
                          <span
                            className={`material-symbols-outlined text-[12px] ${
                              syncingKb === "kb-corporate-governance" ? "animate-spin" : ""
                            }`}
                          >
                            sync
                          </span>
                          {syncingKb === "kb-corporate-governance" ? "Syncing..." : "Sync"}
                        </button>
                      </div>
                      <div className="flex items-center justify-between font-code-metadata text-code-metadata text-outline mt-1">
                        <span>38,420 chunks</span>
                        <span className="text-tertiary">Health: 99.4% Valid</span>
                        <span>Last sync: 12m</span>
                      </div>
                    </div>

                    {/* KB 2 */}
                    <div className="p-space-md rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-primary text-[18px]">
                            biotech
                          </span>
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                            kb-clinical-research-v2
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSync("kb-clinical-research-v2")}
                          className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-bright font-citation-chip text-citation-chip text-primary flex items-center gap-1 transition-all"
                        >
                          <span
                            className={`material-symbols-outlined text-[12px] ${
                              syncingKb === "kb-clinical-research-v2" ? "animate-spin" : ""
                            }`}
                          >
                            sync
                          </span>
                          {syncingKb === "kb-clinical-research-v2" ? "Syncing..." : "Sync"}
                        </button>
                      </div>
                      <div className="flex items-center justify-between font-code-metadata text-code-metadata text-outline mt-1">
                        <span>29,180 chunks</span>
                        <span className="text-primary">Health: 100% Valid</span>
                        <span>Last sync: 2h</span>
                      </div>
                    </div>

                    {/* KB 3 */}
                    <div className="p-space-md rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-space-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-secondary text-[18px]">
                            terminal
                          </span>
                          <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                            kb-software-architecture
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSync("kb-software-architecture")}
                          className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-bright font-citation-chip text-citation-chip text-secondary flex items-center gap-1 transition-all"
                        >
                          <span
                            className={`material-symbols-outlined text-[12px] ${
                              syncingKb === "kb-software-architecture" ? "animate-spin" : ""
                            }`}
                          >
                            sync
                          </span>
                          {syncingKb === "kb-software-architecture" ? "Syncing..." : "Sync"}
                        </button>
                      </div>
                      <div className="flex items-center justify-between font-code-metadata text-code-metadata text-outline mt-1">
                        <span>16,610 chunks</span>
                        <span className="text-secondary">Health: 98.1% Valid</span>
                        <span>Last sync: 5h</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Query Sandbox */}
                <div className="rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-lg shadow-md flex flex-col">
                  <div className="flex items-center justify-between pb-space-sm">
                    <div className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        terminal
                      </span>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        Quick Query Sandbox
                      </h2>
                    </div>
                    <span className="font-citation-chip text-citation-chip text-outline bg-surface-container px-2 py-0.5 rounded border border-outline-variant/10">
                      RERANKER ON
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    Simulate contextual retrieval and test vector similarity in real-time.
                  </p>
                  <div className="flex items-center rounded-xl bg-surface-container border border-outline-variant/15 px-space-md py-2.5 gap-space-sm focus-within:ring-1 focus-within:ring-primary">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">
                      search_insights
                    </span>
                    <input
                      className="bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-full"
                      placeholder="e.g. What is the SLA guarantee in Section 4.2?"
                      type="text"
                      value={sandboxQuery}
                      onChange={(e) => setSandboxQuery(e.target.value)}
                    />
                    <Link
                      href="/chat"
                      className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 hover:brightness-110"
                      title="Open in AI Chat"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>

                  <div className="mt-space-md p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/10 flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-code-metadata text-code-metadata text-tertiary">
                        PREVIEW RESPONSE
                      </span>
                      <span className="font-citation-chip text-citation-chip text-primary">
                        Score: 0.962
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface italic line-clamp-2">
                      &quot;Section 4.2 mandates a 99.95% system uptime guarantee with 30-minute
                      fallback failovers to warm secondary regions...&quot;
                    </p>
                    <div className="flex items-center gap-space-xs mt-1">
                      <span className="font-citation-chip text-citation-chip text-tertiary px-1.5 py-0.5 rounded bg-tertiary/10">
                        doc: Legal_Master_Services_Agmt.pdf#p12
                      </span>
                    </div>
                  </div>
                </div>

                {/* Infrastructure Health */}
                <div className="rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-lg shadow-md flex flex-col">
                  <div className="flex items-center gap-space-sm pb-space-md border-b border-outline-variant/10">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">
                      monitor_heart
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Infrastructure Health
                    </h2>
                  </div>
                  <div className="flex flex-col gap-space-sm font-code-metadata text-code-metadata mt-4">
                    <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container border border-outline-variant/10">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                        <span className="text-on-surface font-medium">FastAPI Engine</span>
                      </div>
                      <div className="flex items-center gap-space-sm">
                        <span className="text-outline">HTTP 200</span>
                        <span className="text-tertiary px-1.5 py-0.5 rounded bg-surface-container-high">
                          HEALTHY
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container border border-outline-variant/10">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                        <span className="text-on-surface font-medium">Qdrant Cluster (v1.9)</span>
                      </div>
                      <div className="flex items-center gap-space-sm">
                        <span className="text-outline">12ms Latency</span>
                        <span className="text-tertiary px-1.5 py-0.5 rounded bg-surface-container-high">
                          CONNECTED
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container border border-outline-variant/10">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-on-surface font-medium">
                          PostgreSQL Relational Pool
                        </span>
                      </div>
                      <div className="flex items-center gap-space-sm">
                        <span className="text-outline">18 / 64 Conn</span>
                        <span className="text-primary px-1.5 py-0.5 rounded bg-surface-container-high">
                          OPTIMAL
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
