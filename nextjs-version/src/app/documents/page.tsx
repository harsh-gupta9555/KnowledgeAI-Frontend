"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface DocumentItem {
  id: string;
  name: string;
  hash: string;
  collection: string;
  size: string;
  chunks: number | string;
  status: "Indexed / Ready" | "In Progress" | "Syncing";
  uploaded: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedChunksModal, setSelectedChunksModal] = useState<DocumentItem | null>(null);
  const [docs, setDocs] = useState<DocumentItem[]>([
    {
      id: "doc-1",
      name: "Cloud_Security_Policy_v4.pdf",
      hash: "SHA-256: d83a...f92c",
      collection: "SecOps & Compliance",
      size: "4.8 MB",
      chunks: 312,
      status: "Indexed / Ready",
      uploaded: "Today, 10:14 AM",
      icon: "picture_as_pdf",
      iconBg: "bg-red-950/40 border border-red-500/20",
      iconColor: "text-red-400",
    },
    {
      id: "doc-2",
      name: "Engineering_Design_Doc_RAG.md",
      hash: "SHA-256: 41ae...e70b",
      collection: "Architecture & Docs",
      size: "842 KB",
      chunks: 148,
      status: "Indexed / Ready",
      uploaded: "Yesterday",
      icon: "markdown",
      iconBg: "bg-sky-950/40 border border-sky-500/20",
      iconColor: "text-sky-400",
    },
    {
      id: "doc-3",
      name: "Employee_Handbook_2024.docx",
      hash: "SHA-256: 77a1...8c20",
      collection: "People & Culture",
      size: "2.1 MB",
      chunks: 190,
      status: "Syncing",
      uploaded: "May 12, 2024",
      icon: "description",
      iconBg: "bg-blue-950/40 border border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      id: "doc-4",
      name: "financial_statement_2024.pdf",
      hash: "Vectorizing chunk 48/96",
      collection: "Quarterly Financials",
      size: "11.4 MB",
      chunks: "48 / 96",
      status: "In Progress",
      uploaded: "Just now",
      icon: "pending",
      iconBg: "bg-amber-950/40 border border-amber-500/20",
      iconColor: "text-amber-400",
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newDocList: DocumentItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newDocList.push({
        id: `upload-${Date.now()}-${i}`,
        name: file.name,
        hash: "SHA-256: calculating...",
        collection: "General Knowledge",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        chunks: "Parsing...",
        status: "In Progress",
        uploaded: "Just now",
        icon: "upload_file",
        iconBg: "bg-primary-container/20 border border-primary/20",
        iconColor: "text-primary",
      });
    }
    setDocs((prev) => [...newDocList, ...prev]);
  };

  const handleDelete = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleReembed = (id: string) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Syncing" } : d))
    );
    setTimeout(() => {
      setDocs((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: "Indexed / Ready" } : d))
      );
    }, 2000);
  };

  const filteredDocs = docs.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.collection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollection =
      collectionFilter === "all" ||
      doc.collection.toLowerCase().includes(collectionFilter.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "ready" && doc.status === "Indexed / Ready") ||
      (statusFilter === "in_progress" && doc.status === "In Progress") ||
      (statusFilter === "syncing" && doc.status === "Syncing");
    return matchesSearch && matchesCollection && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Body */}
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        <Header />

        <main className="relative pt-16 bg-surface min-h-screen w-full px-6 lg:px-10 py-6">
          <div className="relative z-10 flex flex-col gap-space-lg py-2 pb-16">
            {/* Header Section with Typography & Batch Triggers */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div>
                <div className="flex items-center gap-space-xs mb-1">
                  <span className="font-code-metadata text-code-metadata text-tertiary uppercase tracking-widest">
                    RAG Engine · Vector Ingestion Pipeline
                  </span>
                  <span className="w-1 h-1 rounded-full bg-tertiary" />
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant">
                    Cluster 01 [Ready]
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Documents &amp; Knowledge Ingestion
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                  Parse, chunk, and synchronize enterprise corpus into dense dimensional spaces.
                </p>
              </div>

              <div className="flex items-center gap-space-sm flex-wrap">
                <div className="flex items-center bg-surface-container-low rounded-xl p-1 gap-1 border border-outline-variant/15">
                  <button
                    type="button"
                    onClick={() => {
                      setDocs((prev) =>
                        prev.map((d) => ({ ...d, status: "Indexed / Ready" }))
                      );
                    }}
                    className="px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-body-sm text-body-sm flex items-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">sync</span>
                    <span>Sync All</span>
                  </button>
                  <button
                    type="button"
                    className="px-space-sm py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-body-sm text-body-sm flex items-center gap-1.5 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">tune</span>
                    <span>Chunk Presets</span>
                  </button>
                </div>

                <label
                  htmlFor="file-upload-input"
                  className="px-space-lg py-2.5 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] flex items-center gap-space-xs transition-all shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                  <span>Upload Document</span>
                </label>
                <input
                  id="file-upload-input"
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt,.md"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            {/* Active In-Flight Ingestion Stream Queue Bar */}
            <div className="rounded-xl bg-surface-container-high border border-outline-variant/20 p-space-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-space-md min-w-0 z-10 w-full md:w-auto">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary flex-shrink-0 animate-pulse">
                  <span className="material-symbols-outlined text-[22px]">memory</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-code-metadata text-code-metadata text-tertiary uppercase">
                      In-Flight Queue
                    </span>
                    <span className="font-citation-chip text-citation-chip px-1.5 py-0.5 rounded bg-tertiary/15 text-tertiary font-medium">
                      STREAMING 50%
                    </span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                    financial_statement_2024.pdf — Parsing &amp; Vectorizing
                  </span>
                  <span className="font-code-metadata text-code-metadata text-on-surface-variant">
                    Batch execution on text-embedding-3-large · 48 of 96 chunks committed to Qdrant
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-lg w-full md:w-80 flex-shrink-0 z-10">
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-code-metadata font-code-metadata">
                    <span className="text-on-surface-variant">Vectorizing shards</span>
                    <span className="text-primary font-semibold">48 / 96</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-lowest overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary via-tertiary to-primary w-1/2 rounded-full transition-all duration-500 animate-pulse" />
                  </div>
                </div>
                <button
                  type="button"
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-bright text-on-surface-variant hover:text-error transition-colors flex-shrink-0"
                  title="Cancel ingestion"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>
            </div>

            {/* Dropzone & Preset Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
              {/* Drag & Drop Zone */}
              <label
                htmlFor="file-upload-input"
                className="lg:col-span-8 group relative rounded-xl bg-surface-container-low border border-dashed border-outline-variant/30 hover:border-tertiary/60 p-space-lg flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-all shadow-lg min-h-[220px]"
              >
                <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-tertiary group-hover:scale-110 group-hover:bg-tertiary group-hover:text-surface-container-lowest transition-all shadow-md mb-space-sm">
                  <span className="material-symbols-outlined text-[30px]">file_upload</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Drag &amp; Drop Enterprise Documents
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mt-1">
                  Supports native text parsing, OCR-enabled tables, and recursive headers across{" "}
                  <span className="text-primary font-medium">PDF, DOCX, TXT, Markdown</span>.
                </p>
                <div className="flex items-center gap-2 mt-space-md">
                  <span className="font-citation-chip text-citation-chip px-2 py-1 rounded bg-surface-container text-on-surface-variant border border-outline-variant/10">
                    Max 128 MB
                  </span>
                  <span className="font-citation-chip text-citation-chip px-2 py-1 rounded bg-surface-container text-on-surface-variant border border-outline-variant/10">
                    Auto-Clean UTF-8
                  </span>
                  <span className="font-citation-chip text-citation-chip px-2 py-1 rounded bg-surface-container text-tertiary border border-outline-variant/10">
                    Recursive Splitting
                  </span>
                </div>
              </label>

              {/* Embedding & Ingestion Configuration Preview */}
              <div className="lg:col-span-4 rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-lg flex flex-col justify-between shadow-lg relative overflow-hidden">
                <div>
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="font-code-metadata text-code-metadata uppercase tracking-wider text-outline">
                      Pipeline Topology
                    </span>
                    <span className="flex items-center gap-1 font-citation-chip text-citation-chip text-tertiary">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping" />
                      Live Config
                    </span>
                  </div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-space-md font-semibold">
                    Chunking &amp; Vectors
                  </h4>
                  <div className="space-y-space-sm">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container border border-outline-variant/10">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Chunk Token Size
                      </span>
                      <span className="font-code-metadata text-code-metadata text-primary font-semibold">
                        512 tokens
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container border border-outline-variant/10">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Chunk Overlap
                      </span>
                      <span className="font-code-metadata text-code-metadata text-tertiary font-semibold">
                        50 tokens
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container border border-outline-variant/10">
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Vector Model
                      </span>
                      <span className="font-code-metadata text-code-metadata text-on-surface truncate max-w-[140px] text-right">
                        text-embedding-3-large
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-space-md flex items-center justify-between border-t border-outline-variant/10">
                  <div className="flex flex-col">
                    <span className="font-code-metadata text-code-metadata text-outline">
                      Distance Metric
                    </span>
                    <span className="font-citation-chip text-citation-chip text-on-surface font-semibold">
                      Cosine (1536d)
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-sm text-body-sm transition-all flex items-center gap-1"
                  >
                    <span>Modify</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filters, Search & Bulk Actions Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-low border border-outline-variant/15 p-space-sm rounded-xl shadow-md">
              <div className="flex items-center gap-space-sm w-full md:w-auto flex-1 max-w-xl">
                <div className="relative w-full">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">
                    search
                  </span>
                  <input
                    className="w-full bg-surface-container rounded-lg pl-9 pr-3 py-2 text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Search by filename, collection tag, or chunk count..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-space-sm w-full md:w-auto flex-wrap justify-end">
                {/* Collection Filter */}
                <div className="relative">
                  <select
                    className="appearance-none bg-surface-container border border-outline-variant/15 rounded-lg px-3 py-2 pr-8 font-body-sm text-body-sm text-on-surface cursor-pointer focus:outline-none hover:bg-surface-container-high transition-colors"
                    value={collectionFilter}
                    onChange={(e) => setCollectionFilter(e.target.value)}
                  >
                    <option value="all">All Collections</option>
                    <option value="secops">SecOps &amp; Compliance</option>
                    <option value="architecture">Architecture &amp; Docs</option>
                    <option value="people">People &amp; Culture</option>
                    <option value="quarterly">Quarterly Financials</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[16px] text-outline">
                    expand_more
                  </span>
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    className="appearance-none bg-surface-container border border-outline-variant/15 rounded-lg px-3 py-2 pr-8 font-body-sm text-body-sm text-on-surface cursor-pointer focus:outline-none hover:bg-surface-container-high transition-colors"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="ready">Indexed / Ready</option>
                    <option value="in_progress">In Progress</option>
                    <option value="syncing">Syncing</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[16px] text-outline">
                    expand_more
                  </span>
                </div>

                <button
                  className="p-2 rounded-lg bg-surface-container border border-outline-variant/15 hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
                  title="Export Manifest"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
              </div>
            </div>

            {/* Documents Data Grid */}
            <div className="bg-surface-container-low border border-outline-variant/15 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container border-b border-outline-variant/15 font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                      <th className="py-3 px-space-md w-10">
                        <input
                          className="rounded bg-surface-container-lowest text-primary focus:ring-0 cursor-pointer"
                          type="checkbox"
                        />
                      </th>
                      <th className="py-3 px-space-md">File Name</th>
                      <th className="py-3 px-space-md">Collection</th>
                      <th className="py-3 px-space-md">Size</th>
                      <th className="py-3 px-space-md">Chunks</th>
                      <th className="py-3 px-space-md">Qdrant Index Status</th>
                      <th className="py-3 px-space-md">Uploaded</th>
                      <th className="py-3 px-space-md text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10 font-body-sm text-body-sm text-on-surface">
                    {filteredDocs.map((doc) => (
                      <tr
                        key={doc.id}
                        className="hover:bg-surface-container/60 transition-colors group"
                      >
                        <td className="py-3.5 px-space-md">
                          <input
                            className="rounded bg-surface-container-lowest text-primary focus:ring-0 cursor-pointer"
                            type="checkbox"
                          />
                        </td>
                        <td className="py-3.5 px-space-md min-w-[240px]">
                          <div className="flex items-center gap-space-sm">
                            <div
                              className={`w-8 h-8 rounded-lg ${doc.iconBg} ${doc.iconColor} flex items-center justify-center flex-shrink-0`}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {doc.icon}
                              </span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                                {doc.name}
                              </span>
                              <span className="font-code-metadata text-code-metadata text-on-surface-variant">
                                {doc.hash}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-space-md">
                          <span className="px-2 py-0.5 rounded font-citation-chip text-citation-chip bg-surface-container text-on-surface-variant border border-outline-variant/10">
                            {doc.collection}
                          </span>
                        </td>
                        <td className="py-3.5 px-space-md font-code-metadata text-code-metadata text-on-surface-variant">
                          {doc.size}
                        </td>
                        <td className="py-3.5 px-space-md font-code-metadata text-code-metadata text-on-surface">
                          {typeof doc.chunks === "number" ? `${doc.chunks} chunks` : doc.chunks}
                        </td>
                        <td className="py-3.5 px-space-md">
                          {doc.status === "Indexed / Ready" && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-citation-chip text-citation-chip">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>Indexed / Ready</span>
                            </div>
                          )}
                          {doc.status === "Syncing" && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-primary font-citation-chip text-citation-chip">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-spin" />
                              <span>Syncing</span>
                            </div>
                          )}
                          {doc.status === "In Progress" && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/20 text-amber-300 font-citation-chip text-citation-chip">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                              <span>In Progress</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-space-md font-code-metadata text-code-metadata text-on-surface-variant">
                          {doc.uploaded}
                        </td>
                        <td className="py-3.5 px-space-md text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setSelectedChunksModal(doc)}
                              className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                              title="View Chunks"
                            >
                              <span className="material-symbols-outlined text-[18px]">segment</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReembed(doc.id)}
                              className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-tertiary transition-colors"
                              title="Re-embed"
                            >
                              <span className="material-symbols-outlined text-[18px]">refresh</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(doc.id)}
                              className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-error transition-colors"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination and Ingestion Telemetry */}
              <div className="p-space-md bg-surface-container border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-body-sm font-body-sm text-on-surface-variant">
                <div className="flex items-center gap-space-sm font-code-metadata text-code-metadata">
                  <span>Showing {filteredDocs.length} of {docs.length} documents</span>
                  <span className="text-outline">•</span>
                  <span className="text-tertiary">Qdrant Points: 666 / 714 active</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors disabled:opacity-40"
                    disabled
                    type="button"
                  >
                    Previous
                  </button>
                  <span className="px-2 font-code-metadata text-code-metadata text-on-surface">1</span>
                  <button
                    className="px-2.5 py-1 rounded bg-surface-container-low hover:bg-surface-bright text-on-surface font-label-md text-label-md transition-colors disabled:opacity-40"
                    disabled
                    type="button"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Semantic Chunks Inspector Modal */}
          {selectedChunksModal && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-surface-container-low border border-outline-variant/30 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                <div className="p-space-md bg-surface-container flex items-center justify-between border-b border-outline-variant/15">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      segment
                    </span>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        Semantic Chunks: {selectedChunksModal.name}
                      </h3>
                      <span className="font-code-metadata text-code-metadata text-outline">
                        Collection: {selectedChunksModal.collection} • {selectedChunksModal.chunks} chunks
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedChunksModal(null)}
                    className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <div className="p-space-lg overflow-y-auto space-y-space-md">
                  <div className="p-space-md rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-citation-chip text-citation-chip text-tertiary">
                        Chunk #001 · 512 Tokens
                      </span>
                      <span className="font-code-metadata text-code-metadata text-primary">
                        Vector: Point-id #81920
                      </span>
                    </div>
                    <p className="font-code-metadata text-code-metadata text-on-surface-variant leading-relaxed">
                      &quot;1.1 Purpose &amp; Scope: This Cloud Security Framework applies to all
                      cloud resources deployed in AWS, GCP, and on-premises kubernetes clusters.
                      Encryption at rest is mandatory utilizing AES-256-GCM or Ed25519 authenticated
                      cipher suites.&quot;
                    </p>
                  </div>

                  <div className="p-space-md rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-citation-chip text-citation-chip text-secondary">
                        Chunk #002 · 498 Tokens
                      </span>
                      <span className="font-code-metadata text-code-metadata text-secondary">
                        Vector: Point-id #81921
                      </span>
                    </div>
                    <p className="font-code-metadata text-code-metadata text-on-surface-variant leading-relaxed">
                      &quot;1.2 Tenant Deprovisioning &amp; Data Eviction: Upon receipt of an eviction
                      signal, all vector collections must be purged within 15 minutes. Backups are
                      retained for 7 days before physical block deletion is enforced.&quot;
                    </p>
                  </div>
                </div>

                <div className="p-space-md bg-surface-container border-t border-outline-variant/15 flex items-center justify-between">
                  <span className="font-code-metadata text-code-metadata text-tertiary">
                    Cosine Cos &gt; 0.90 Ready
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedChunksModal(null)}
                    className="px-space-md py-1.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
