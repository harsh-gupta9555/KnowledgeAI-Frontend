"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

const workspaceItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "grid_view" },
  { name: "AI Chat", href: "/chat", icon: "forum" },
  { name: "Knowledge Bases", href: "/knowledge-bases", icon: "dataset" },
  { name: "Documents", href: "/documents", icon: "folder_data" },
  { name: "Agent Workspace", href: "/agent-workspace", icon: "smart_toy" },
];

const synthesisItems: NavItem[] = [
  { name: "Document Comparison", href: "/compare", icon: "compare" },
  { name: "Summarization", href: "/summarize", icon: "summarize" },
  { name: "Evaluation & Analytics", href: "/analytics", icon: "monitoring" },
  { name: "Settings", href: "/settings", icon: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest/80 backdrop-blur-2xl z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-r border-outline-variant/20">
      <div className="flex flex-col h-full">
        {/* Brand Header */}
        <div className="h-16 px-space-lg flex items-center justify-between border-b border-outline-variant/10">
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
          <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(76,215,246,0.6)]" />
        </div>

        {/* Engine Connectivity Status Pill */}
        <div className="px-space-md py-space-xs my-2">
          <div className="px-space-md py-space-xs rounded-xl bg-surface-container-low flex items-center justify-between border border-outline-variant/15">
            <div className="flex items-center gap-space-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
              <span className="font-code-metadata text-code-metadata text-on-surface-variant">
                Qdrant &amp; FastAPI
              </span>
            </div>
            <span className="font-citation-chip text-citation-chip text-tertiary px-space-xs py-0.5 rounded bg-surface-container">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Navigations */}
        <nav className="flex-1 px-space-md py-space-sm overflow-y-auto space-y-1">
          <div className="px-space-sm py-space-xs font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
            Workspace
          </div>
          {workspaceItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-surface-container-high text-on-surface font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border-l-2 border-primary"
                    : "font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="pt-space-sm px-space-sm py-space-xs font-code-metadata text-code-metadata text-outline uppercase tracking-wider">
            Synthesis &amp; Metrics
          </div>
          {synthesisItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-space-md px-space-md py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-surface-container-high text-on-surface font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] border-l-2 border-primary"
                    : "font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Card */}
        <div className="p-space-md border-t border-outline-variant/10">
          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-on-primary">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface truncate">
                  Dr. Evelyn Wright
                </span>
                <span className="font-code-metadata text-code-metadata text-on-surface-variant truncate">
                  Lead AI Architect
                </span>
              </div>
            </div>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors p-1" type="button" aria-label="Account Settings">
              <span className="material-symbols-outlined text-[18px]">unfold_more</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
