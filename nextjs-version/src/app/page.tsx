"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThreeNeuralCore from "@/components/ThreeNeuralCore";

export default function HomePage() {
  const [activeCitation, setActiveCitation] = useState<string>("doc-1");
  const [viewMode3D, setViewMode3D] = useState<"threejs" | "sculpture">("threejs");

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary-container relative overflow-x-hidden">
      {/* Top Ambient Glows */}
      <div className="absolute -top-40 left-1/4 w-[540px] h-[540px] rounded-full bg-primary-container/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[460px] h-[460px] rounded-full bg-tertiary/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-96 left-1/3 w-[380px] h-[380px] rounded-full bg-secondary-container/15 blur-[120px] pointer-events-none" />

      {/* Top Public Header */}
      <header className="sticky top-0 z-50 w-full h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/15 px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-space-sm group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-container to-tertiary flex items-center justify-center shadow-[0_0_16px_rgba(77,142,255,0.35)] group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-surface-container-lowest text-[18px]">
              neurology
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
              KnowledgeAI
            </span>
            <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-wider">
              Enterprise RAG
            </span>
          </div>
        </Link>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-space-lg text-body-sm text-on-surface-variant font-medium">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/chat" className="hover:text-primary transition-colors">
            AI Chat
          </Link>
          <Link href="/documents" className="hover:text-primary transition-colors">
            Documents
          </Link>
          <Link href="/knowledge-bases" className="hover:text-primary transition-colors">
            Knowledge Bases
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-space-sm">
          <div className="hidden sm:flex items-center gap-1.5 px-space-sm py-1 rounded-xl bg-surface-container-low border border-outline-variant/10 text-tertiary text-code-metadata font-code-metadata">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span>v4.2-PROD</span>
          </div>
          <Link
            href="/dashboard"
            className="px-space-md py-2 rounded-xl bg-primary-container text-on-primary font-headline-sm text-body-sm shadow-[0_0_20px_rgba(77,142,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>Launch App</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-16">
        {/* HERO SECTION: Asymmetric 12-Column Grid */}
        <section className="relative pt-6 pb-12">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-center">
            {/* Hero Left Column (7 cols) */}
            <div className="xl:col-span-7 flex flex-col space-y-6 z-10">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-space-xs self-start px-space-md py-1.5 rounded-full bg-surface-container-high/80 border border-outline-variant/20 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(76,215,246,0.8)]" />
                <span className="font-citation-chip text-citation-chip text-tertiary uppercase tracking-wider">
                  Next-Gen RAG Intelligence Platform
                </span>
                <span className="font-code-metadata text-code-metadata text-outline px-1.5 py-0.5 rounded bg-surface-container-highest">
                  v4.2 PROD
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display-hero text-display-hero text-on-surface tracking-tight leading-[1.08] max-w-2xl">
                Your Knowledge.
                <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent block mt-1">
                  Connected. Understood.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                Transform your documents into an intelligent knowledge system. Upload your files,
                ask questions, discover semantic insights, and get AI-powered answers backed by
                verifiable citations from your own sources.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-space-md pt-2">
                <Link
                  href="/chat"
                  className="group relative px-space-lg py-3.5 rounded-xl bg-primary-container text-on-primary font-headline-sm text-body-md shadow-[0_0_24px_rgba(77,142,255,0.45)] hover:shadow-[0_0_32px_rgba(77,142,255,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-space-sm"
                >
                  <span className="font-semibold tracking-wide">Get Started Free</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>

                <Link
                  href="/dashboard"
                  className="px-space-lg py-3.5 rounded-xl bg-surface-container-high/90 text-on-surface font-body-md hover:bg-surface-container-highest border border-outline-variant/20 transition-all duration-200 shadow-sm flex items-center gap-space-xs"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary">bolt</span>
                  <span>Explore Dashboard</span>
                </Link>

                <div className="flex items-center gap-space-xs px-space-md py-2.5 rounded-xl bg-surface-container-low/80 border border-outline-variant/15">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">
                    verified_user
                  </span>
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant">
                    SOC2 Type II &amp; HIPAA Ready
                  </span>
                </div>
              </div>

              {/* Live Stats Row */}
              <div className="grid grid-cols-3 gap-space-sm pt-4 max-w-xl">
                <div className="p-space-md rounded-xl bg-surface-container-low/90 border border-outline-variant/15 shadow-sm backdrop-blur-md">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                      Accuracy
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                  </div>
                  <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                    99.4%
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant pt-0.5">
                    Citation Accuracy
                  </p>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low/90 border border-outline-variant/15 shadow-sm backdrop-blur-md">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                      Latency
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="font-headline-lg text-headline-lg text-tertiary font-bold tracking-tight">
                    &lt;140ms
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant pt-0.5">
                    Vector Retrieval
                  </p>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low/90 border border-outline-variant/15 shadow-sm backdrop-blur-md">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                      Safety
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  </div>
                  <div className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                    Zero
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant pt-0.5">
                    Hallucination Guard
                  </p>
                </div>
              </div>

              {/* Tech Stack Trust Badges */}
              <div className="pt-2">
                <span className="font-code-metadata text-code-metadata text-outline uppercase tracking-widest block pb-2">
                  Production-Grade Architecture
                </span>
                <div className="flex flex-wrap items-center gap-space-xs">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/10 text-on-surface-variant text-body-sm font-code-metadata">
                    <span className="material-symbols-outlined text-[15px] text-primary">layers</span>
                    Next.js 15
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/10 text-on-surface-variant text-body-sm font-code-metadata">
                    <span className="material-symbols-outlined text-[15px] text-tertiary">speed</span>
                    FastAPI
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/10 text-on-surface-variant text-body-sm font-code-metadata">
                    <span className="material-symbols-outlined text-[15px] text-secondary">database</span>
                    PostgreSQL
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/10 text-on-surface-variant text-body-sm font-code-metadata">
                    <span className="material-symbols-outlined text-[15px] text-tertiary">hub</span>
                    Qdrant Vector DB
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/10 text-tertiary-fixed text-body-sm font-code-metadata">
                    <span className="material-symbols-outlined text-[15px]">scatter_plot</span>
                    Hybrid Dense &amp; Sparse
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Right Column: 3D Scene + Overlay Anchors (5 cols) */}
            <div className="xl:col-span-5 relative flex items-center justify-center min-h-[520px]">
              <div className="absolute inset-0 m-auto w-80 h-80 rounded-full bg-gradient-to-tr from-primary-container/30 to-secondary/30 blur-3xl pointer-events-none" />

              {/* Mode Toggle Controls */}
              <div className="absolute top-2 right-2 z-30 flex items-center bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-1 border border-outline-variant/20 shadow-md">
                <button
                  type="button"
                  onClick={() => setViewMode3D("threejs")}
                  className={`px-3 py-1 rounded-lg font-citation-chip text-citation-chip transition-all ${
                    viewMode3D === "threejs"
                      ? "bg-primary-container text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  3D WebGL Canvas
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode3D("sculpture")}
                  className={`px-3 py-1 rounded-lg font-citation-chip text-citation-chip transition-all ${
                    viewMode3D === "sculpture"
                      ? "bg-primary-container text-on-primary font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  AI Sculpture
                </button>
              </div>

              {/* 3D Visual Container */}
              <div className="relative w-full z-10 flex items-center justify-center group h-[480px]">
                {viewMode3D === "threejs" ? (
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-outline-variant/20 bg-surface-container-lowest/40 backdrop-blur-sm relative">
                    <ThreeNeuralCore className="w-full h-full" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2 pointer-events-none text-code-metadata font-code-metadata text-tertiary">
                      <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
                      <span>Interactive WebGL 3D Intelligence Sphere (Move cursor)</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20 bg-surface-container-low max-w-[460px]">
                    <Image
                      src="/assets/ai-neural-core.png"
                      alt="AI Neural Core Signature 3D Obsidian Sculpture"
                      width={460}
                      height={460}
                      className="w-full h-auto object-cover rounded-2xl shadow-[0_0_32px_rgba(77,142,255,0.3)] transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-t from-surface via-transparent to-transparent opacity-40" />
                  </div>
                )}
              </div>

              {/* Telemetry Overlay Card 1 (Top Left) */}
              <div className="absolute -top-4 -left-6 z-20 p-space-sm rounded-xl bg-surface-container-high/90 border border-outline-variant/20 backdrop-blur-xl shadow-xl hover:scale-105 transition-transform duration-300 max-w-[240px]">
                <div className="flex items-center gap-space-xs mb-1">
                  <div className="w-6 h-6 rounded-lg bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[14px]">psychology_alt</span>
                  </div>
                  <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-wider">
                    Active Retrieval
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface font-medium">
                  Retrieval Anchor
                </p>
                <p className="font-code-metadata text-code-metadata text-on-surface-variant">
                  12 semantic chunks analyzed
                </p>
                <div className="w-full bg-surface-container-highest rounded-full h-1 mt-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-tertiary to-primary h-full w-[88%]" />
                </div>
              </div>

              {/* Telemetry Overlay Card 2 (Bottom Right) */}
              <div className="absolute -bottom-6 -right-4 z-20 p-space-sm rounded-xl bg-surface-container-high/90 border border-outline-variant/20 backdrop-blur-xl shadow-xl hover:scale-105 transition-transform duration-300 max-w-[260px]">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-code-metadata text-code-metadata text-on-surface">
                      Qdrant Collection
                    </span>
                  </div>
                  <span className="font-citation-chip text-citation-chip text-primary px-1.5 py-0.5 rounded bg-primary-container/20">
                    COSINE 0.98
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface font-semibold">
                  142,800 Embeddings
                </p>
                <p className="font-code-metadata text-code-metadata text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[13px] text-tertiary">
                    check_circle
                  </span>
                  Verified &amp; deduplicated in memory
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: 3-Step Feature Process Pipeline */}
        <section className="py-8 relative">
          <div className="flex flex-col items-center text-center mb-10">
            <span className="font-citation-chip text-citation-chip text-tertiary uppercase tracking-widest px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/15 mb-space-xs">
              Cognitive Flow
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Enterprise RAG Engine Workflow
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-1">
              High-throughput ingestion to verifiable real-time synthesis in three auditable stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Step 1 Card */}
            <div className="relative group p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/15 hover:bg-surface-container transition-all duration-300 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">upload_file</span>
                  </div>
                  <span className="font-citation-chip text-citation-chip text-outline font-bold">
                    01 / STAGE
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                  1. Ingest &amp; Chunk Documents
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Extract tabular data, recursive layouts, and hierarchical headings. Text is parsed
                  into semantic sliding-window chunks with preserved parent-child metadata.
                </p>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 border border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    description
                  </span>
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant">
                    PDF, Markdown, Notion, Confluence
                  </span>
                </div>
                <span className="font-code-metadata text-code-metadata text-primary">
                  512 Tok/Chunk
                </span>
              </div>
            </div>

            {/* Step 2 Card */}
            <div className="relative group p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/15 hover:bg-surface-container transition-all duration-300 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">hub</span>
                  </div>
                  <span className="font-citation-chip text-citation-chip text-outline font-bold">
                    02 / STAGE
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                  2. Hybrid Semantic Vector Search
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Dual-path vector evaluation fusing dense cosine representations with sparse BM25
                  token frequencies. Cohere cross-encoder reranking prioritizes top-k passages.
                </p>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 border border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    query_stats
                  </span>
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant">
                    Cross-Encoder Re-rank
                  </span>
                </div>
                <span className="font-code-metadata text-code-metadata text-tertiary">
                  Top-k=8 (RRF 60)
                </span>
              </div>
            </div>

            {/* Step 3 Card */}
            <div className="relative group p-space-lg rounded-xl bg-surface-container-low border border-outline-variant/15 hover:bg-surface-container transition-all duration-300 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">fact_check</span>
                  </div>
                  <span className="font-citation-chip text-citation-chip text-outline font-bold">
                    03 / STAGE
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                  3. Grounded Synthesis &amp; Citations
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Strict context-injection constraints guarantee zero hallucinated output. Every
                  claim generates clickable cryptographic citation tokens linked directly to raw
                  chunk text.
                </p>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-lowest/80 border border-outline-variant/10 flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    verified
                  </span>
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant">
                    Deterministic Provenance
                  </span>
                </div>
                <span className="font-code-metadata text-code-metadata text-secondary">
                  Cosine &gt; 0.89
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Live Interactive RAG Synthesis Preview Card */}
        <section className="py-6">
          <div className="p-space-lg rounded-2xl bg-surface-container-low/95 border border-outline-variant/20 shadow-xl backdrop-blur-2xl">
            {/* Top Toolbar of the Preview Workspace */}
            <div className="flex flex-wrap items-center justify-between gap-space-md pb-space-md border-b border-outline-variant/15">
              <div className="flex items-center gap-space-sm">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-surface-bright" />
                <div className="w-3 h-3 rounded-full bg-tertiary" />
                <span className="font-code-metadata text-code-metadata text-outline ml-2">
                  SESSION #rag-88219-prod
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="font-code-metadata text-code-metadata text-on-surface-variant flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
                  Streaming Inference
                </span>
                <div className="px-space-sm py-1 rounded bg-surface-container font-citation-chip text-citation-chip text-primary border border-outline-variant/10">
                  Temperature: 0.1
                </div>
                <div className="px-space-sm py-1 rounded bg-surface-container font-citation-chip text-citation-chip text-tertiary border border-outline-variant/10">
                  Model: GPT-4o + Qdrant HNSW
                </div>
              </div>
            </div>

            {/* Asymmetric Two-Column Split in Interactive Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start pt-6">
              {/* Left Sub-Panel: Query & AI Synthesized Answer (7 cols) */}
              <div className="lg:col-span-7 flex flex-col space-y-space-md">
                {/* Simulated User Prompt Input */}
                <div className="p-space-md rounded-xl bg-surface-container border border-outline-variant/10 flex items-start gap-space-sm shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="font-code-metadata text-code-metadata text-outline uppercase">
                      User Prompt
                    </span>
                    <p className="font-body-md text-body-md text-on-surface font-medium pt-0.5">
                      &quot;What are the data retention protocols for encrypted vector embeddings and
                      raw chunk storage during tenant deprovisioning?&quot;
                    </p>
                  </div>
                </div>

                {/* Synthesized Response Card with Interactive Citations */}
                <div className="p-space-lg rounded-xl bg-surface-container-high/90 border border-outline-variant/15 shadow-md space-y-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <div className="w-6 h-6 rounded-lg bg-tertiary text-on-tertiary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[15px]">auto_awesome</span>
                      </div>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        KnowledgeAI Synthesis
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container font-code-metadata text-code-metadata text-tertiary border border-outline-variant/15">
                      <span className="material-symbols-outlined text-[14px]">shield</span>
                      <span>Grounded 99.8%</span>
                    </div>
                  </div>

                  {/* Synthesized Content Body with Highlightable Citations */}
                  <div className="font-body-md text-body-md text-on-surface space-y-3 leading-relaxed">
                    <p>
                      Upon formal tenant deprovisioning initiation, all vector collections indexed
                      in the dedicated Qdrant shard undergo an automated cryptographic zero-fill purge{" "}
                      <button
                        type="button"
                        onClick={() => setActiveCitation("doc-1")}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded transition-all font-citation-chip text-citation-chip ${
                          activeCitation === "doc-1"
                            ? "bg-tertiary text-surface-container-lowest font-bold ring-2 ring-tertiary shadow-[0_0_12px_rgba(76,215,246,0.6)]"
                            : "bg-tertiary-container/30 text-tertiary hover:bg-tertiary-container/50"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">link</span>
                        [Ref 1: SecOps Manual §4.2]
                      </button>{" "}
                      within a strict 15-minute SLA threshold.
                    </p>
                    <p>
                      Concurrently, cold raw document chunk partitions hosted on private S3 buckets
                      receive an immutable cryptographic deletion ticket. Soft-retention backups are
                      permanently expunged following a compliant 7-day rollback safeguard window{" "}
                      <button
                        type="button"
                        onClick={() => setActiveCitation("doc-2")}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded transition-all font-citation-chip text-citation-chip ${
                          activeCitation === "doc-2"
                            ? "bg-secondary text-surface-container-lowest font-bold ring-2 ring-secondary shadow-[0_0_12px_rgba(192,193,255,0.6)]"
                            : "bg-secondary-container/30 text-secondary hover:bg-secondary-container/50"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">link</span>
                        [Ref 2: Compliance Matrix p.89]
                      </button>
                      . Auditable verification proofs are signed with Ed25519 keys and delivered
                      directly to the compliance officer.
                    </p>
                  </div>

                  {/* Quick Verification Feedback Row */}
                  <div className="pt-2 flex items-center justify-between text-on-surface-variant font-code-metadata text-code-metadata border-t border-outline-variant/10">
                    <div className="flex items-center gap-space-md">
                      <span className="flex items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[15px]">timer</span>
                        128ms retrieval
                      </span>
                      <span className="flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-[15px]">memory</span>
                        4,118 prompt tokens
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="hover:text-on-surface transition-colors p-1"
                        type="button"
                        title="Good Response"
                      >
                        <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                      </button>
                      <button
                        className="hover:text-on-surface transition-colors p-1"
                        type="button"
                        title="Flag inaccurate"
                      >
                        <span className="material-symbols-outlined text-[18px]">thumb_down</span>
                      </button>
                      <button
                        className="hover:text-on-surface transition-colors p-1"
                        type="button"
                        title="Copy synthesis"
                      >
                        <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sub-Panel: Verified Chunk Inspector Drawer (5 cols) */}
              <div className="lg:col-span-5 flex flex-col space-y-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                    Source Inspector &amp; Chunk Attributions
                  </span>
                  <span className="font-citation-chip text-citation-chip text-tertiary bg-surface-container px-2 py-0.5 rounded border border-outline-variant/10">
                    2 Active Citations
                  </span>
                </div>

                {/* Citation Source 1 (Matching Doc 1) */}
                <div
                  className={`p-space-md rounded-xl bg-surface-container border transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${
                    activeCitation === "doc-1"
                      ? "border-tertiary shadow-[0_0_20px_rgba(76,215,246,0.25)] bg-surface-container-high/90"
                      : "border-outline-variant/15 opacity-80"
                  }`}
                  onClick={() => setActiveCitation("doc-1")}
                >
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        description
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface font-semibold truncate max-w-[200px]">
                        Enterprise_SecOps_v4.pdf
                      </span>
                    </div>
                    <span className="font-code-metadata text-code-metadata text-tertiary bg-surface-container-high px-2 py-0.5 rounded">
                      Sim: 0.941
                    </span>
                  </div>
                  <p className="font-code-metadata text-code-metadata text-outline pb-1.5">
                    Chunk ID: #chk-81902 • Section 4.2 &quot;Tenant Deprovisioning&quot;
                  </p>
                  <div className="p-space-sm rounded-lg bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    &quot;...Upon receiving formal deprovisioning signal via administrative webhook,
                    all{" "}
                    <mark className="bg-tertiary-container/30 text-tertiary px-1 rounded font-semibold">
                      Qdrant vector collections undergo automated cryptographic zero-fill purge within
                      15 minutes
                    </mark>{" "}
                    of token invalidation...&quot;
                  </div>
                </div>

                {/* Citation Source 2 (Matching Doc 2) */}
                <div
                  className={`p-space-md rounded-xl bg-surface-container border transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer ${
                    activeCitation === "doc-2"
                      ? "border-secondary shadow-[0_0_20px_rgba(192,193,255,0.25)] bg-surface-container-high/90"
                      : "border-outline-variant/15 opacity-80"
                  }`}
                  onClick={() => setActiveCitation("doc-2")}
                >
                  <div className="flex items-center justify-between pb-2">
                    <div className="flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-secondary text-[18px]">
                        table_chart
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface font-semibold truncate max-w-[200px]">
                        Global_Compliance_Matrix_2025.xlsx
                      </span>
                    </div>
                    <span className="font-code-metadata text-code-metadata text-secondary bg-surface-container-high px-2 py-0.5 rounded">
                      Sim: 0.918
                    </span>
                  </div>
                  <p className="font-code-metadata text-code-metadata text-outline pb-1.5">
                    Chunk ID: #chk-40281 • Page 89 &quot;Disaster Retention&quot;
                  </p>
                  <div className="p-space-sm rounded-lg bg-surface-container-lowest font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    &quot;...Raw text chunk storage partitions adhere to standard{" "}
                    <mark className="bg-secondary-container/40 text-secondary px-1 rounded font-semibold">
                      7-day disaster rollback safeguard window
                    </mark>
                    , after which permanent, irreversible physical block overwriting is enacted...&quot;
                  </div>
                </div>

                {/* Vector Similarity Metric Strip */}
                <div className="p-space-sm rounded-xl bg-surface-container-high/60 border border-outline-variant/10 flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      analytics
                    </span>
                    <span className="font-code-metadata text-code-metadata text-on-surface">
                      Embeddings: Cohere-embed-v3 (1536 dim)
                    </span>
                  </div>
                  <span className="font-citation-chip text-citation-chip text-tertiary">
                    Euclidean Cosine
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Operational Metrics & DataStore Telemetry Grid */}
        <section className="pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between pb-2">
                <span className="font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                  Indexed Documents
                </span>
                <span className="material-symbols-outlined text-primary text-[18px]">
                  folder_copy
                </span>
              </div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold">2.4M+</div>
              <div className="flex items-center gap-1 text-tertiary font-code-metadata text-code-metadata pt-1">
                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                <span>+18.4% this quarter</span>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between pb-2">
                <span className="font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                  Semantic Queries
                </span>
                <span className="material-symbols-outlined text-tertiary text-[18px]">bolt</span>
              </div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold">98.2M</div>
              <div className="flex items-center gap-1 text-tertiary font-code-metadata text-code-metadata pt-1">
                <span className="material-symbols-outlined text-[14px]">check</span>
                <span>99.99% cluster uptime</span>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between pb-2">
                <span className="font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                  HNSW Precision
                </span>
                <span className="material-symbols-outlined text-secondary text-[18px]">adjust</span>
              </div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold">0.998</div>
              <div className="flex items-center gap-1 text-on-surface-variant font-code-metadata text-code-metadata pt-1">
                <span>Recall @ 10 items</span>
              </div>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between pb-2">
                <span className="font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                  FastAPI Throughput
                </span>
                <span className="material-symbols-outlined text-tertiary text-[18px]">speed</span>
              </div>
              <div className="font-headline-md text-headline-md text-on-surface font-bold">
                3,450 req/s
              </div>
              <div className="flex items-center gap-1 text-tertiary font-code-metadata text-code-metadata pt-1">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                <span>&lt;18ms p95 latency</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/15 bg-surface-container-lowest/80 py-8 px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between text-body-sm text-outline gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-surface-container-lowest text-[12px]">
              neurology
            </span>
          </div>
          <span>&copy; 2026 KnowledgeAI Inc. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6 font-code-metadata text-code-metadata text-on-surface-variant">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/chat" className="hover:text-primary transition-colors">
            AI Chat
          </Link>
          <Link href="/documents" className="hover:text-primary transition-colors">
            Documents
          </Link>
          <Link href="/knowledge-bases" className="hover:text-primary transition-colors">
            Knowledge Bases
          </Link>
        </div>
      </footer>
    </div>
  );
}
