"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex">
      <Sidebar />
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="relative pt-16 bg-surface min-h-screen w-full px-6 lg:px-10 py-8">
          <div className="flex flex-col gap-6 max-w-6xl pb-16">
            <div>
              <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-widest">
                Ragas &amp; TruLens Grounding Telemetry
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                Evaluation &amp; Analytics
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Quantitative validation of semantic retrieval faithfulness, context precision, and hallucination boundary metrics.
              </p>
            </div>

            {/* 4 Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between shadow-sm">
                <span className="font-code-metadata text-code-metadata text-outline uppercase">Faithfulness</span>
                <span className="font-headline-lg text-headline-lg text-tertiary font-bold my-2">99.8%</span>
                <span className="font-code-metadata text-code-metadata text-tertiary">Zero ungrounded assertions</span>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between shadow-sm">
                <span className="font-code-metadata text-code-metadata text-outline uppercase">Context Precision</span>
                <span className="font-headline-lg text-headline-lg text-primary font-bold my-2">0.941</span>
                <span className="font-code-metadata text-code-metadata text-outline">Top-k relevance accuracy</span>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between shadow-sm">
                <span className="font-code-metadata text-code-metadata text-outline uppercase">Context Recall</span>
                <span className="font-headline-lg text-headline-lg text-secondary font-bold my-2">0.962</span>
                <span className="font-code-metadata text-code-metadata text-outline">Golden ground-truth overlap</span>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between shadow-sm">
                <span className="font-code-metadata text-code-metadata text-outline uppercase">Answer Relevance</span>
                <span className="font-headline-lg text-headline-lg text-tertiary-fixed font-bold my-2">0.954</span>
                <span className="font-code-metadata text-code-metadata text-tertiary-fixed">Semantic cosine match</span>
              </div>
            </div>

            {/* Latency Pipeline Breakdown */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/15 shadow-xl flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">speed</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Inference Latency Pipeline Decomposition (284ms Total)
                  </h3>
                </div>
                <span className="font-citation-chip text-citation-chip text-primary px-2 py-0.5 rounded bg-surface-container border border-outline-variant/10">
                  p95 &lt; 320ms SLA
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between font-code-metadata text-code-metadata mb-1">
                    <span className="text-on-surface">1. Query Embedding (text-embedding-3-large)</span>
                    <span className="text-tertiary">24ms (8%)</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-tertiary h-full w-[8%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-code-metadata text-code-metadata mb-1">
                    <span className="text-on-surface">2. Hybrid Qdrant Vector Retrieval (Dense + BM25)</span>
                    <span className="text-primary">68ms (24%)</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[24%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-code-metadata text-code-metadata mb-1">
                    <span className="text-on-surface">3. BGE Cross-Encoder Reranking (top-k = 8)</span>
                    <span className="text-secondary">36ms (13%)</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full w-[13%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-code-metadata text-code-metadata mb-1">
                    <span className="text-on-surface">4. Streaming Token Generation (Claude 3.5 Sonnet)</span>
                    <span className="text-primary-container">156ms (55%)</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary-container h-full w-[55%]" />
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
