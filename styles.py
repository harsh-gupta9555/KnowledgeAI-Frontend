"""
Obsidian Synthetics Design System Theme for KnowledgeAI Streamlit App
Faithfully extracted from Stitch Project 8061712245908356325
Luxurious, professional Dark Mode SaaS with Single-Row Sticky Top Navigation Bar
"""

CUSTOM_CSS = """
<style>
/* Import Google Fonts and Material Symbols */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

:root {
  --surface: #0f131d;
  --surface-low: #171b26;
  --surface-container: #1c1f2a;
  --surface-high: #262a35;
  --surface-highest: #313540;
  --surface-lowest: #0a0e18;
  --surface-bright: #353944;
  --on-surface: #dfe2f1;
  --on-surface-variant: #c2c6d6;
  --primary: #adc6ff;
  --primary-container: #4d8eff;
  --on-primary: #002e6a;
  --on-primary-container: #00285d;
  --secondary: #c0c1ff;
  --secondary-container: #3131c0;
  --tertiary: #4cd7f6;
  --tertiary-container: #009eb9;
  --on-tertiary: #003640;
  --outline: #8c909f;
  --outline-variant: #424754;
  --error: #ffb4ab;
  --error-container: #93000a;
}

/* Base Global Styles */
html, body, [data-testid="stAppViewContainer"], .stApp {
  background-color: #0f131d !important;
  color: #dfe2f1 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Make Streamlit Default Top Header Invisible & Minimal */
[data-testid="stHeader"] {
  background: transparent !important;
  height: 0px !important;
  min-height: 0px !important;
  padding: 0 !important;
  display: none !important;
}

[data-testid="stMainBlockContainer"] {
  padding-top: 0.5rem !important;
  padding-bottom: 3rem !important;
  max-width: 1440px !important;
}

/* Custom Scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #0f131d;
}
::-webkit-scrollbar-thumb {
  background: #262a35;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #353944;
}

/* Material Symbols Font Rule */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined' !important;
  font-weight: normal;
  font-style: normal;
  font-size: 20px;
  line-height: 1;
  display: inline-block;
  vertical-align: middle;
}

/* =========================================================================
   STICKY TOP NAVIGATION BAR (ABOVE SECTION - STRICTLY SINGLE ROW, NO SCROLLBAR)
   ========================================================================= */
.top-nav-bar {
  position: sticky;
  top: 0;
  z-index: 99999;
  width: 100%;
  box-sizing: border-box;
  background: rgba(15, 19, 29, 0.96);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 14px;
  padding: 8px 16px;
  margin-bottom: 22px;
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 12px;
  flex-wrap: nowrap !important;
  overflow: visible !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55);
}

.top-nav-bar, .top-nav-center, .top-nav-left, .top-nav-right {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
.top-nav-bar::-webkit-scrollbar,
.top-nav-center::-webkit-scrollbar,
.top-nav-left::-webkit-scrollbar,
.top-nav-right::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.top-nav-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none !important;
  cursor: pointer;
  white-space: nowrap;
}

.brand-logo-box {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #4d8eff 0%, #4cd7f6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(77, 142, 255, 0.4);
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #dfe2f1;
  letter-spacing: -0.02em;
  line-height: 1.1;
  white-space: nowrap;
}

.brand-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  color: #4cd7f6;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Center Menu Tabs: Single Row, No Scrollbar */
.top-nav-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
  background: #131926;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 9999px;
  padding: 3px 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.35);
  flex-wrap: nowrap !important;
  overflow: visible !important;
}

.nav-tab {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border-radius: 9999px;
  color: #c2c6d6 !important;
  font-family: 'Inter', sans-serif;
  font-size: 0.79rem;
  font-weight: 500;
  text-decoration: none !important;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap !important;
  flex-shrink: 0;
}

.nav-tab:hover {
  color: #ffffff !important;
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.nav-tab.active {
  background: linear-gradient(135deg, rgba(77, 142, 255, 0.35) 0%, rgba(76, 215, 246, 0.25) 100%) !important;
  border: 1px solid rgba(77, 142, 255, 0.7) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
  box-shadow: 0 0 14px rgba(77, 142, 255, 0.35) !important;
}

.nav-tab-icon {
  font-size: 15px !important;
  opacity: 0.9;
}

/* Right Status & Controls */
.top-nav-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: nowrap !important;
}

.engine-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #171b26;
  border: 1px solid rgba(76, 215, 246, 0.25);
  border-radius: 8px;
  padding: 4px 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: #c2c6d6;
  white-space: nowrap;
}

.search-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #171b26;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 8px;
  padding: 4px 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  color: #8c909f;
  white-space: nowrap;
}

.icon-circle {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #171b26;
  border: 1px solid rgba(148, 163, 184, 0.16);
  color: #c2c6d6;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
}

.alert-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4d8eff;
  box-shadow: 0 0 6px #4d8eff;
}

.user-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #171b26;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 9999px;
  padding: 3px 10px 3px 4px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

.user-avatar-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #adc6ff;
  color: #002e6a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}

.user-name-text {
  font-size: 0.76rem;
  font-weight: 600;
  color: #dfe2f1;
}

/* =========================================================================
   CARDS, METRICS & VISUAL DESIGN TOKENS
   ========================================================================= */
.obsidian-card {
  background: #171b26;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 14px;
  padding: 22px;
  margin-bottom: 18px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.28);
  transition: all 0.2s ease;
}
.obsidian-card:hover {
  background: #1c1f2a;
  border-color: rgba(77, 142, 255, 0.35);
}

.metric-kpi-card {
  background: #171b26;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  height: 100%;
}
.metric-kpi-card:hover {
  background: #1c1f2a;
  border-color: rgba(76, 215, 246, 0.3);
  transform: translateY(-1px);
}

.obsidian-hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(38, 42, 53, 0.8);
  border: 1px solid rgba(76, 215, 246, 0.3);
  border-radius: 9999px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: #4cd7f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 14px;
}

.hero-title {
  font-family: 'Plus Jakarta Sans', sans-serif !important;
  font-size: 2.8rem !important;
  font-weight: 700 !important;
  line-height: 1.15 !important;
  letter-spacing: -0.03em !important;
  color: #dfe2f1;
  margin-bottom: 14px;
}

.hero-gradient-text {
  background: linear-gradient(90deg, #adc6ff 0%, #4cd7f6 45%, #c0c1ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.citation-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #171b26;
  border: 1px solid rgba(76, 215, 246, 0.3);
  border-radius: 6px;
  padding: 3px 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: #4cd7f6;
}

.citation-chip-purple {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #171b26;
  border: 1px solid rgba(192, 193, 255, 0.3);
  border-radius: 6px;
  padding: 3px 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: #c0c1ff;
}

.citation-chip-green {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #171b26;
  border: 1px solid rgba(52, 211, 153, 0.3);
  border-radius: 6px;
  padding: 3px 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  color: #34d399;
}

.code-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: #8c909f;
  letter-spacing: 0.05em;
}

/* Stitch Table Styling */
.stitch-table-wrapper {
  background: #171b26;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 12px;
  overflow: hidden;
  margin-top: 14px;
}

.stitch-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
  text-align: left;
}

.stitch-table th {
  background: #131926;
  padding: 12px 16px;
  color: #8c909f;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.stitch-table td {
  padding: 14px 16px;
  color: #dfe2f1;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
  vertical-align: middle;
}

.stitch-table tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.stitch-table tr:last-child td {
  border-bottom: none;
}

/* Buttons and Inputs */
button[data-testid="baseButton-secondary"],
button[data-testid="baseButton-primary"] {
  border-radius: 10px !important;
  font-family: 'Inter', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.85rem !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

button[data-testid="baseButton-primary"] {
  background: linear-gradient(135deg, #4d8eff 0%, #3131c0 100%) !important;
  border: 1px solid rgba(77, 142, 255, 0.6) !important;
  color: #ffffff !important;
  box-shadow: 0 4px 16px rgba(77, 142, 255, 0.35) !important;
}
button[data-testid="baseButton-primary"]:hover {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%) !important;
  transform: translateY(-1px) !important;
}

button[data-testid="baseButton-secondary"] {
  background: #1c1f2a !important;
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  color: #dfe2f1 !important;
}
button[data-testid="baseButton-secondary"]:hover {
  background: #262a35 !important;
  border-color: rgba(76, 215, 246, 0.4) !important;
  color: #ffffff !important;
}

[data-testid="stTextInput"] input,
[data-testid="stChatInput"] textarea {
  background-color: #171b26 !important;
  border: 1px solid rgba(148, 163, 184, 0.2) !important;
  border-radius: 10px !important;
  color: #dfe2f1 !important;
  font-family: 'Inter', sans-serif !important;
}
[data-testid="stTextInput"] input:focus,
[data-testid="stChatInput"] textarea:focus {
  border-color: #4cd7f6 !important;
  box-shadow: 0 0 0 1px #4cd7f6 !important;
}
</style>
"""
