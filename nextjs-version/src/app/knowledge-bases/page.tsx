"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface KnowledgeBase {
  id: string;
  name: string;
  description: string;
  chunks: number;
  health: string;
  lastSync: string;
  vectorModel: string;
  icon: string;
  color: string;
}

export default function KnowledgeBasesPage() {
  const [kbs, setKbs] = useState<KnowledgeBase[]>([
    {
      id: "kb-1",
      name: "kb-corporate-governance",
      description: "Enterprise bylaws, board resolutions, regulatory filings, and global SEC compliance mandates.",
      chunks: 38420,
      health: "99.4%",
      lastSync: "12m ago",
      vectorModel: "text-embedding-3-large (1536d)",
      icon: "verified_user",
      color: "text-tertiary",
    },
    {
      id: "kb-2",
      name: "kb-clinical-research-v2",
      description: "Double-blind clinical trials, FDA documentation, patient exclusion vectors, and BioMed data.",
      chunks: 29180,
      health: "100%",
      lastSync: "2h ago",
      vectorModel: "BioBERT Dense Vector (768d)",
      icon: "biotech",
      color: "text-primary",
    },
    {
      id: "kb-3",
      name: "kb-software-architecture",
      description: "Technical RFCs, OpenAPI 3.1 definitions, infrastructure blueprints, and Qdrant cluster topology.",
      chunks: 16610,
      health: "98.1%",
      lastSync: "5h ago",
      vectorModel: "Cohere-embed-v3 (1536d)",
      icon: "terminal",
      color: "text-secondary",
    },
    {
      id: "kb-4",
      name: "kb-quarterly-financials",
      description: "Audited 10-K/10-Q filings, ledger extracts, risk evaluation charts, and EBITDA forecasts.",
      chunks: 24150,
      health: "99.9%",
      lastSync: "1d ago",
      vectorModel: "text-embedding-3-large (1536d)",
      icon: "account_balance",
      color: "text-tertiary",
    },
  ]);

  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKbName, setNewKbName] = useState("");
  const [newKbDesc, setNewKbDesc] = useState("");

  const handleSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setKbs((prev) =>
        prev.map((k) => (k.id === id ? { ...k, lastSync: "Just now" } : k))
      );
    }, 1500);
  };

  const handleCreateKb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKbName) return;
    const newEntry: KnowledgeBase = {
      id: `kb-${Date.now()}`,
      name: newKbName.toLowerCase().replace(/\s+/g, "-"),
      description: newKbDesc || "Custom enterprise knowledge collection.",
      chunks: 0,
      health: "100%",
      lastSync: "Just now",
      vectorModel: "text-embedding-3-large (1536d)",
      icon: "dataset",
      color: "text-primary",
    };
    setKbs((prev) => [newEntry, ...prev]);
    setShowCreateModal(false);
    setNewKbName("");
    setNewKbDesc("");
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex">
      <Sidebar />

      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        <Header />

        <main className="relative pt-16 bg-surface min-h-screen w-full px-6 lg:px-10 py-6">
          <div className="relative z-10 flex flex-col gap-space-lg py-2 pb-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div>
                <div className="flex items-center gap-space-xs mb-1">
                  <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-widest">
                    Semantic Storage &amp; Vector Collections
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Active Knowledge Bases
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                  Organize, monitor, and synchronize vector collections across Qdrant cluster shards.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-headline-sm text-body-md hover:brightness-110 shadow-lg transition-all flex items-center gap-space-xs"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span>Create Knowledge Base</span>
              </button>
            </div>

            {/* Knowledge Bases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {kbs.map((kb) => (
                <div
                  key={kb.id}
                  className="p-space-lg rounded-2xl bg-surface-container-low border border-outline-variant/15 shadow-md flex flex-col justify-between hover:bg-surface-container transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                          <span className={`material-symbols-outlined text-[22px] ${kb.color}`}>
                            {kb.icon}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            {kb.name}
                          </span>
                          <span className="font-code-metadata text-code-metadata text-outline">
                            {kb.vectorModel}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSync(kb.id)}
                        className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-bright font-citation-chip text-citation-chip text-tertiary flex items-center gap-1.5 transition-all border border-outline-variant/10"
                      >
                        <span
                          className={`material-symbols-outlined text-[14px] ${
                            syncingId === kb.id ? "animate-spin" : ""
                          }`}
                        >
                          sync
                        </span>
                        {syncingId === kb.id ? "Syncing..." : "Sync Now"}
                      </button>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant my-4 leading-relaxed">
                      {kb.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/10 grid grid-cols-3 gap-2 font-code-metadata text-code-metadata">
                    <div>
                      <span className="text-outline block">Chunks</span>
                      <span className="text-on-surface font-bold">
                        {kb.chunks.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-outline block">Health</span>
                      <span className="text-tertiary font-bold">{kb.health}</span>
                    </div>
                    <div>
                      <span className="text-outline block">Last Sync</span>
                      <span className="text-on-surface-variant">{kb.lastSync}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create Modal */}
          {showCreateModal && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <form
                onSubmit={handleCreateKb}
                className="bg-surface-container-low border border-outline-variant/30 rounded-2xl w-full max-w-lg p-space-lg shadow-2xl flex flex-col gap-space-md"
              >
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/15">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      dataset
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      New Knowledge Base
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="p-1 rounded-lg text-outline hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-code-metadata text-code-metadata text-outline uppercase">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. kb-product-roadmap"
                    value={newKbName}
                    onChange={(e) => setNewKbName(e.target.value)}
                    className="bg-surface-container rounded-xl p-2.5 text-on-surface border border-outline-variant/20 outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-code-metadata text-code-metadata text-outline uppercase">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify domain, intended audience, and data sources..."
                    value={newKbDesc}
                    onChange={(e) => setNewKbDesc(e.target.value)}
                    className="bg-surface-container rounded-xl p-2.5 text-on-surface border border-outline-variant/20 outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl bg-surface-container text-on-surface-variant font-label-md text-label-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:brightness-110 shadow-md"
                  >
                    Create Collection
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
