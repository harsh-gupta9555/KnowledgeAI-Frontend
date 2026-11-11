"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AgentWorkspacePage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex">
      <Sidebar />
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="relative pt-16 bg-surface min-h-screen w-full px-6 lg:px-10 py-8">
          <div className="flex flex-col gap-6 max-w-5xl">
            <div>
              <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-widest">
                Autonomous Retrieval &amp; Tool Calling
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                Agent Workspace
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Configure recursive RAG agents with multi-step reasoning, external MCP tool calling,
                and self-correcting context validation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    Research Synthesizer
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Crawls all corporate knowledge bases to assemble multi-source executive briefings with source verification.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="font-citation-chip text-citation-chip text-tertiary">STANDBY</span>
                  <button className="px-3 py-1 rounded-lg bg-surface-container font-label-md text-label-md text-on-surface hover:bg-surface-bright">
                    Deploy
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[24px]">balance</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    Contract Auditor
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Scans uploaded MSAs, NDAs, and SLAs for indemnification liabilities and termination trigger clauses.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="font-citation-chip text-citation-chip text-primary">RUNNING</span>
                  <button className="px-3 py-1 rounded-lg bg-surface-container font-label-md text-label-md text-on-surface hover:bg-surface-bright">
                    Inspect
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/15 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[24px]">bug_report</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    Architecture Validator
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Cross-references OpenAPI schemas with backend repository code to flag drift and outdated endpoints.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="font-citation-chip text-citation-chip text-secondary">ACTIVE</span>
                  <button className="px-3 py-1 rounded-lg bg-surface-container font-label-md text-label-md text-on-surface hover:bg-surface-bright">
                    Logs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
