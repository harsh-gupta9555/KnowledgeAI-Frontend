# 🧠 KnowledgeAI — Enterprise RAG & 3D Intelligence Platform [Frontend]

[![Frontend](https://img.shields.io/badge/Architecture-Frontend-blue?style=for-the-badge&logo=react)](https://github.com/harsh-gupta9555/KnowledgeAI-Frontend)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.34+-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)](https://streamlit.io/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.0+-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Design System](https://img.shields.io/badge/Theme-Obsidian%20Synthetics-4cd7f6?style=for-the-badge)](https://stitch.withgoogle.com)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-34d399?style=for-the-badge)]()

> **Enterprise RAG & 3D Intelligence Platform Frontend**  
> Faithfully extracted and engineered from Stitch Project `8061712245908356325` (*KnowledgeAI 3D Interface Redesign*).  
> Features both a **Streamlit Production Edition** and a **Next.js 15 Full-Stack Frontend**.

---

## 🌐 Live Public Demo
- **Live Public URL**: [https://snowboard-morris-aspect-electricity.trycloudflare.com](https://snowboard-morris-aspect-electricity.trycloudflare.com)
- **Local Port**: `http://localhost:8501`

---

## 🚀 Key Frontend Features

### 1. 🧭 Sticky Single-Row Top Navigation Bar
- **Single-Row Guarantee**: Engineered with `flex-direction: row`, `flex-wrap: nowrap`, and zero line-breaking across any viewport.
- **Scrollbar-Free**: Clean capsule design with `scrollbar-width: none` and hidden WebKit scrollbars.
- **Branding & Telemetry**:
  - Gradient Neurology Emblem + `KnowledgeAI` title + `Enterprise RAG` sub-badge.
  - Production status chip: `⚡ v4.2-PROD` (Hybrid Qdrant & FastAPI engine).
  - Quick Search shortcut badge `⌘K`.
  - Notification alert center and user profile chip (`Dr. Wright`).
- **Instant Query-Param Routing**: Seamless navigation across all 7 views (`?page=Overview`, `?page=Dashboard`, `?page=Chat`, `?page=Documents`, etc.) with zero session state loss.

### 2. 🎨 100% Screen Fidelity (Obsidian Synthetics Dark Theme)
| View | Description | Key Components |
| :--- | :--- | :--- |
| **🏠 Overview** | Homepage & Cognitive Architecture | 3D Obsidian Sculpture / Three.js WebGL toggle, live operational stats (99.4% accuracy, <140ms latency, zero hallucination), 3-step pipeline, interactive synthesis preview with citation links. |
| **📊 Dashboard** | Telemetry & Vector Health | 4 KPI cards (Embeddings, Latency, Throughput, Rerank Score), Ingestion feed, SVG Donut Retrieval Distribution (12.8k vectors), Active KBs, Query Sandbox. |
| **💬 AI Chat** | Grounded Multi-Turn Reasoning | 3-pane layout: Conversation Threads, Grounded Dialogue Stream with 100% verification banners, and interactive Evidence Inspector with chunk cosine similarity and highlighted source text. |
| **📁 Documents** | Ingestion & Document Grid | Active upload dropzone, vectorization topology config (BGE-M3 + Chunking), and custom-styled 4-row Stitch enterprise document data table. |
| **🗄️ Knowledge Bases** | Vector Federation Directory | 4 collections (Enterprise MSA, SEC 10-K, Clinical Protocols, RFC Architecture) with Qdrant shard stats and sync controls. |
| **🤖 Agent Workspace** | Autonomous Multi-Agent System | Research Agent, Citation Verifier, and Ingestion Worker execution telemetry and tool access cards. |
| **⚖️ Synthesis & Metrics** | Contract Delta & Quality Evaluation | Side-by-side legal diff viewer (MSA 2023 vs 2024) and Ragas evaluation benchmarks (Faithfulness 0.96, Answer Relevance 0.94, Context Recall 0.91). |

### 3. 🛡️ Native DOM Rendering (Zero Code Leakage)
- Uses `render_html()` backed by `st.html(textwrap.dedent(...))` to eliminate markdown indentation bugs (`<pre><code>` code block parsing), ensuring all cards, chips, and visual elements render natively in the browser.

---

## 📁 Repository Structure

```
KnowledgeAI-Frontend/
├── app.py                      # Main Streamlit Frontend application
├── styles.py                   # Obsidian Synthetics Design System CSS
├── components_3d.py            # Three.js WebGL Canvas & 3D asset loader
├── requirements.txt            # Python dependencies (Streamlit, Pandas, etc.)
├── .gitignore                  # Git ignore rules
├── assets/
│   └── ai-neural-core.png      # 3D Obsidian Neural Core visual asset
└── nextjs-version/             # Full Next.js 15 / React Frontend edition
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── src/
    │   ├── app/                # Next.js App Router (Overview, Dashboard, Chat, etc.)
    │   └── components/         # Reusable UI components & 3D canvas
    └── public/
```

---

## 💻 Quick Start Guide

### Option A: Run Streamlit Frontend (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harsh-gupta9555/KnowledgeAI-Frontend.git
   cd KnowledgeAI-Frontend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Launch the application:**
   ```bash
   streamlit run app.py
   ```
   Open [http://localhost:8501](http://localhost:8501) in your browser.

---

### Option B: Run Next.js Frontend

1. **Navigate to the Next.js directory:**
   ```bash
   cd nextjs-version
   ```

2. **Install Node packages:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Color Palette & Typography

- **Background**: `#0F131D` (Obsidian Dark)
- **Primary / Brand**: `#ADC6FF` / `#4D8EFF`
- **Tertiary / Cyan Accent**: `#4CD7F6`
- **Secondary / Violet**: `#C0C1FF` / `#3131C0`
- **Success / Emerald**: `#34D399`
- **Fonts**: `Plus Jakarta Sans` (Headings), `Inter` (Body text), `JetBrains Mono` (Code & Metadata)

---

## 📄 License
MIT License. Built with ❤️ for enterprise AI intelligence and RAG observability.
