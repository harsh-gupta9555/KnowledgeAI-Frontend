"use client";

import React, { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchVal, setSearchVal] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/15 z-40 flex items-center justify-between px-space-lg">
      <div className="flex items-center gap-space-md w-96">
        <div className="w-full flex items-center gap-space-sm px-space-md py-2 rounded-xl bg-surface-container-low text-on-surface-variant focus-within:text-on-surface focus-within:ring-1 focus-within:ring-primary/40 transition-all">
          <span className="material-symbols-outlined text-[18px]">search</span>
          <input
            className="bg-transparent border-none outline-none font-body-sm text-body-sm text-on-surface placeholder:text-outline w-full"
            placeholder="Search vector store, semantic collections, prompts..."
            type="text"
            value={searchVal}
            onChange={handleSearchChange}
          />
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-metadata text-code-metadata">
            <span className="text-[10px]">⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-xs px-space-sm py-1 rounded-xl bg-surface-container-low border border-outline-variant/10">
          <span className="material-symbols-outlined text-tertiary text-[16px]">electric_bolt</span>
          <span className="font-code-metadata text-code-metadata text-on-surface-variant">
            v4.2-Hybrid Engine
          </span>
        </div>

        <button
          className="w-9 h-9 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface flex items-center justify-center transition-colors relative"
          type="button"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>

        <button
          className="w-9 h-9 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface flex items-center justify-center transition-colors"
          type="button"
          aria-label="Terminal CLI"
        >
          <span className="material-symbols-outlined text-[20px]">terminal</span>
        </button>

        <Link
          href="/"
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_12px_rgba(173,198,255,0.25)] text-on-primary hover:scale-105 transition-transform"
          title="Back to Landing Page"
        >
          <span className="material-symbols-outlined text-[18px]">person</span>
        </Link>
      </div>
    </header>
  );
}
