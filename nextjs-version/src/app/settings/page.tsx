"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function SettingsPage() {
  const [qdrantHost, setQdrantHost] = useState("https://cluster-us-east-1.qdrant.io:6333");
  const [apiKey, setApiKey] = useState("qd_live_9f82bc7190a42...");
  const [embeddingModel, setEmbeddingModel] = useState("text-embedding-3-large");
  const [topK, setTopK] = useState(8);
  const [threshold, setThreshold] = useState(0.85);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex">
      <Sidebar />
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="relative pt-16 bg-surface min-h-screen w-full px-6 lg:px-10 py-8">
          <div className="flex flex-col gap-6 max-w-4xl pb-16">
            <div>
              <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-widest">
                System Topology &amp; Security Controls
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-1">
                Workspace Settings
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Manage Qdrant cluster connections, embedding models, cross-encoder rerankers, and cryptographic grounding thresholds.
              </p>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-6">
              {/* Vector Database Credentials */}
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/15 shadow-md flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary text-[22px]">database</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Qdrant Cluster Credentials
                  </h3>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-code-metadata text-code-metadata text-outline uppercase">
                    Cluster Endpoint URL
                  </label>
                  <input
                    type="text"
                    value={qdrantHost}
                    onChange={(e) => setQdrantHost(e.target.value)}
                    className="p-3 rounded-xl bg-surface-container border border-outline-variant/15 text-on-surface font-code-metadata text-code-metadata outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-code-metadata text-code-metadata text-outline uppercase">
                    Vector Access Token (API Key)
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="p-3 rounded-xl bg-surface-container border border-outline-variant/15 text-on-surface font-code-metadata text-code-metadata outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Model & RAG Tuning */}
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/15 shadow-md flex flex-col gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/10">
                  <span className="material-symbols-outlined text-tertiary text-[22px]">tune</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Inference &amp; RAG Parameters
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-code-metadata text-code-metadata text-outline uppercase">
                      Default Embedding Model
                    </label>
                    <select
                      value={embeddingModel}
                      onChange={(e) => setEmbeddingModel(e.target.value)}
                      className="p-3 rounded-xl bg-surface-container border border-outline-variant/15 text-on-surface font-body-sm text-body-sm outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="text-embedding-3-large">OpenAI text-embedding-3-large (1536d)</option>
                      <option value="cohere-embed-v3">Cohere-embed-english-v3.0 (1024d)</option>
                      <option value="biobert">BioBERT Specialized Vectors (768d)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-code-metadata text-code-metadata text-outline uppercase">
                      Top-k Retrieved Passages: {topK}
                    </label>
                    <input
                      type="range"
                      min={3}
                      max={20}
                      value={topK}
                      onChange={(e) => setTopK(Number(e.target.value))}
                      className="accent-primary cursor-pointer mt-3"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="flex justify-between items-center">
                    <label className="font-code-metadata text-code-metadata text-outline uppercase">
                      Minimum Cosine Grounding Threshold
                    </label>
                    <span className="font-code-metadata text-code-metadata text-tertiary font-bold">
                      {threshold}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.6}
                    max={0.98}
                    step={0.01}
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="accent-tertiary cursor-pointer"
                  />
                  <span className="font-code-metadata text-code-metadata text-outline">
                    Assertions matching vectors below this score will trigger hallucination warnings.
                  </span>
                </div>
              </div>

              {/* Save Bar */}
              <div className="flex items-center justify-between">
                {saved ? (
                  <span className="font-code-metadata text-code-metadata text-tertiary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    Settings successfully saved to cluster config.
                  </span>
                ) : (
                  <span className="font-code-metadata text-code-metadata text-outline">
                    Changes take effect across all active worker shards immediately.
                  </span>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary font-headline-sm text-body-md font-semibold hover:brightness-110 shadow-md transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
