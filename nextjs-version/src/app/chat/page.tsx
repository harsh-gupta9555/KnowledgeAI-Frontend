"use client";

import React, { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  time: string;
  text: string;
  citations?: { id: string; label: string; doc: string; match: string; color: "tertiary" | "secondary" | "primary" }[];
}

export default function ChatPage() {
  const [activeSession, setActiveSession] = useState("msa");
  const [activeChunk, setActiveChunk] = useState<string>("chunk-1");
  const [strictGrounding, setStrictGrounding] = useState(true);
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "user",
      time: "10:42 AM",
      text: "What are the termination liabilities outlined in the Master Services Agreement for Section 8.4?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chunkData: Record<
    string,
    {
      file: string;
      meta: string;
      sim: string;
      chunkId: string;
      hash: string;
      text: string;
    }
  > = {
    "chunk-1": {
      file: "MSA_2024_Final.pdf",
      meta: "Page 28 · §8.4",
      sim: "0.942",
      chunkId: "#chk-4829",
      hash: "SHA-256:d81a9f4c...3e1b",
      text: "Notwithstanding anything to the contrary in Section 8.1, either party may terminate this Agreement immediately upon written notice if the other party breaches any material term and fails to cure such breach within thirty (30) days. Upon termination, Client shall promptly remit payment for all accrued milestone fees and unrecoverable vendor outlays incurred through the effective termination date.",
    },
    "chunk-2": {
      file: "SOW_Annex_B_Procurement.pdf",
      meta: "Page 6 · Clause 3",
      sim: "0.898",
      chunkId: "#chk-1092",
      hash: "SHA-256:7b42a9ee...90a1",
      text: "Non-cancelable compute and dedicated high-bandwidth infrastructure leases reserved on behalf of Client shall be paid in full for the unexpired portion of the current committed quarterly billing cycle regardless of early termination notices.",
    },
    "chunk-3": {
      file: "MSA_2024_Final.pdf",
      meta: "Page 29 · §8.4.2",
      sim: "0.865",
      chunkId: "#chk-4830",
      hash: "SHA-256:e112ca08...55fc",
      text: "In the event of voluntary convenience termination, Client shall provide at least thirty (30) days written notice and remain liable for all work performed up to the date of termination, excluding anticipatory profits.",
    },
  };

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: inputMsg,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputMsg("");
    setIsTyping(true);

    setTimeout(() => {
      const reply: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: "assistant",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: `Based on your indexed documents in Enterprise_Docs_v2, the query has been verified with cosine similarity > 0.91. All relevant stipulations are grounded with cryptographically signed tokens.`,
        citations: [
          { id: "chunk-1", label: "[Doc: MSA_2024.pdf §8.4 - 98% match]", doc: "MSA_2024.pdf", match: "98%", color: "tertiary" },
          { id: "chunk-2", label: "[Doc: SOW_Annex_B.pdf - 94% match]", doc: "SOW_Annex_B.pdf", match: "94%", color: "secondary" },
        ],
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1200);
  };

  const currentChunk = chunkData[activeChunk] || chunkData["chunk-1"];

  return (
    <div className="min-h-screen bg-surface text-on-surface antialiased flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Container */}
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        <Header />

        <main className="relative pt-16 bg-surface min-h-screen w-full px-6 py-4">
          {/* Ambient 3D Graphic */}
          <div className="fixed right-20 top-24 w-[380px] h-[380px] pointer-events-none z-0 opacity-15 overflow-hidden filter blur-[24px]">
            <Image
              src="/assets/ai-neural-core.png"
              alt="Ambient 3D AI Neural Core Visual"
              width={380}
              height={380}
              className="w-full h-full object-cover rounded-full shadow-[0_0_80px_rgba(77,142,255,0.4)]"
            />
          </div>

          {/* Main 3-Column RAG Chat Interface */}
          <div className="relative z-10 w-full grid grid-cols-12 gap-gutter py-2 h-[calc(100vh-5.5rem)]">
            {/* LEFT PANE: Chat Sessions & Vector Memory (Col 1-3) */}
            <div className="col-span-12 lg:col-span-3 flex flex-col bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl p-space-md shadow-xl justify-between overflow-hidden border border-outline-variant/15">
              <div className="flex flex-col gap-space-md overflow-hidden">
                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMessages([]);
                    setActiveSession("new");
                  }}
                  className="w-full flex items-center justify-center gap-space-sm py-2.5 px-space-md rounded-xl bg-primary-container text-on-primary font-headline-sm text-body-md hover:brightness-110 shadow-[0_0_20px_rgba(77,142,255,0.3)] transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  <span>New Session</span>
                </button>

                {/* Session Search & Filter Pill */}
                <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1.5 rounded-xl border border-outline-variant/10">
                  <span className="material-symbols-outlined text-outline text-[18px]">search</span>
                  <input
                    className="w-full bg-transparent text-on-surface font-body-sm text-body-sm outline-none placeholder:text-outline"
                    placeholder="Filter threads..."
                    type="text"
                  />
                  <span className="font-code-metadata text-code-metadata px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                    ⌘F
                  </span>
                </div>

                {/* Chat History List */}
                <div className="flex flex-col gap-space-xs overflow-y-auto pr-1">
                  <div className="px-space-xs pt-space-xs pb-1 font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
                    Recent Inquiries
                  </div>

                  {/* Active Thread */}
                  <div
                    onClick={() => setActiveSession("msa")}
                    className={`group relative flex flex-col gap-1 p-space-sm rounded-xl cursor-pointer shadow-sm transition-all border ${
                      activeSession === "msa"
                        ? "bg-surface-container-high text-on-surface border-primary/40"
                        : "hover:bg-surface-container-low border-transparent text-on-surface-variant"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-primary font-semibold truncate">
                        MSA Termination Liabilities
                      </span>
                      <span className="font-code-metadata text-code-metadata text-tertiary">
                        Just now
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      Sec 8.4 cure duration &amp; early exit indemnity
                    </p>
                    <div className="flex items-center gap-space-xs mt-1">
                      <span className="font-citation-chip text-citation-chip px-1.5 py-0.5 rounded bg-surface-container text-tertiary">
                        MSA_2024.pdf
                      </span>
                      <span className="font-code-metadata text-code-metadata text-outline">
                        4 chunks
                      </span>
                    </div>
                  </div>

                  {/* Thread 2 */}
                  <div
                    onClick={() => setActiveSession("gdpr")}
                    className={`group flex flex-col gap-1 p-space-sm rounded-xl cursor-pointer transition-all border ${
                      activeSession === "gdpr"
                        ? "bg-surface-container-high text-on-surface border-primary/40"
                        : "hover:bg-surface-container-low border-transparent text-on-surface-variant"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md truncate">
                        GDPR Compliance Review
                      </span>
                      <span className="font-code-metadata text-code-metadata text-outline">
                        2h ago
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline truncate">
                      Article 28 DPA subprocessor vetting
                    </p>
                    <div className="flex items-center gap-space-xs mt-1">
                      <span className="font-citation-chip text-citation-chip px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                        Data_Gov_2024
                      </span>
                      <span className="font-code-metadata text-code-metadata text-outline">
                        8 chunks
                      </span>
                    </div>
                  </div>

                  {/* Thread 3 */}
                  <div
                    onClick={() => setActiveSession("rfc")}
                    className={`group flex flex-col gap-1 p-space-sm rounded-xl cursor-pointer transition-all border ${
                      activeSession === "rfc"
                        ? "bg-surface-container-high text-on-surface border-primary/40"
                        : "hover:bg-surface-container-low border-transparent text-on-surface-variant"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md truncate">
                        Architecture RFC v2
                      </span>
                      <span className="font-code-metadata text-code-metadata text-outline">
                        Yesterday
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline truncate">
                      Sharding hybrid vectors in Qdrant cluster
                    </p>
                    <div className="flex items-center gap-space-xs mt-1">
                      <span className="font-citation-chip text-citation-chip px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                        Infra_Specs
                      </span>
                      <span className="font-code-metadata text-code-metadata text-outline">
                        12 chunks
                      </span>
                    </div>
                  </div>

                  {/* Thread 4 */}
                  <div
                    onClick={() => setActiveSession("trial")}
                    className={`group flex flex-col gap-1 p-space-sm rounded-xl cursor-pointer transition-all border ${
                      activeSession === "trial"
                        ? "bg-surface-container-high text-on-surface border-primary/40"
                        : "hover:bg-surface-container-low border-transparent text-on-surface-variant"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md truncate">
                        Clinical Trial Phase II
                      </span>
                      <span className="font-code-metadata text-code-metadata text-outline">
                        Oct 14
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-outline truncate">
                      Patient cohort exclusion metrics report
                    </p>
                    <div className="flex items-center gap-space-xs mt-1">
                      <span className="font-citation-chip text-citation-chip px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant">
                        BioMed_V4
                      </span>
                      <span className="font-code-metadata text-code-metadata text-outline">
                        19 chunks
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vector Store Health Metric */}
              <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/10 flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
                    <span className="font-code-metadata text-code-metadata text-on-surface">
                      Embeddings Cache
                    </span>
                  </div>
                  <span className="font-code-metadata text-code-metadata text-tertiary font-bold">
                    99.4% Hit Rate
                  </span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-tertiary h-full w-[84%]" />
                </div>
                <div className="flex items-center justify-between font-code-metadata text-code-metadata text-outline">
                  <span>Qdrant HNSW Indexed</span>
                  <span>1,248,390 vectors</span>
                </div>
              </div>
            </div>

            {/* CENTER PANE: Dynamic Reasoning & Interactive Stream (Col 4-9) */}
            <div className="col-span-12 lg:col-span-6 flex flex-col bg-surface-container-lowest/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden justify-between border border-outline-variant/15">
              {/* Top Control Bar */}
              <div className="h-14 px-space-md bg-surface-container-low/70 border-b border-outline-variant/15 flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  {/* Collection Picker */}
                  <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-xl bg-surface-container-high border border-outline-variant/10 text-on-surface cursor-pointer hover:bg-surface-bright transition-all">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      folder_special
                    </span>
                    <span className="font-label-md text-label-md">Enterprise_Docs_v2</span>
                    <span className="material-symbols-outlined text-outline text-[16px]">
                      arrow_drop_down
                    </span>
                  </div>

                  {/* Model Tag */}
                  <div className="hidden sm:flex items-center gap-1.5 px-space-sm py-1 rounded-xl bg-surface-container text-tertiary border border-outline-variant/10">
                    <span className="material-symbols-outlined text-[16px]">neurology</span>
                    <span className="font-code-metadata text-code-metadata">
                      Claude 3.5 Sonnet / Qdrant Hybrid RAG
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-space-xs">
                  {/* Parameter Pill */}
                  <div className="px-space-xs py-1 rounded bg-surface-container border border-outline-variant/10 text-on-surface-variant font-code-metadata text-code-metadata flex items-center gap-1">
                    <span>Temp:</span>
                    <span className="text-tertiary font-semibold">0.20</span>
                  </div>
                  {/* Clear Stream Button */}
                  <button
                    type="button"
                    onClick={() => setMessages([])}
                    className="w-8 h-8 rounded-xl bg-surface-container border border-outline-variant/10 flex items-center justify-center text-outline hover:text-on-surface transition-colors"
                    title="Clear dialogue"
                  >
                    <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                  </button>
                </div>
              </div>

              {/* Dialogue Stream */}
              <div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-lg">
                {/* Initial Preset Messages */}
                {messages.map((m) =>
                  m.sender === "user" ? (
                    <div key={m.id} className="flex gap-space-md max-w-xl self-end flex-row-reverse">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-md text-on-primary">
                        <span className="material-symbols-outlined text-[18px]">person</span>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                        <div className="p-space-md rounded-2xl rounded-tr-none bg-primary-container text-on-primary font-body-md text-body-md shadow-lg">
                          {m.text}
                        </div>
                        <span className="font-code-metadata text-code-metadata text-outline">
                          {m.time} · Semantically tokenized
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div key={m.id} className="flex gap-space-md max-w-2xl self-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(76,215,246,0.5)] text-surface-container-lowest">
                        <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                      </div>
                      <div className="flex flex-col gap-space-sm w-full">
                        <div className="p-space-md rounded-2xl rounded-tl-none bg-surface-container-low border border-outline-variant/15 text-on-surface font-body-md text-body-md shadow-lg">
                          {m.text}
                          {m.citations && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {m.citations.map((c) => (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() => setActiveChunk(c.id)}
                                  className={`inline-flex items-center gap-1 font-citation-chip text-citation-chip px-2 py-1 rounded transition-all ${
                                    activeChunk === c.id
                                      ? "bg-tertiary text-surface-container-lowest font-bold ring-2 ring-tertiary"
                                      : "bg-tertiary-container/30 text-tertiary hover:bg-tertiary-container/50"
                                  }`}
                                >
                                  <span className="material-symbols-outlined text-[14px]">
                                    find_in_page
                                  </span>
                                  <span>{c.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}

                {/* Assistant Bubble (Structured Grounded Response from Screen) */}
                <div className="flex gap-space-md max-w-2xl self-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(76,215,246,0.5)] text-surface-container-lowest">
                    <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                  </div>
                  <div className="flex flex-col gap-space-sm w-full">
                    {/* Grounding Confidence Verification Banner */}
                    <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/15 flex items-center justify-between">
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-tertiary text-[18px]">
                          verified
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">
                          100% grounded in 4 verified chunks
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-code-metadata text-code-metadata text-tertiary bg-surface-container px-space-xs py-0.5 rounded border border-outline-variant/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                        <span>Latency: 284ms</span>
                      </div>
                    </div>

                    {/* Structured Content Card */}
                    <div className="p-space-lg rounded-2xl rounded-tl-none bg-surface-container-low border border-outline-variant/15 text-on-surface font-body-md text-body-md flex flex-col gap-space-md shadow-lg">
                      <p>
                        Based on{" "}
                        <strong className="text-on-surface font-semibold">
                          Section 8.4 (Termination for Convenience &amp; Material Default)
                        </strong>{" "}
                        of the Master Services Agreement, the liabilities are segregated into two
                        distinct operational triggers:
                      </p>

                      {/* Termination Categories */}
                      <div className="space-y-space-sm pl-space-xs">
                        <div className="p-space-sm rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-1">
                          <div className="flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-tertiary text-[18px]">
                              schedule
                            </span>
                            <h4 className="font-headline-sm text-headline-sm text-on-surface">
                              1. Immediate Termination (Cause / Breach)
                            </h4>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            If either party undergoes uncured material default within 30 calendar
                            days of written notice, the non-breaching entity retains direct
                            entitlement to unrecouped setup fees and outstanding milestone
                            milestones.
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              type="button"
                              onClick={() => setActiveChunk("chunk-1")}
                              className={`citation-pill inline-flex items-center gap-1 font-citation-chip text-citation-chip px-2 py-1 rounded transition-all cursor-pointer ${
                                activeChunk === "chunk-1"
                                  ? "bg-tertiary text-surface-container-lowest font-bold ring-2 ring-tertiary"
                                  : "bg-tertiary-container/30 text-tertiary hover:bg-tertiary-container/60"
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                find_in_page
                              </span>
                              <span>[Doc: MSA_2024.pdf §8.4 - 98% match]</span>
                            </button>
                          </div>
                        </div>

                        <div className="p-space-sm rounded-xl bg-surface-container border border-outline-variant/10 flex flex-col gap-1">
                          <div className="flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-secondary text-[18px]">
                              event_repeat
                            </span>
                            <h4 className="font-headline-sm text-headline-sm text-on-surface">
                              2. Voluntary Convenience Termination (30-Day Notice)
                            </h4>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Enterprise Client must provide a minimum 30-day written lead time and
                            remains liable for all work-in-progress (WIP) completed up to the
                            termination effective date, plus verified non-cancelable third-party
                            commitments incurred under Annex B.
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              type="button"
                              onClick={() => setActiveChunk("chunk-2")}
                              className={`citation-pill inline-flex items-center gap-1 font-citation-chip text-citation-chip px-2 py-1 rounded transition-all cursor-pointer ${
                                activeChunk === "chunk-2"
                                  ? "bg-secondary text-surface-container-lowest font-bold ring-2 ring-secondary"
                                  : "bg-secondary-container/40 text-secondary hover:bg-secondary-container/70"
                              }`}
                            >
                              <span className="material-symbols-outlined text-[14px]">
                                find_in_page
                              </span>
                              <span>[Doc: SOW_Annex_B.pdf - 94% match]</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveChunk("chunk-3")}
                              className={`citation-pill inline-flex items-center gap-1 font-citation-chip text-citation-chip px-2 py-1 rounded transition-all cursor-pointer ${
                                activeChunk === "chunk-3"
                                  ? "bg-primary text-surface-container-lowest font-bold ring-2 ring-primary"
                                  : "bg-surface-container-high text-on-surface-variant hover:text-on-surface"
                              }`}
                            >
                              <span>[Doc: MSA_2024.pdf §8.4.2 - 89% match]</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Executive Synthesis Callout */}
                      <div className="p-space-sm rounded-xl bg-surface-container-high border border-outline-variant/15 flex items-start gap-space-sm">
                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                          info
                        </span>
                        <div className="flex flex-col font-body-sm text-body-sm">
                          <span className="text-on-surface font-semibold">Exclusions &amp; Caps:</span>
                          <span className="text-on-surface-variant">
                            Consequential damages and loss of anticipatory profit are explicitly waived
                            by mutual agreement under §8.4.3.
                          </span>
                        </div>
                      </div>

                      {/* Action Bar for Response */}
                      <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant/10">
                        <div className="flex items-center gap-space-xs">
                          <button
                            className="p-1.5 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
                            title="Copy Answer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">content_copy</span>
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
                            title="Good Response"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
                            title="Report Inaccuracy"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[18px]">thumb_down</span>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="flex items-center gap-1 font-label-md text-label-md text-tertiary hover:underline"
                        >
                          <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
                          <span>Synthesize with Master SOW v3</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Typing indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-tertiary font-code-metadata text-code-metadata">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
                    <span>Cross-encoder reranking passages &amp; generating grounded tokens...</span>
                  </div>
                )}
              </div>

              {/* Bottom Chat Console Input Container */}
              <div className="p-space-md bg-surface-container-low/80 backdrop-blur-xl border-t border-outline-variant/15 flex flex-col gap-space-xs">
                {/* Input Box Field */}
                <div className="relative rounded-2xl bg-surface-container-high border border-outline-variant/15 p-space-sm focus-within:shadow-[0_0_24px_rgba(77,142,255,0.25)] focus-within:ring-1 focus-within:ring-primary transition-all">
                  <textarea
                    className="w-full bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline outline-none resize-none"
                    placeholder="Ask a grounded question across corporate vectors, contracts, or specs..."
                    rows={2}
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <div className="flex items-center justify-between pt-1">
                    {/* Left attachment controls */}
                    <div className="flex items-center gap-space-xs">
                      <button
                        className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-primary transition-colors"
                        title="Attach Document Chunk"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">attach_file</span>
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-surface-container-highest text-on-surface-variant hover:text-tertiary transition-colors"
                        title="Select Specific Collection"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[20px]">database</span>
                      </button>
                      {/* Citation Toggle */}
                      <button
                        type="button"
                        onClick={() => setStrictGrounding(!strictGrounding)}
                        className={`flex items-center gap-1 px-2 py-1 rounded font-code-metadata text-code-metadata transition-all ${
                          strictGrounding
                            ? "bg-tertiary-container/20 text-tertiary border border-tertiary/30"
                            : "bg-surface-container text-outline"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {strictGrounding ? "toggle_on" : "toggle_off"}
                        </span>
                        <span>Strict Grounding</span>
                      </button>
                    </div>

                    {/* Right Execution Buttons */}
                    <div className="flex items-center gap-space-sm">
                      <button
                        type="button"
                        onClick={handleSendMessage}
                        className="px-space-md py-1.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1 hover:brightness-110 shadow-[0_0_12px_rgba(77,142,255,0.4)] transition-all"
                      >
                        <span>Send</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Semantic Model Disclaimer */}
                <div className="flex items-center justify-between px-space-xs font-code-metadata text-code-metadata text-outline">
                  <span>RAG Hybrid Token Limit: 32,768 / 128,000</span>
                  <span>Dual Vector Re-ranker: BGE-reranker-large</span>
                </div>
              </div>
            </div>

            {/* RIGHT PANE: Citations & Evidence Inspector (Col 9-12) */}
            <div className="col-span-12 lg:col-span-3 flex flex-col bg-surface-container-lowest/80 backdrop-blur-xl rounded-2xl p-space-md shadow-xl overflow-hidden justify-between border border-outline-variant/15">
              <div className="flex flex-col gap-space-md overflow-hidden">
                {/* Inspector Title */}
                <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/10">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">
                      manage_search
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Evidence Inspector
                    </h3>
                  </div>
                  <span className="font-code-metadata text-code-metadata text-primary bg-primary-container/20 px-2 py-0.5 rounded border border-primary/20">
                    {currentChunk.chunkId}
                  </span>
                </div>

                {/* Similarity & Metrics Badge Bento */}
                <div className="grid grid-cols-2 gap-space-xs">
                  <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/10 flex flex-col">
                    <span className="font-code-metadata text-code-metadata text-outline">
                      Cosine Similarity
                    </span>
                    <span className="font-headline-md text-headline-md text-tertiary font-bold mt-0.5">
                      {currentChunk.sim}
                    </span>
                    <span className="font-code-metadata text-code-metadata text-tertiary/80">
                      Rank #1 match
                    </span>
                  </div>
                  <div className="p-space-sm rounded-xl bg-surface-container-low border border-outline-variant/10 flex flex-col">
                    <span className="font-code-metadata text-code-metadata text-outline">
                      Dense Embedding
                    </span>
                    <span className="font-headline-md text-headline-md text-secondary font-bold mt-0.5">
                      1,536d
                    </span>
                    <span className="font-code-metadata text-code-metadata text-secondary/80">
                      Text-Embedding-3
                    </span>
                  </div>
                </div>

                {/* Chunk Detail Card Container */}
                <div className="flex flex-col gap-space-sm overflow-y-auto pr-1">
                  {/* Primary Inspected Chunk */}
                  <div className="p-space-md rounded-2xl bg-surface-container border border-outline-variant/15 flex flex-col gap-space-sm shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="material-symbols-outlined text-tertiary text-[18px]">
                          description
                        </span>
                        <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                          {currentChunk.file}
                        </span>
                      </div>
                      <span className="font-code-metadata text-code-metadata text-tertiary px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/10">
                        {currentChunk.meta}
                      </span>
                    </div>

                    {/* Highlighted Raw Vector Chunk Text */}
                    <div className="p-space-sm rounded-xl bg-surface-container-lowest border border-outline-variant/10 text-on-surface-variant font-code-metadata text-code-metadata leading-relaxed">
                      &quot;...Notwithstanding anything to the contrary,{" "}
                      <mark className="bg-tertiary-container/40 text-on-tertiary-fixed font-semibold px-1 rounded">
                        {currentChunk.text}
                      </mark>
                      ...&quot;
                    </div>

                    {/* Open Document Action */}
                    <div className="flex items-center justify-between pt-1 font-code-metadata text-code-metadata">
                      <span className="text-outline truncate max-w-[130px]">{currentChunk.hash}</span>
                      <a
                        className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        <span>View PDF Source</span>
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </a>
                    </div>
                  </div>

                  {/* Semantic Heatmap Visualization Preview */}
                  <div className="p-space-md rounded-2xl bg-surface-container-low border border-outline-variant/10 flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-md text-on-surface">
                        Re-ranking Weights
                      </span>
                      <span className="font-code-metadata text-code-metadata text-tertiary">
                        Hybrid Fusion
                      </span>
                    </div>
                    <div className="space-y-1.5 mt-1">
                      <div className="flex items-center justify-between font-code-metadata text-code-metadata text-outline">
                        <span>BM25 Sparse Match</span>
                        <span>42%</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-1 overflow-hidden">
                        <div className="bg-secondary h-full w-[42%]" />
                      </div>
                      <div className="flex items-center justify-between font-code-metadata text-code-metadata text-outline pt-1">
                        <span>Dense Cosine Match</span>
                        <span>58%</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-1 overflow-hidden">
                        <div className="bg-tertiary h-full w-[58%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Export Inspector Footer */}
              <div className="pt-space-xs border-t border-outline-variant/10">
                <button
                  type="button"
                  className="w-full py-2 px-space-md rounded-xl bg-surface-container border border-outline-variant/15 text-on-surface-variant hover:text-on-surface hover:bg-surface-bright font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    download_for_offline
                  </span>
                  <span>Export Audit Proof Bundle</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
