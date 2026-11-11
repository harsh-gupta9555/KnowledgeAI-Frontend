"""
KnowledgeAI - Enterprise RAG & 3D Intelligence Platform
Streamlit Edition - Extracted from Stitch Project 8061712245908356325
Obsidian Synthetics Design System with Sticky Top Navigation Bar
"""

import streamlit as st
import textwrap
import pandas as pd
import time
import os
from styles import CUSTOM_CSS
from components_3d import render_threejs_canvas, get_sculpture_base64

def render_html(content: str, *args, **kwargs):
    """Safely renders HTML directly to the browser DOM without markdown code-block bugs."""
    st.html(textwrap.dedent(str(content)).strip())

def format_chat_content(text: str) -> str:
    import re
    text = re.sub(r'\*\*(.*?)\*\*', r'<strong style="color: #adc6ff;">\1</strong>', text)
    text = re.sub(r'\*(.*?)\*', r'<em style="color: #c2c6d6;">\1</em>', text)
    paragraphs = text.split('\n\n')
    formatted_paras = []
    for p in paragraphs:
        formatted_paras.append(f"<p style='margin: 0 0 10px 0; line-height: 1.6;'>{p.replace(chr(10), '<br>')}</p>")
    return "".join(formatted_paras)


# Configure Streamlit Page
st.set_page_config(
    page_title="KnowledgeAI | Enterprise RAG Intelligence Platform",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Inject Obsidian Synthetics Styles
render_html(CUSTOM_CSS)

# -----------------------------------------------------------------------------
# Read Active Page from Query Parameters or Session State
# -----------------------------------------------------------------------------
PAGE_KEYS = {
    "Overview": "Overview",
    "Dashboard": "Dashboard",
    "Chat": "AI Chat",
    "Documents": "Documents",
    "KnowledgeBases": "Knowledge Bases",
    "AgentWorkspace": "Agent Workspace",
    "Synthesis": "Synthesis & Metrics"
}

# Resolve active page key
query_param_page = st.query_params.get("page", None)
if query_param_page and query_param_page in PAGE_KEYS:
    st.session_state.current_page = query_param_page
elif "current_page" not in st.session_state:
    st.session_state.current_page = "Overview"

if "active_chunk" not in st.session_state:
    st.session_state.active_chunk = "chunk-1"

if "hero_3d_mode" not in st.session_state:
    st.session_state.hero_3d_mode = "3D Obsidian Sculpture"

if "chat_messages" not in st.session_state:
    st.session_state.chat_messages = [
        {
            "role": "user",
            "content": "What are the termination liabilities outlined in the Master Services Agreement for Section 8.4?",
            "time": "10:42 AM"
        },
        {
            "role": "assistant",
            "content": "Based on **Section 8.4 (Termination for Convenience & Material Default)** of the Master Services Agreement, the liabilities are segregated into two distinct operational triggers:\n\n1. **Immediate Termination (Cause / Breach)**: If either party undergoes uncured material default within 30 calendar days of written notice, the non-breaching entity retains direct entitlement to unrecouped setup fees and outstanding milestone milestones.\n\n2. **Voluntary Convenience Termination (30-Day Notice)**: Enterprise Client must provide a minimum 30-day written lead time and remains liable for all work-in-progress (WIP) completed up to the termination effective date, plus verified non-cancelable third-party commitments incurred under Annex B.\n\n*Exclusions & Caps*: Consequential damages and loss of anticipatory profit are explicitly waived by mutual agreement under §8.4.3.",
            "time": "10:42 AM",
            "grounded": "100% grounded in 4 verified chunks",
            "latency": "284ms",
            "citations": [
                {"chunk_id": "chunk-1", "label": "[Doc: MSA_2024.pdf §8.4 - 98% match]"},
                {"chunk_id": "chunk-2", "label": "[Doc: SOW_Annex_B.pdf - 94% match]"},
                {"chunk_id": "chunk-3", "label": "[Doc: MSA_2024.pdf §8.4.2 - 89% match]"}
            ]
        }
    ]

# Evidence Chunk Library
CHUNKS_LIB = {
    "chunk-1": {
        "file": "MSA_2024_Final.pdf",
        "meta": "Page 28 · §8.4",
        "sim": "0.942",
        "chunk_id": "#chk-4829",
        "hash": "SHA-256:d81a...f92c",
        "point": "QDRANT POINT #4829",
        "text": "...Notwithstanding anything to the contrary in Section 8.1, <mark style='background: rgba(0, 158, 185, 0.4); color: #4cd7f6; padding: 2px 4px; border-radius: 4px;'>either party may terminate this Agreement immediately upon written notice</mark> if the other party breaches any material term and fails to cure such breach within thirty (30) days. <mark style='background: rgba(0, 158, 185, 0.4); color: #4cd7f6; padding: 2px 4px; border-radius: 4px;'>Upon termination, Client shall promptly remit payment for all accrued milestone fees</mark> and unrecoverable vendor outlays incurred through the effective termination date..."
    },
    "chunk-2": {
        "file": "SOW_Annex_B_Procurement.pdf",
        "meta": "Page 6 · Clause 3",
        "sim": "0.898",
        "chunk_id": "#chk-1092",
        "hash": "SHA-256:7b42...90a1",
        "point": "QDRANT POINT #1092",
        "text": "...Non-cancelable compute and dedicated high-bandwidth infrastructure leases reserved on behalf of Client shall be <mark style='background: rgba(49, 49, 192, 0.45); color: #c0c1ff; padding: 2px 4px; border-radius: 4px;'>paid in full for the unexpired portion of the current committed quarterly billing cycle</mark> regardless of early termination notices under §8.4..."
    },
    "chunk-3": {
        "file": "MSA_2024_Final.pdf",
        "meta": "Page 29 · §8.4.2",
        "sim": "0.865",
        "chunk_id": "#chk-4830",
        "hash": "SHA-256:e112...55fc",
        "point": "QDRANT POINT #4830",
        "text": "...In the event of voluntary convenience termination, Client shall provide at least thirty (30) days written notice and <mark style='background: rgba(38, 42, 53, 0.8); color: #dfe2f1; padding: 2px 4px; border-radius: 4px;'>remain liable for all work performed up to the date of termination</mark>, excluding anticipatory profits or speculative future milestones..."
    }
}


# =============================================================================
# TOP NAVIGATION BAR (ABOVE SECTION OF THE WEBSITE)
# =============================================================================
def render_top_navbar():
    """Renders the unified, professional single-row top navigation bar matching the Stitch SaaS architecture."""
    current = st.session_state.current_page

    def active_class(key):
        return "active" if current == key else ""

    navbar_html = f"""
    <header class="top-nav-bar">
      <!-- Left: Brand Logo & Title -->
      <div class="top-nav-left">
        <a href="?page=Overview" target="_self" class="brand-link">
          <div class="brand-logo-box">
            <span class="material-symbols-outlined" style="color: #0a0e18; font-size: 18px;">neurology</span>
          </div>
          <div class="brand-text">
            <span class="brand-title">KnowledgeAI</span>
            <span class="brand-badge">Enterprise RAG</span>
          </div>
        </a>
      </div>

      <!-- Center: Navigation Tabs Menu (Strictly Single Row, No Scrollbar) -->
      <nav class="top-nav-center">
        <a href="?page=Overview" target="_self" class="nav-tab {active_class('Overview')}">
          <span class="material-symbols-outlined nav-tab-icon">home</span> Overview
        </a>
        <a href="?page=Dashboard" target="_self" class="nav-tab {active_class('Dashboard')}">
          <span class="material-symbols-outlined nav-tab-icon">grid_view</span> Dashboard
        </a>
        <a href="?page=Chat" target="_self" class="nav-tab {active_class('Chat')}">
          <span class="material-symbols-outlined nav-tab-icon">forum</span> AI Chat
        </a>
        <a href="?page=Documents" target="_self" class="nav-tab {active_class('Documents')}">
          <span class="material-symbols-outlined nav-tab-icon">folder_data</span> Documents
        </a>
        <a href="?page=KnowledgeBases" target="_self" class="nav-tab {active_class('KnowledgeBases')}">
          <span class="material-symbols-outlined nav-tab-icon">dataset</span> Knowledge Bases
        </a>
        <a href="?page=AgentWorkspace" target="_self" class="nav-tab {active_class('AgentWorkspace')}">
          <span class="material-symbols-outlined nav-tab-icon">smart_toy</span> Agent Workspace
        </a>
        <a href="?page=Synthesis" target="_self" class="nav-tab {active_class('Synthesis')}">
          <span class="material-symbols-outlined nav-tab-icon">compare</span> Synthesis & Metrics
        </a>
      </nav>

      <!-- Right: System Controls & Profile -->
      <div class="top-nav-right">
        <div class="engine-indicator" title="Hybrid Qdrant & FastAPI Engine">
          <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 14px;">electric_bolt</span>
          <span>v4.2-PROD</span>
        </div>
        <div class="search-badge" title="Press ⌘K to search vector embeddings">
          <span class="material-symbols-outlined" style="font-size: 14px; color: #8c909f;">search</span>
          <span>⌘K</span>
        </div>
        <div class="icon-circle" title="System Alerts">
          <span class="material-symbols-outlined" style="font-size: 16px;">notifications</span>
          <span class="alert-dot"></span>
        </div>
        <div class="user-pill" title="Lead AI Architect">
          <div class="user-avatar-circle">
            <span class="material-symbols-outlined" style="font-size: 14px;">person</span>
          </div>
          <span class="user-name-text">Dr. Wright</span>
        </div>
      </div>
    </header>
    """
    render_html(navbar_html)


# Render Top Navigation Bar in the above section of the website
render_top_navbar()


# =============================================================================
# OPTIONAL SIDEBAR: DIAGNOSTICS & TELEMETRY
# =============================================================================
with st.sidebar:
    render_html("""
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
      <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 20px;">speed</span>
      <span style="font-weight: 700; color: #dfe2f1; font-size: 1rem;">System Telemetry</span>
    </div>
    <div style="background: #171b26; border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 10px; padding: 12px; margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span class="code-meta">QDRANT CLUSTER</span>
        <span class="citation-chip-green" style="font-size: 0.65rem;">CONNECTED</span>
      </div>
      <div style="font-size: 0.85rem; font-weight: 600; color: #dfe2f1;">142,800 Embeddings</div>
      <div class="code-meta" style="margin-top: 2px;">Shards: 8 · Cosine (1536d)</div>
    </div>

    <div style="background: #171b26; border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 10px; padding: 12px; margin-bottom: 14px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span class="code-meta">FASTAPI ENDPOINT</span>
        <span class="citation-chip" style="font-size: 0.65rem;">HTTP 200</span>
      </div>
      <div style="font-size: 0.85rem; font-weight: 600; color: #dfe2f1;">Latency: 12ms avg</div>
      <div class="code-meta" style="margin-top: 2px;">Cross-Encoder Reranker Enabled</div>
    </div>
    """, unsafe_allow_html=True)


# =============================================================================
# VIEW 1: 🏠 OVERVIEW / HOMEPAGE (STITCH SCREEN 1)
# =============================================================================
if st.session_state.current_page == "Overview":
    render_html("""
    <div class="obsidian-hero-badge">
      <span style="width: 8px; height: 8px; border-radius: 50%; background: #4cd7f6; display: inline-block; box-shadow: 0 0 8px #4cd7f6;"></span>
      Next-Gen RAG Intelligence Platform · v4.2 PROD
    </div>
    """, unsafe_allow_html=True)

    col_hero_left, col_hero_right = st.columns([7, 5])

    with col_hero_left:
        render_html("""
        <h1 class="hero-title">
          Your Knowledge.<br>
          <span class="hero-gradient-text">Connected. Understood.</span>
        </h1>
        <p style="font-size: 1.05rem; color: #c2c6d6; line-height: 1.6; margin-bottom: 24px;">
          Transform your enterprise documents into an intelligent knowledge system. Upload your files,
          ask questions, discover semantic insights, and get AI-powered answers backed by verifiable citations from your own sources.
        </p>
        """, unsafe_allow_html=True)

        # Quick CTA Buttons
        col_btn1, col_btn2 = st.columns([1, 1])
        with col_btn1:
            if st.button("🚀 Launch AI Chat", key="hero_cta_chat", type="primary", use_container_width=True):
                st.query_params["page"] = "Chat"
                st.session_state.current_page = "Chat"
                st.rerun()
        with col_btn2:
            render_html("""
            <div style="display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: #171b26; border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 10px; height: 44px;">
              <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 18px;">verified_user</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #c2c6d6;">SOC2 Type II & HIPAA Ready</span>
            </div>
            """, unsafe_allow_html=True)

        # Live Stats Row
        render_html("<div style='margin-top: 24px;'></div>", unsafe_allow_html=True)
        col_s1, col_s2, col_s3 = st.columns(3)
        with col_s1:
            render_html("""
            <div class="metric-kpi-card">
              <div class="code-meta">ACCURACY</div>
              <div style="font-size: 1.75rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">99.4%</div>
              <div style="font-size: 0.8rem; color: #c2c6d6;">Citation Accuracy</div>
            </div>
            """, unsafe_allow_html=True)
        with col_s2:
            render_html("""
            <div class="metric-kpi-card">
              <div class="code-meta">LATENCY</div>
              <div style="font-size: 1.75rem; font-weight: 700; color: #4cd7f6; margin: 4px 0;">&lt;140ms</div>
              <div style="font-size: 0.8rem; color: #c2c6d6;">Vector Retrieval</div>
            </div>
            """, unsafe_allow_html=True)
        with col_s3:
            render_html("""
            <div class="metric-kpi-card">
              <div class="code-meta">SAFETY</div>
              <div style="font-size: 1.75rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">Zero</div>
              <div style="font-size: 0.8rem; color: #c2c6d6;">Hallucination Guard</div>
            </div>
            """, unsafe_allow_html=True)

        # Tech Trust Badges
        render_html("""
        <div style="margin-top: 20px;">
          <div class="code-meta" style="margin-bottom: 8px; text-transform: uppercase;">Production-Grade Architecture</div>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            <span class="citation-chip">Next.js 15</span>
            <span class="citation-chip">FastAPI</span>
            <span class="citation-chip-purple">PostgreSQL</span>
            <span class="citation-chip">Qdrant Vector DB</span>
            <span class="citation-chip-purple">Hybrid Dense & Sparse</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_hero_right:
        # Visual Asset Mode Selector
        mode_3d = st.radio(
            "Visual Asset Mode",
            ["3D Obsidian Sculpture", "Interactive 3D WebGL Canvas"],
            horizontal=True,
            label_visibility="collapsed"
        )

        if mode_3d == "Interactive 3D WebGL Canvas":
            render_threejs_canvas(height=430)
        else:
            sculpture_b64 = get_sculpture_base64()
            if sculpture_b64:
                render_html(f"""
                <div style="position: relative; text-align: center; background: #171b26; border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 16px; padding: 18px; box-shadow: 0 12px 36px rgba(0,0,0,0.45);">
                  <div style="position: absolute; top: 16px; left: 16px; background: rgba(38, 42, 53, 0.9); backdrop-filter: blur(8px); border-radius: 8px; padding: 6px 10px; border: 1px solid rgba(76, 215, 246, 0.3); text-align: left;">
                    <div class="code-meta" style="color: #4cd7f6;">ACTIVE RETRIEVAL</div>
                    <div style="font-size: 0.75rem; color: #dfe2f1; font-weight: 600;">12 semantic chunks analyzed</div>
                  </div>
                  <div style="position: absolute; bottom: 20px; right: 20px; background: rgba(38, 42, 53, 0.9); backdrop-filter: blur(8px); border-radius: 8px; padding: 6px 12px; border: 1px solid rgba(77, 142, 255, 0.3); text-align: right;">
                    <div class="code-meta" style="color: #adc6ff;">QDRANT COLLECTION</div>
                    <div style="font-size: 0.75rem; color: #dfe2f1; font-weight: 600;">142,800 Embeddings · COSINE 0.98</div>
                  </div>
                  <img src="{sculpture_b64}" style="max-width: 100%; height: 390px; object-fit: contain; border-radius: 12px; filter: drop-shadow(0 0 30px rgba(77, 142, 255, 0.45));"/>
                </div>
                """, unsafe_allow_html=True)
            else:
                render_threejs_canvas(height=420)

    # SECTION: 3-Step Process Pipeline
    render_html("<hr style='border-color: rgba(148, 163, 184, 0.12); margin: 36px 0;'>", unsafe_allow_html=True)
    render_html("""
    <div style="text-align: center; margin-bottom: 24px;">
      <span class="citation-chip">Cognitive Flow</span>
      <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.8rem; font-weight: 600; color: #dfe2f1; margin: 8px 0;">
        Enterprise RAG Engine Workflow
      </h2>
      <p style="font-size: 0.95rem; color: #8c909f;">High-throughput ingestion to verifiable real-time synthesis in three auditable stages.</p>
    </div>
    """, unsafe_allow_html=True)

    col_pipe1, col_pipe2, col_pipe3 = st.columns(3)
    with col_pipe1:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span class="material-symbols-outlined" style="font-size: 26px; color: #adc6ff;">upload_file</span>
            <span class="code-meta">01 / STAGE</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 600; color: #dfe2f1; margin-bottom: 8px;">1. Ingest & Chunk Documents</h3>
          <p style="font-size: 0.88rem; color: #c2c6d6; line-height: 1.5; margin-bottom: 16px;">
            Extract tabular data, recursive layouts, and hierarchical headings. Text is parsed into semantic sliding-window chunks with preserved parent-child metadata.
          </p>
          <div style="background: #0f131d; padding: 8px 12px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #adc6ff; display: flex; justify-content: space-between;">
            <span>PDF, MD, Notion, Confluence</span>
            <span>512 Tok/Chunk</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_pipe2:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span class="material-symbols-outlined" style="font-size: 26px; color: #4cd7f6;">hub</span>
            <span class="code-meta">02 / STAGE</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 600; color: #dfe2f1; margin-bottom: 8px;">2. Hybrid Vector Search</h3>
          <p style="font-size: 0.88rem; color: #c2c6d6; line-height: 1.5; margin-bottom: 16px;">
            Dual-path vector evaluation fusing dense cosine representations with sparse BM25 token frequencies. Cohere cross-encoder reranking prioritizes top-k passages.
          </p>
          <div style="background: #0f131d; padding: 8px 12px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #4cd7f6; display: flex; justify-content: space-between;">
            <span>Cross-Encoder Re-rank</span>
            <span>Top-k=8 (RRF 60)</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_pipe3:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span class="material-symbols-outlined" style="font-size: 26px; color: #c0c1ff;">fact_check</span>
            <span class="code-meta">03 / STAGE</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 600; color: #dfe2f1; margin-bottom: 8px;">3. Grounded Synthesis</h3>
          <p style="font-size: 0.88rem; color: #c2c6d6; line-height: 1.5; margin-bottom: 16px;">
            Strict context-injection constraints guarantee zero hallucinated output. Every claim generates clickable cryptographic citation tokens linked directly to raw chunk text.
          </p>
          <div style="background: #0f131d; padding: 8px 12px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #c0c1ff; display: flex; justify-content: space-between;">
            <span>Deterministic Provenance</span>
            <span>Cosine &gt; 0.89</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    # SECTION: Interactive Live RAG Preview & Source Inspector
    render_html("<div style='margin-top: 24px;'></div>", unsafe_allow_html=True)
    render_html("""
    <div style="background: #171b26; border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(148, 163, 184, 0.12); padding-bottom: 12px; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #ef4444;"></span>
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #eab308;"></span>
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #4cd7f6;"></span>
          <span class="code-meta" style="margin-left: 8px;">SESSION #rag-88219-prod</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="citation-chip">Streaming: 128ms</span>
          <span class="citation-chip-purple">Model: GPT-4o + Qdrant</span>
        </div>
      </div>
    """, unsafe_allow_html=True)

    col_preview_left, col_preview_right = st.columns([7, 5])
    with col_preview_left:
        render_html("""
        <div style="background: #1c1f2a; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
          <div class="code-meta" style="text-transform: uppercase;">User Prompt</div>
          <div style="color: #dfe2f1; font-weight: 500; margin-top: 4px;">
            "What are the data retention protocols for encrypted vector embeddings and raw chunk storage during tenant deprovisioning?"
          </div>
        </div>

        <div style="background: #262a35; border-radius: 12px; padding: 18px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 18px;">auto_awesome</span>
              <span style="font-weight: 600; color: #dfe2f1;">KnowledgeAI Synthesis</span>
            </div>
            <span class="citation-chip-green">Grounded 99.8%</span>
          </div>

          <div style="color: #dfe2f1; font-size: 0.92rem; line-height: 1.6;">
            Upon formal tenant deprovisioning initiation, all vector collections indexed in the dedicated Qdrant shard undergo an automated cryptographic zero-fill purge
            <span class="citation-chip" style="cursor: pointer;">[Ref 1: SecOps Manual §4.2]</span>
            within a strict 15-minute SLA threshold.
            <br><br>
            Concurrently, cold raw document chunk partitions hosted on private S3 buckets receive an immutable cryptographic deletion ticket. Soft-retention backups are permanently expunged following a compliant 7-day rollback safeguard window
            <span class="citation-chip-purple" style="cursor: pointer;">[Ref 2: Compliance Matrix p.89]</span>.
            Auditable verification proofs are signed with Ed25519 keys and delivered directly to the compliance officer.
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; border-top: 1px solid rgba(148, 163, 184, 0.1); padding-top: 12px;">
            <div style="display: flex; gap: 12px;">
              <span class="code-meta" style="color: #4cd7f6;">⚡ 128ms retrieval</span>
              <span class="code-meta" style="color: #adc6ff;">🧠 4,118 prompt tokens</span>
            </div>
            <div style="display: flex; gap: 8px; color: #8c909f;">
              <span class="material-symbols-outlined" style="font-size: 18px; cursor: pointer;">thumb_up</span>
              <span class="material-symbols-outlined" style="font-size: 18px; cursor: pointer;">content_copy</span>
            </div>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_preview_right:
        render_html("""
        <div style="display: justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="code-meta" style="text-transform: uppercase;">Source Inspector & Chunk Attributions</span>
          <span class="citation-chip">2 Active Citations</span>
        </div>

        <div style="background: #1c1f2a; border: 1px solid rgba(76, 215, 246, 0.3); border-radius: 12px; padding: 14px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="color: #4d8eff; font-size: 18px;">description</span>
              <span style="font-size: 0.85rem; font-weight: 600; color: #dfe2f1;">Enterprise_SecOps_v4.pdf</span>
            </div>
            <span class="citation-chip">Sim: 0.941</span>
          </div>
          <div class="code-meta" style="margin-bottom: 8px;">Chunk ID: #chk-81902 • Section 4.2 "Tenant Deprovisioning"</div>
          <div style="background: #0a0e18; border-radius: 8px; padding: 10px; font-size: 0.82rem; color: #c2c6d6; line-height: 1.5;">
            "...Upon receiving formal deprovisioning signal via administrative webhook, all <mark style='background: rgba(0, 158, 185, 0.4); color: #4cd7f6; padding: 2px 4px; border-radius: 4px;'>Qdrant vector collections undergo automated cryptographic zero-fill purge within 15 minutes</mark> of token invalidation..."
          </div>
        </div>

        <div style="background: #1c1f2a; border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 12px; padding: 14px; margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="color: #c0c1ff; font-size: 18px;">table_chart</span>
              <span style="font-size: 0.85rem; font-weight: 600; color: #dfe2f1;">Global_Compliance_Matrix_2025.xlsx</span>
            </div>
            <span class="citation-chip-purple">Sim: 0.918</span>
          </div>
          <div class="code-meta" style="margin-bottom: 8px;">Chunk ID: #chk-40281 • Page 89 "Disaster Retention"</div>
          <div style="background: #0a0e18; border-radius: 8px; padding: 10px; font-size: 0.82rem; color: #c2c6d6; line-height: 1.5;">
            "...Raw text chunk storage partitions adhere to standard <mark style='background: rgba(49, 49, 192, 0.45); color: #c0c1ff; padding: 2px 4px; border-radius: 4px;'>7-day disaster rollback safeguard window</mark>, after which permanent physical block overwriting is enacted..."
          </div>
        </div>

        <div style="background: #262a35; border-radius: 10px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="material-symbols-outlined" style="color: #4d8eff; font-size: 16px;">analytics</span>
            <span class="code-meta" style="color: #dfe2f1;">Cohere-embed-v3 (1536 dim)</span>
          </div>
          <span class="citation-chip">Euclidean Cosine</span>
        </div>
        """, unsafe_allow_html=True)

    render_html("</div>", unsafe_allow_html=True)

    # Operational Metrics Strip
    render_html("<div style='margin-top: 24px;'></div>", unsafe_allow_html=True)
    c1, c2, c3, c4 = st.columns(4)
    with c1:
        render_html("""
        <div class="obsidian-card">
          <div class="code-meta">INDEXED DOCUMENTS</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">2.4M+</div>
          <div style="color: #4cd7f6; font-size: 0.78rem;">+18.4% this quarter</div>
        </div>
        """, unsafe_allow_html=True)
    with c2:
        render_html("""
        <div class="obsidian-card">
          <div class="code-meta">SEMANTIC QUERIES</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">98.2M</div>
          <div style="color: #34d399; font-size: 0.78rem;">99.99% cluster uptime</div>
        </div>
        """, unsafe_allow_html=True)
    with c3:
        render_html("""
        <div class="obsidian-card">
          <div class="code-meta">HNSW PRECISION</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">0.998</div>
          <div style="color: #c2c6d6; font-size: 0.78rem;">Recall @ 10 items</div>
        </div>
        """, unsafe_allow_html=True)
    with c4:
        render_html("""
        <div class="obsidian-card">
          <div class="code-meta">FASTAPI THROUGHPUT</div>
          <div style="font-size: 1.6rem; font-weight: 700; color: #4cd7f6; margin: 4px 0;">4,850 QPS</div>
          <div style="color: #c2c6d6; font-size: 0.78rem;">p95 latency: 18ms</div>
        </div>
        """, unsafe_allow_html=True)


# =============================================================================
# VIEW 2: 📊 DASHBOARD (STITCH SCREEN 2)
# =============================================================================
elif st.session_state.current_page == "Dashboard":
    render_html("""
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
      <div>
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="width: 6px; height: 6px; border-radius: 50%; background: #4cd7f6; box-shadow: 0 0 6px #4cd7f6;"></span>
          <span class="code-meta" style="color: #4cd7f6;">WORKSPACE CORE • NODE US-EAST-1</span>
        </div>
        <h1 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 700; color: #dfe2f1; margin: 0;">
          Knowledge Intelligence Dashboard
        </h1>
        <p style="font-size: 0.9rem; color: #8c909f; margin: 4px 0 0 0;">
          High-dimensional vector embeddings, hybrid indexing latency, and neural retrieval telemetry.
        </p>
      </div>
      <div style="display: flex; gap: 8px;">
        <span class="citation-chip">Past 7 Days</span>
        <span class="citation-chip" style="background: transparent; color: #8c909f; border-color: rgba(148, 163, 184, 0.2);">30D</span>
        <span class="citation-chip" style="background: transparent; color: #8c909f; border-color: rgba(148, 163, 184, 0.2);">Quarter</span>
      </div>
    </div>
    """, unsafe_allow_html=True)

    # 4 Operational KPI Cards
    col_k1, col_k2, col_k3, col_k4 = st.columns(4)
    with col_k1:
        render_html("""
        <div class="metric-kpi-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="code-meta">TOTAL DOCUMENTS</span>
            <span class="material-symbols-outlined" style="color: #adc6ff; font-size: 18px;">library_books</span>
          </div>
          <div style="font-size: 2rem; font-weight: 700; color: #dfe2f1; margin: 8px 0;">1,428</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="citation-chip">+12% this week</span>
            <span class="code-meta">8 repositories</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_k2:
        render_html("""
        <div class="metric-kpi-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="code-meta">VECTOR CHUNKS INDEXED</span>
            <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 18px;">grain</span>
          </div>
          <div style="font-size: 2rem; font-weight: 700; color: #dfe2f1; margin: 8px 0;">84,210</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="citation-chip">Qdrant connected</span>
            <span class="code-meta">1536-dim text-embedding-3</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_k3:
        render_html("""
        <div class="metric-kpi-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="code-meta">QUERIES RESOLVED</span>
            <span class="material-symbols-outlined" style="color: #c0c1ff; font-size: 18px;">dynamic_form</span>
          </div>
          <div style="font-size: 2rem; font-weight: 700; color: #dfe2f1; margin: 8px 0;">12,840</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="citation-chip-purple">112ms avg</span>
            <span class="code-meta">P99 &lt; 240ms</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_k4:
        render_html("""
        <div class="metric-kpi-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="code-meta">GROUNDED CITATION SCORE</span>
            <span class="material-symbols-outlined" style="color: #34d399; font-size: 18px;">verified</span>
          </div>
          <div style="font-size: 2rem; font-weight: 700; color: #dfe2f1; margin: 8px 0;">99.8%</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="citation-chip-green">0 Hallucination</span>
            <span class="code-meta">Cosine &gt; 0.88</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    render_html("<div style='margin-top: 24px;'></div>", unsafe_allow_html=True)

    # 2-Column Split: Ingestion Stream + Retrieval Distribution
    col_dash_left, col_dash_right = st.columns([7, 5])

    with col_dash_left:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: #4d8eff; font-size: 22px;">stream</span>
              <div>
                <h3 style="font-size: 1.1rem; font-weight: 600; color: #dfe2f1; margin: 0;">Recent Knowledge Ingestion</h3>
                <span class="code-meta">Live asynchronous parser pipeline</span>
              </div>
            </div>
            <span class="citation-chip">WORKER ACTIVE</span>
          </div>

          <!-- File Ingestion Row 1 -->
          <div style="background: #1c1f2a; border-radius: 12px; padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(239, 68, 68, 0.15); display: flex; align-items: center; justify-content: center; color: #f87171;">
                <span class="material-symbols-outlined" style="font-size: 20px;">picture_as_pdf</span>
              </div>
              <div>
                <div style="font-size: 0.9rem; font-weight: 600; color: #dfe2f1;">Financial_Report_Q3.pdf</div>
                <div class="code-meta">14.2 MB · 1,840 Chunks · <span style="color: #4cd7f6;">Semantic Chunking</span></div>
              </div>
            </div>
            <div style="text-align: right;">
              <span class="citation-chip-green" style="font-size: 0.68rem;">100% COMPLETE</span>
              <div class="code-meta" style="margin-top: 2px;">42s ago</div>
            </div>
          </div>

          <!-- File Ingestion Row 2 -->
          <div style="background: #1c1f2a; border-radius: 12px; padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(59, 130, 246, 0.15); display: flex; align-items: center; justify-content: center; color: #60a5fa;">
                <span class="material-symbols-outlined" style="font-size: 20px;">description</span>
              </div>
              <div>
                <div style="font-size: 0.9rem; font-weight: 600; color: #dfe2f1;">Medical_Trial_Protocol.docx</div>
                <div class="code-meta">8.4 MB · 912 Chunks · <span style="color: #c0c1ff;">BioBERT Embedding</span></div>
              </div>
            </div>
            <div style="text-align: right;">
              <span class="citation-chip-purple" style="font-size: 0.68rem;">PARSING (84%)</span>
              <div class="code-meta" style="margin-top: 2px;">Syncing shards</div>
            </div>
          </div>

          <!-- File Ingestion Row 3 -->
          <div style="background: #1c1f2a; border-radius: 12px; padding: 14px; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; color: #34d399;">
                <span class="material-symbols-outlined" style="font-size: 20px;">gavel</span>
              </div>
              <div>
                <div style="font-size: 0.9rem; font-weight: 600; color: #dfe2f1;">Legal_Master_Services_Agmt.pdf</div>
                <div class="code-meta">3.1 MB · 324 Chunks · <span style="color: #4d8eff;">Recursive Splitter</span></div>
              </div>
            </div>
            <div style="text-align: right;">
              <span class="citation-chip-green" style="font-size: 0.68rem;">INDEXED & SECURED</span>
              <div class="code-meta" style="margin-top: 2px;">8m ago</div>
            </div>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_dash_right:
        # Donut Chart SVG Visualizing Retrieval Distribution by Collection
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 22px;">bar_chart</span>
              <div>
                <h3 style="font-size: 1.1rem; font-weight: 600; color: #dfe2f1; margin: 0;">Retrieval Distribution</h3>
                <span class="code-meta">Density over the past 24 hours</span>
              </div>
            </div>
            <span class="citation-chip">Cosine &gt; 0.82</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-around; margin-bottom: 16px;">
            <div style="position: relative; width: 140px; height: 140px;">
              <svg viewBox="0 0 160 160" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                <circle cx="80" cy="80" r="64" fill="transparent" stroke="#262a35" stroke-width="14"></circle>
                <circle cx="80" cy="80" r="64" fill="transparent" stroke="#4cd7f6" stroke-width="14" stroke-dasharray="402" stroke-dashoffset="140" stroke-linecap="round"></circle>
                <circle cx="80" cy="80" r="64" fill="transparent" stroke="#4d8eff" stroke-width="14" stroke-dasharray="402" stroke-dashoffset="310" stroke-linecap="round"></circle>
                <circle cx="80" cy="80" r="64" fill="transparent" stroke="#c0c1ff" stroke-width="14" stroke-dasharray="402" stroke-dashoffset="375" stroke-linecap="round"></circle>
              </svg>
              <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <div style="font-size: 1.25rem; font-weight: 700; color: #dfe2f1;">12.8k</div>
                <div class="code-meta" style="font-size: 0.6rem;">RETRIEVALS</div>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px; flex: 1; margin-left: 16px;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.78rem;">
                  <span style="color: #4cd7f6;">■ Compliance</span>
                  <span style="font-weight: 600; color: #dfe2f1;">58% (7,447)</span>
                </div>
                <div style="width: 100%; height: 4px; background: #262a35; border-radius: 4px; margin-top: 2px;">
                  <div style="width: 58%; height: 100%; background: #4cd7f6; border-radius: 4px;"></div>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.78rem;">
                  <span style="color: #4d8eff;">■ Engineering APIs</span>
                  <span style="font-weight: 600; color: #dfe2f1;">27% (3,466)</span>
                </div>
                <div style="width: 100%; height: 4px; background: #262a35; border-radius: 4px; margin-top: 2px;">
                  <div style="width: 27%; height: 100%; background: #4d8eff; border-radius: 4px;"></div>
                </div>
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.78rem;">
                  <span style="color: #c0c1ff;">■ Financial Metrics</span>
                  <span style="font-weight: 600; color: #dfe2f1;">11% (1,412)</span>
                </div>
                <div style="width: 100%; height: 4px; background: #262a35; border-radius: 4px; margin-top: 2px;">
                  <div style="width: 11%; height: 100%; background: #c0c1ff; border-radius: 4px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        """, unsafe_allow_html=True)

    # Secondary Grid: Active Knowledge Bases + Infrastructure Health
    col_kb_dash, col_infra_dash = st.columns([7, 5])
    with col_kb_dash:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="material-symbols-outlined" style="color: #c0c1ff; font-size: 20px;">dataset</span>
              <span style="font-size: 1.05rem; font-weight: 600; color: #dfe2f1;">Active Knowledge Bases</span>
            </div>
            <span class="code-meta" style="color: #4cd7f6;">View All</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="background: #1c1f2a; border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.85rem; font-weight: 600; color: #dfe2f1;">kb-corporate-governance</div>
                <div class="code-meta">38,420 chunks · <span style="color: #34d399;">Health: 99.4% Valid</span> · Last sync: 12m</div>
              </div>
              <span class="citation-chip">Sync</span>
            </div>
            <div style="background: #1c1f2a; border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.85rem; font-weight: 600; color: #dfe2f1;">kb-clinical-research-v2</div>
                <div class="code-meta">29,180 chunks · <span style="color: #34d399;">Health: 100% Valid</span> · Last sync: 2h</div>
              </div>
              <span class="citation-chip">Sync</span>
            </div>
            <div style="background: #1c1f2a; border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.85rem; font-weight: 600; color: #dfe2f1;">kb-software-architecture</div>
                <div class="code-meta">16,610 chunks · <span style="color: #34d399;">Health: 98.1% Valid</span> · Last sync: 5h</div>
              </div>
              <span class="citation-chip">Sync</span>
            </div>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_infra_dash:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
            <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 20px;">monitor_heart</span>
            <span style="font-size: 1.05rem; font-weight: 600; color: #dfe2f1;">Infrastructure Health</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="background: #1c1f2a; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: #4cd7f6;"></span>
                <span style="font-size: 0.82rem; color: #dfe2f1;">FastAPI Engine</span>
              </div>
              <span class="citation-chip-green" style="font-size: 0.65rem;">HTTP 200 HEALTHY</span>
            </div>
            <div style="background: #1c1f2a; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: #4cd7f6;"></span>
                <span style="font-size: 0.82rem; color: #dfe2f1;">Qdrant Cluster (v1.9)</span>
              </div>
              <span class="citation-chip" style="font-size: 0.65rem;">12ms CONNECTED</span>
            </div>
            <div style="background: #1c1f2a; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="width: 6px; height: 6px; border-radius: 50%; background: #4d8eff;"></span>
                <span style="font-size: 0.82rem; color: #dfe2f1;">PostgreSQL Relational Pool</span>
              </div>
              <span class="citation-chip-purple" style="font-size: 0.65rem;">18/64 OPTIMAL</span>
            </div>
          </div>
        </div>
        """, unsafe_allow_html=True)


# =============================================================================
# VIEW 3: 💬 AI CHAT & EVIDENCE INSPECTOR (STITCH SCREEN 3)
# =============================================================================
elif st.session_state.current_page == "Chat":
    col_threads, col_chat, col_evidence = st.columns([3, 6, 3])

    # Left: Sessions & Vector Memory
    with col_threads:
        render_html("""
        <div class="obsidian-card" style="padding: 16px;">
          <div style="margin-bottom: 12px;">
            <div class="code-meta" style="margin-bottom: 8px; text-transform: uppercase;">Vector Conversations</div>
          </div>
        """, unsafe_allow_html=True)

        if st.button("➕ New Session", key="new_chat_session_btn", use_container_width=True):
            st.session_state.chat_messages = [
                {"role": "assistant", "content": "Hello Dr. Wright. The hybrid vector index is connected across all 8 enterprise collections. How can I assist your research today?", "time": "Just now", "grounded": "Connected"}
            ]
            st.rerun()

        render_html("""
          <div style="margin-top: 14px; display: flex; flex-direction: column; gap: 8px;">
            <div style="background: #262a35; border: 1px solid rgba(77, 142, 255, 0.4); border-radius: 10px; padding: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.82rem; font-weight: 600; color: #adc6ff;">MSA Termination Liabilities</span>
                <span class="code-meta" style="color: #4cd7f6;">Active</span>
              </div>
              <div style="font-size: 0.72rem; color: #8c909f; margin-top: 2px;">Sec 8.4 cure duration & exit indemnity</div>
            </div>

            <div style="background: #1c1f2a; border-radius: 10px; padding: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.82rem; font-weight: 500; color: #dfe2f1;">GDPR Compliance Review</span>
                <span class="code-meta">2h ago</span>
              </div>
              <div style="font-size: 0.72rem; color: #8c909f; margin-top: 2px;">Article 28 DPA subprocessor vetting</div>
            </div>

            <div style="background: #1c1f2a; border-radius: 10px; padding: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.82rem; font-weight: 500; color: #dfe2f1;">Architecture RFC v2</span>
                <span class="code-meta">Yesterday</span>
              </div>
              <div style="font-size: 0.72rem; color: #8c909f; margin-top: 2px;">Sharding hybrid vectors in Qdrant</div>
            </div>

            <div style="background: #1c1f2a; border-radius: 10px; padding: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.82rem; font-weight: 500; color: #dfe2f1;">Clinical Trial Phase II</span>
                <span class="code-meta">Oct 14</span>
              </div>
              <div style="font-size: 0.72rem; color: #8c909f; margin-top: 2px;">Patient cohort exclusion metrics</div>
            </div>
          </div>

          <div style="margin-top: 20px; background: #0f131d; border-radius: 8px; padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="code-meta">EMBEDDINGS CACHE</span>
              <span class="code-meta" style="color: #4cd7f6;">99.4% Hit</span>
            </div>
            <div style="width: 100%; height: 4px; background: #262a35; border-radius: 4px; margin: 6px 0;">
              <div style="width: 99.4%; height: 100%; background: #4cd7f6; border-radius: 4px;"></div>
            </div>
            <span class="code-meta" style="font-size: 0.65rem;">1,248,390 vectors in memory</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    # Center: Dynamic Reasoning & Dialogue Stream
    with col_chat:
        render_html("""
        <div style="background: #171b26; border-radius: 12px 12px 0 0; padding: 12px 16px; border: 1px solid rgba(148, 163, 184, 0.15); border-bottom: none; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="citation-chip">Enterprise_Docs_v2</span>
            <span class="citation-chip-purple">Claude 3.5 Sonnet / Qdrant Hybrid RAG</span>
          </div>
          <span class="code-meta">Temp: 0.20</span>
        </div>
        """, unsafe_allow_html=True)

        chat_container = st.container(height=520)
        with chat_container:
            for msg in st.session_state.chat_messages:
                if msg["role"] == "user":
                    render_html(f"""
                    <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
                      <div style="background: #4d8eff; color: #ffffff; border-radius: 14px 14px 0 14px; padding: 12px 16px; max-width: 80%; box-shadow: 0 4px 12px rgba(77, 142, 255, 0.3);">
                        <div style="font-size: 0.92rem; font-weight: 500;">{format_chat_content(msg["content"])}</div>
                        <div class="code-meta" style="color: rgba(255,255,255,0.7); text-align: right; margin-top: 4px;">{msg.get("time", "Just now")}</div>
                      </div>
                    </div>
                    """, unsafe_allow_html=True)
                else:
                    render_html(f"""
                    <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                      <div style="background: #1c1f2a; border-radius: 8px; padding: 6px 12px; display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;">
                        <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 16px;">verified</span>
                        <span style="font-size: 0.78rem; color: #4cd7f6; font-weight: 600;">{msg.get("grounded", "100% grounded")}</span>
                        <span class="code-meta">Latency: {msg.get("latency", "284ms")}</span>
                      </div>
                      <div style="background: #171b26; border: 1px solid rgba(148, 163, 184, 0.15); border-radius: 0 14px 14px 14px; padding: 18px; line-height: 1.6; font-size: 0.9rem; color: #dfe2f1;">
                        {format_chat_content(msg["content"])}
                      </div>
                    </div>
                    """, unsafe_allow_html=True)

                    if "citations" in msg:
                        render_html("<div class='code-meta' style='margin-bottom: 6px;'>CLICKABLE CITATION EVIDENCE:</div>", unsafe_allow_html=True)
                        cit_cols = st.columns(len(msg["citations"]))
                        for idx, c in enumerate(msg["citations"]):
                            with cit_cols[idx]:
                                if st.button(c["label"], key=f"cit_btn_{idx}", use_container_width=True):
                                    st.session_state.active_chunk = c["chunk_id"]
                                    st.rerun()

        # Chat Input Console
        user_input = st.chat_input("Ask a grounded question across corporate vectors, contracts, or specs...")
        if user_input:
            st.session_state.chat_messages.append({"role": "user", "content": user_input, "time": "Just now"})
            st.session_state.chat_messages.append({
                "role": "assistant",
                "content": f"Synthesized response for: **{user_input}**.\n\nAll claims in this output have been cross-verified against indexed embeddings in the Qdrant cluster with zero detected hallucinations.",
                "time": "Just now",
                "grounded": "100% Grounded in 3 verified chunks",
                "latency": "142ms",
                "citations": [
                    {"chunk_id": "chunk-1", "label": "[Ref: MSA_2024_Final.pdf §8.4]"}
                ]
            })
            st.rerun()

    # Right: Evidence Inspector
    with col_evidence:
        active_chunk_data = CHUNKS_LIB.get(st.session_state.active_chunk, CHUNKS_LIB["chunk-1"])

        render_html(f"""
        <div class="obsidian-card" style="padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 18px;">manage_search</span>
              <span style="font-size: 0.95rem; font-weight: 600; color: #dfe2f1;">Evidence Inspector</span>
            </div>
            <span class="citation-chip">{active_chunk_data["point"]}</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
            <div style="background: #1c1f2a; border-radius: 8px; padding: 8px 10px;">
              <div class="code-meta">Cosine Similarity</div>
              <div style="font-size: 1.25rem; font-weight: 700; color: #4cd7f6;">{active_chunk_data["sim"]}</div>
              <span class="code-meta" style="color: #34d399;">Rank #1 Match</span>
            </div>
            <div style="background: #1c1f2a; border-radius: 8px; padding: 8px 10px;">
              <div class="code-meta">Dense Embedding</div>
              <div style="font-size: 1.25rem; font-weight: 700; color: #c0c1ff;">1,536d</div>
              <span class="code-meta">text-embedding-3</span>
            </div>
          </div>

          <div style="background: #1c1f2a; border: 1px solid rgba(76, 215, 246, 0.3); border-radius: 10px; padding: 12px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 0.82rem; font-weight: 600; color: #dfe2f1;">{active_chunk_data["file"]}</span>
              <span class="citation-chip">{active_chunk_data["meta"]}</span>
            </div>
            <div class="code-meta" style="margin-bottom: 8px;">Hash: {active_chunk_data["hash"]}</div>
            <div style="background: #0a0e18; border-radius: 8px; padding: 10px; font-size: 0.8rem; color: #c2c6d6; line-height: 1.5;">
              {active_chunk_data["text"]}
            </div>
          </div>

          <div style="background: #1c1f2a; border-radius: 8px; padding: 10px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 4px;">
              <span class="code-meta">BM25 Sparse Match</span>
              <span class="code-meta" style="color: #c0c1ff;">42%</span>
            </div>
            <div style="width: 100%; height: 3px; background: #262a35; border-radius: 2px;">
              <div style="width: 42%; height: 100%; background: #c0c1ff;"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin: 8px 0 4px 0;">
              <span class="code-meta">Dense Cosine Match</span>
              <span class="code-meta" style="color: #4cd7f6;">58%</span>
            </div>
            <div style="width: 100%; height: 3px; background: #262a35; border-radius: 2px;">
              <div style="width: 58%; height: 100%; background: #4cd7f6;"></div>
            </div>
          </div>
        </div>
        """, unsafe_allow_html=True)

        if st.button("📥 Export Audit Proof Bundle", key="export_audit_bundle_btn", use_container_width=True):
            st.success("Cryptographic Ed25519 audit manifest generated.")


# =============================================================================
# VIEW 4: 📁 DOCUMENTS & INGESTION (STITCH SCREEN 4)
# =============================================================================
elif st.session_state.current_page == "Documents":
    render_html("""
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
      <div>
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span class="code-meta" style="color: #4cd7f6; text-transform: uppercase;">RAG ENGINE · VECTOR INGESTION PIPELINE</span>
          <span style="width: 4px; height: 4px; border-radius: 50%; background: #4cd7f6;"></span>
          <span class="code-meta">Cluster 01 [Ready]</span>
        </div>
        <h1 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 700; color: #dfe2f1; margin: 0;">
          Documents & Knowledge Ingestion
        </h1>
        <p style="font-size: 0.9rem; color: #8c909f; margin: 4px 0 0 0;">
          Parse, chunk, and synchronize enterprise corpus into dense dimensional spaces.
        </p>
      </div>
      <div style="display: flex; gap: 8px;">
        <span class="citation-chip">Sync All</span>
        <span class="citation-chip" style="background: transparent; border-color: rgba(148, 163, 184, 0.2); color: #8c909f;">Chunk Presets</span>
      </div>
    </div>
    """, unsafe_allow_html=True)

    # Active In-Flight Ingestion Queue Bar
    render_html("""
    <div style="background: #262a35; border: 1px solid rgba(77, 142, 255, 0.3); border-radius: 12px; padding: 14px 18px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(77, 142, 255, 0.2); display: flex; align-items: center; justify-content: center; color: #4d8eff;">
          <span class="material-symbols-outlined" style="font-size: 20px;">memory</span>
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="code-meta" style="color: #4cd7f6;">IN-FLIGHT QUEUE</span>
            <span class="citation-chip">STREAMING 50%</span>
          </div>
          <div style="font-size: 0.9rem; font-weight: 600; color: #dfe2f1;">financial_statement_2024.pdf — Parsing & Vectorizing</div>
          <div class="code-meta">Batch execution on text-embedding-3-large · 48 of 96 chunks committed to Qdrant</div>
        </div>
      </div>
      <div style="width: 260px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-bottom: 4px;">
          <span class="code-meta">Vectorizing shards</span>
          <span style="color: #4d8eff; font-weight: 600;">48 / 96</span>
        </div>
        <div style="width: 100%; height: 6px; background: #0a0e18; border-radius: 999px; overflow: hidden;">
          <div style="width: 50%; height: 100%; background: linear-gradient(90deg, #4d8eff, #4cd7f6);"></div>
        </div>
      </div>
    </div>
    """, unsafe_allow_html=True)

    # File Upload Dropzone & Configuration Preview
    col_up_left, col_up_right = st.columns([8, 4])
    with col_up_left:
        uploaded_files = st.file_uploader(
            "Upload Enterprise Documents",
            type=["pdf", "docx", "txt", "md"],
            accept_multiple_files=True,
            help="Supports native text parsing, OCR-enabled tables, and recursive headers."
        )
        if uploaded_files:
            st.success(f"{len(uploaded_files)} file(s) staged for pipeline chunking & Qdrant insertion.")

    with col_up_right:
        render_html("""
        <div class="obsidian-card" style="padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="code-meta">PIPELINE TOPOLOGY</span>
            <span class="citation-chip">LIVE CONFIG</span>
          </div>
          <div style="font-size: 0.95rem; font-weight: 600; color: #dfe2f1; margin-bottom: 8px;">Chunking & Vectors</div>
          <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.8rem;">
            <div style="display: flex; justify-content: space-between; background: #1c1f2a; padding: 6px 10px; border-radius: 6px;">
              <span style="color: #8c909f;">Chunk Token Size:</span>
              <span style="color: #4d8eff; font-weight: 600;">512 tokens</span>
            </div>
            <div style="display: flex; justify-content: space-between; background: #1c1f2a; padding: 6px 10px; border-radius: 6px;">
              <span style="color: #8c909f;">Chunk Overlap:</span>
              <span style="color: #4cd7f6; font-weight: 600;">50 tokens</span>
            </div>
            <div style="display: flex; justify-content: space-between; background: #1c1f2a; padding: 6px 10px; border-radius: 6px;">
              <span style="color: #8c909f;">Vector Model:</span>
              <span style="color: #dfe2f1;">text-embedding-3-large</span>
            </div>
          </div>
        </div>
        """, unsafe_allow_html=True)

    # Documents Data Grid matching Stitch Documents Table
    render_html("""
    <div class="stitch-table-wrapper">
      <table class="stitch-table">
        <thead>
          <tr>
            <th>FILE NAME</th>
            <th>COLLECTION</th>
            <th>SIZE</th>
            <th>CHUNKS</th>
            <th>QDRANT INDEX STATUS</th>
            <th>UPLOADED</th>
            <th style="text-align: right;">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="material-symbols-outlined" style="color: #f87171; font-size: 20px;">picture_as_pdf</span>
                <div>
                  <div style="font-weight: 600; color: #dfe2f1;">Cloud_Security_Policy_v4.pdf</div>
                  <div class="code-meta">SHA-256: d83a...f92c</div>
                </div>
              </div>
            </td>
            <td><span class="citation-chip" style="background: transparent;">SecOps & Compliance</span></td>
            <td class="code-meta">4.8 MB</td>
            <td class="code-meta" style="color: #dfe2f1;">312 chunks</td>
            <td><span class="citation-chip-green">Indexed / Ready</span></td>
            <td class="code-meta">Today, 10:14 AM</td>
            <td style="text-align: right;">
              <span class="material-symbols-outlined" style="color: #8c909f; font-size: 18px; cursor: pointer; margin-right: 8px;">segment</span>
              <span class="material-symbols-outlined" style="color: #8c909f; font-size: 18px; cursor: pointer;">delete</span>
            </td>
          </tr>
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="material-symbols-outlined" style="color: #38bdf8; font-size: 20px;">markdown</span>
                <div>
                  <div style="font-weight: 600; color: #dfe2f1;">Engineering_Design_Doc_RAG.md</div>
                  <div class="code-meta">SHA-256: 41ae...e70b</div>
                </div>
              </div>
            </td>
            <td><span class="citation-chip">Architecture & Docs</span></td>
            <td class="code-meta">842 KB</td>
            <td class="code-meta" style="color: #dfe2f1;">148 chunks</td>
            <td><span class="citation-chip-green">Indexed / Ready</span></td>
            <td class="code-meta">Yesterday</td>
            <td style="text-align: right;">
              <span class="material-symbols-outlined" style="color: #8c909f; font-size: 18px; cursor: pointer; margin-right: 8px;">segment</span>
              <span class="material-symbols-outlined" style="color: #8c909f; font-size: 18px; cursor: pointer;">delete</span>
            </td>
          </tr>
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="material-symbols-outlined" style="color: #60a5fa; font-size: 20px;">description</span>
                <div>
                  <div style="font-weight: 600; color: #dfe2f1;">Employee_Handbook_2024.docx</div>
                  <div class="code-meta">SHA-256: 77a1...8c20</div>
                </div>
              </div>
            </td>
            <td><span class="citation-chip" style="background: transparent;">People & Culture</span></td>
            <td class="code-meta">2.1 MB</td>
            <td class="code-meta" style="color: #dfe2f1;">190 chunks</td>
            <td><span class="citation-chip-purple">Syncing</span></td>
            <td class="code-meta">May 12, 2024</td>
            <td style="text-align: right;">
              <span class="material-symbols-outlined" style="color: #8c909f; font-size: 18px; cursor: pointer; margin-right: 8px;">segment</span>
              <span class="material-symbols-outlined" style="color: #8c909f; font-size: 18px; cursor: pointer;">delete</span>
            </td>
          </tr>
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="material-symbols-outlined" style="color: #fbbf24; font-size: 20px;">pending</span>
                <div>
                  <div style="font-weight: 600; color: #dfe2f1;">financial_statement_2024.pdf</div>
                  <div class="code-meta">Vectorizing chunk 48/96</div>
                </div>
              </div>
            </td>
            <td><span class="citation-chip" style="background: transparent;">Quarterly Financials</span></td>
            <td class="code-meta">11.4 MB</td>
            <td class="code-meta" style="color: #fbbf24;">48 / 96</td>
            <td><span class="citation-chip-amber">In Progress</span></td>
            <td class="code-meta">Just now</td>
            <td style="text-align: right;">
              <span class="material-symbols-outlined" style="color: #8c909f; font-size: 18px; cursor: pointer; margin-right: 8px;">segment</span>
              <span class="material-symbols-outlined" style="color: #8c909f; font-size: 18px; cursor: pointer;">pause</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="background: #1c1f2a; padding: 12px 18px; display: flex; justify-content: space-between; align-items: center;">
        <span class="code-meta">Showing 4 of 4 documents • <span style="color: #4cd7f6;">Qdrant Points: 666 / 714 active</span></span>
        <span class="code-meta">Page 1 of 1</span>
      </div>
    </div>
    """, unsafe_allow_html=True)


# =============================================================================
# VIEW 5: 🗄️ KNOWLEDGE BASES
# =============================================================================
elif st.session_state.current_page == "KnowledgeBases":
    render_html("""
    <div style="margin-bottom: 20px;">
      <div class="code-meta" style="color: #4cd7f6; text-transform: uppercase;">ENTERPRISE REPOSITORIES</div>
      <h1 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">
        Federated Knowledge Bases
      </h1>
      <p style="font-size: 0.9rem; color: #8c909f;">Manage federated vector collections, embedding models, and access controls.</p>
    </div>
    """, unsafe_allow_html=True)

    col_k1, col_k2 = st.columns(2)
    with col_k1:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 1.1rem; font-weight: 600; color: #dfe2f1;">kb-corporate-governance</span>
            <span class="citation-chip-green">99.4% HEALTH</span>
          </div>
          <p style="font-size: 0.85rem; color: #c2c6d6; line-height: 1.5; margin-bottom: 12px;">
            Enterprise bylaws, board resolutions, regulatory filings, and global SEC compliance mandates.
          </p>
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #8c909f; background: #0f131d; padding: 8px 12px; border-radius: 8px;">
            <span>38,420 chunks</span>
            <span>text-embedding-3-large</span>
            <span>Sync: 12m ago</span>
          </div>
        </div>

        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 1.1rem; font-weight: 600; color: #dfe2f1;">kb-clinical-research-v2</span>
            <span class="citation-chip-green">100% HEALTH</span>
          </div>
          <p style="font-size: 0.85rem; color: #c2c6d6; line-height: 1.5; margin-bottom: 12px;">
            Double-blind clinical trials, FDA documentation, patient exclusion vectors, and BioMed data.
          </p>
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #8c909f; background: #0f131d; padding: 8px 12px; border-radius: 8px;">
            <span>29,180 chunks</span>
            <span>BioBERT Dense (768d)</span>
            <span>Sync: 2h ago</span>
          </div>
        </div>
        """, unsafe_allow_html=True)

    with col_k2:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 1.1rem; font-weight: 600; color: #dfe2f1;">kb-software-architecture</span>
            <span class="citation-chip-green">98.1% HEALTH</span>
          </div>
          <p style="font-size: 0.85rem; color: #c2c6d6; line-height: 1.5; margin-bottom: 12px;">
            Technical RFCs, OpenAPI 3.1 definitions, infrastructure blueprints, and Qdrant cluster topology.
          </p>
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #8c909f; background: #0f131d; padding: 8px 12px; border-radius: 8px;">
            <span>16,610 chunks</span>
            <span>Cohere-embed-v3 (1536d)</span>
            <span>Sync: 5h ago</span>
          </div>
        </div>

        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <span style="font-size: 1.1rem; font-weight: 600; color: #dfe2f1;">kb-quarterly-financials</span>
            <span class="citation-chip-green">99.9% HEALTH</span>
          </div>
          <p style="font-size: 0.85rem; color: #c2c6d6; line-height: 1.5; margin-bottom: 12px;">
            Audited 10-K/10-Q filings, ledger extracts, risk evaluation charts, and EBITDA forecasts.
          </p>
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: #8c909f; background: #0f131d; padding: 8px 12px; border-radius: 8px;">
            <span>24,150 chunks</span>
            <span>text-embedding-3-large</span>
            <span>Sync: 1d ago</span>
          </div>
        </div>
        """, unsafe_allow_html=True)


# =============================================================================
# VIEW 6: 🤖 AGENT WORKSPACE
# =============================================================================
elif st.session_state.current_page == "AgentWorkspace":
    render_html("""
    <div style="margin-bottom: 20px;">
      <div class="code-meta" style="color: #4cd7f6; text-transform: uppercase;">MULTI-AGENT COGNITIVE ORCHESTRATION</div>
      <h1 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">
        Autonomous Agent Workspace
      </h1>
      <p style="font-size: 0.9rem; color: #8c909f;">Coordinated multi-agent synthesis, evidence extraction, and real-time hallucination audits.</p>
    </div>
    """, unsafe_allow_html=True)

    col_ag1, col_ag2, col_ag3 = st.columns(3)
    with col_ag1:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="material-symbols-outlined" style="color: #4d8eff; font-size: 24px;">smart_toy</span>
            <span class="citation-chip">RUNNING</span>
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 600; color: #dfe2f1; margin-bottom: 6px;">Deep Research Agent</h3>
          <p style="font-size: 0.82rem; color: #c2c6d6; line-height: 1.5;">Traverses Qdrant vector spaces, executes multi-hop sub-queries, and clusters semantic context.</p>
          <div style="background: #0f131d; padding: 6px 10px; border-radius: 6px; font-size: 0.72rem; color: #8c909f; margin-top: 10px;">Active QPS: 24 · Subqueries: 180/m</div>
        </div>
        """, unsafe_allow_html=True)

    with col_ag2:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="material-symbols-outlined" style="color: #4cd7f6; font-size: 24px;">fact_check</span>
            <span class="citation-chip-green">AUDITING</span>
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 600; color: #dfe2f1; margin-bottom: 6px;">Citation Verifier Agent</h3>
          <p style="font-size: 0.82rem; color: #c2c6d6; line-height: 1.5;">Performs token-by-token verification between generated claims and raw document chunks.</p>
          <div style="background: #0f131d; padding: 6px 10px; border-radius: 6px; font-size: 0.72rem; color: #8c909f; margin-top: 10px;">Verification SLA: 18ms · Zero Hallucination</div>
        </div>
        """, unsafe_allow_html=True)

    with col_ag3:
        render_html("""
        <div class="obsidian-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="material-symbols-outlined" style="color: #c0c1ff; font-size: 24px;">account_tree</span>
            <span class="citation-chip-purple">INDEXING</span>
          </div>
          <h3 style="font-size: 1.05rem; font-weight: 600; color: #dfe2f1; margin-bottom: 6px;">Vector Ingestion Worker</h3>
          <p style="font-size: 0.82rem; color: #c2c6d6; line-height: 1.5;">Asynchronously splits incoming PDFs into hierarchical chunks and commits dense embeddings.</p>
          <div style="background: #0f131d; padding: 6px 10px; border-radius: 6px; font-size: 0.72rem; color: #8c909f; margin-top: 10px;">Queue: 48 chunks · Rate: 120/sec</div>
        </div>
        """, unsafe_allow_html=True)


# =============================================================================
# VIEW 7: ⚖️ SYNTHESIS & METRICS
# =============================================================================
elif st.session_state.current_page == "Synthesis":
    render_html("""
    <div style="margin-bottom: 20px;">
      <div class="code-meta" style="color: #4cd7f6; text-transform: uppercase;">EVALUATION & SYNTHESIS BENCHMARKS</div>
      <h1 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">
        Synthesis & Quality Benchmarks
      </h1>
      <p style="font-size: 0.9rem; color: #8c909f;">Ragas evaluation telemetry, semantic drift analysis, and document comparison diffs.</p>
    </div>
    """, unsafe_allow_html=True)

    c1, c2, c3, c4 = st.columns(4)
    with c1:
        render_html("""
        <div class="metric-kpi-card">
          <div class="code-meta">FAITHFULNESS</div>
          <div style="font-size: 1.8rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">98.4%</div>
          <div style="color: #34d399; font-size: 0.78rem;">Zero context hallucination</div>
        </div>
        """, unsafe_allow_html=True)
    with c2:
        render_html("""
        <div class="metric-kpi-card">
          <div class="code-meta">ANSWER RELEVANCE</div>
          <div style="font-size: 1.8rem; font-weight: 700; color: #4cd7f6; margin: 4px 0;">96.7%</div>
          <div style="color: #4cd7f6; font-size: 0.78rem;">Cross-encoder aligned</div>
        </div>
        """, unsafe_allow_html=True)
    with c3:
        render_html("""
        <div class="metric-kpi-card">
          <div class="code-meta">CONTEXT RECALL</div>
          <div style="font-size: 1.8rem; font-weight: 700; color: #dfe2f1; margin: 4px 0;">94.2%</div>
          <div style="color: #c2c6d6; font-size: 0.78rem;">Top-8 passage capture</div>
        </div>
        """, unsafe_allow_html=True)
    with c4:
        render_html("""
        <div class="metric-kpi-card">
          <div class="code-meta">SEMANTIC DRIFT</div>
          <div style="font-size: 1.8rem; font-weight: 700; color: #c0c1ff; margin: 4px 0;">1.2%</div>
          <div style="color: #34d399; font-size: 0.78rem;">Negligible drift index</div>
        </div>
        """, unsafe_allow_html=True)

    render_html("<div style='margin-top: 24px;'></div>", unsafe_allow_html=True)

    # Document Comparison Diff
    render_html("""
    <div class="obsidian-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <span style="font-size: 1.05rem; font-weight: 600; color: #dfe2f1;">Document Comparison Delta: MSA 2023 vs 2024</span>
        <span class="citation-chip">Semantic Diff</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
        <div style="background: #1c1f2a; border-radius: 10px; padding: 14px;">
          <div class="code-meta" style="color: #f87171; margin-bottom: 6px;">BASELINE: MSA_2023_Final.pdf §8.4</div>
          <div style="font-size: 0.85rem; color: #c2c6d6; line-height: 1.5;">
            "Either party may terminate upon sixty (60) days written notice for convenience. Client remains liable for all amortized hardware outlays."
          </div>
        </div>
        <div style="background: #1c1f2a; border-radius: 10px; padding: 14px; border: 1px solid rgba(76, 215, 246, 0.3);">
          <div class="code-meta" style="color: #4cd7f6; margin-bottom: 6px;">UPDATED: MSA_2024_Final.pdf §8.4</div>
          <div style="font-size: 0.85rem; color: #dfe2f1; line-height: 1.5;">
            "Either party may terminate upon thirty (30) days written notice. Client remains liable for WIP and non-cancelable Annex B compute commitments."
          </div>
        </div>
      </div>
    </div>
    """, unsafe_allow_html=True)
