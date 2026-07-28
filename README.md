# 🚨 RoadGuard AI — Next-Gen Road Safety & Emergency Response Mesh

> **Hackathon Production Release Edition** | *Saving Lives in the Critical Golden Hour*

RoadGuard is an AI-powered, full-stack emergency response and volunteer mesh platform designed to eliminate preventable traffic fatalities. By orchestrating instant 1-tap SOS alerts, geofenced Good Samaritan responder dispatch, Gemini AI multimodal accident triage, live trauma bed telemetry, and predictive blackspot forecasting, RoadGuard brings first-aid response time down to under 8 minutes.

---

## ⚡ Core Features

- 🚨 **Instant SOS Emergency Dispatch**: 1-tap & voice-triggered distress signal broadcasting precise GPS coordinates to nearby CPR/BLS certified volunteers, ambulances, and police.
- 🧠 **Gemini AI Triage & Blackspot Predictor**: Real-time voice & visual accident injury analysis using Google Gemini models, paired with predictive machine learning for highway crash hot-spots.
- 🤝 **Good Samaritan Volunteer Mesh**: Geofenced alerts for certified volunteers within 1km radius, backed by Good Samaritan legal protection, digital credentials, and reward tokens.
- 🏥 **Trauma Hospital Readiness Telemetry**: Live tracking of available ICU beds, trauma beds, ventilators, and O-negative blood units to prevent ambulance diversion.
- 🎓 **Gamified Training Academy**: Interactive micro-courses on CPR, AED usage, bleeding control, and trauma scene management with instant verifiable certification badges.
- 📊 **Executive Telemetry & Admin Panel**: Real-time municipal dashboard displaying incident heatmaps, average response times, active volunteer density, and blackspot intervention reports.
- ⚡ **Hackathon Demo & Pitch Mode**: Dedicated toggleable demo mode with preloaded datasets and an interactive presentation view (`/presentation`) for judges.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite, TypeScript |
| **Styling & UI** | Tailwind CSS v4, Glassmorphism, Custom Theme Tokens |
| **Animations** | Framer Motion |
| **Icons & Visuals** | Lucide React |
| **AI Engine** | Google Gemini API (`@google/genai`) |
| **Authentication & Database** | Firebase Auth, Cloud Firestore (Optional / Demo Mode) |
| **Maps & Geolocation** | Leaflet / OpenStreetMap / Google Maps Platform |
| **PWA & Offline** | Service Workers, Web Push Notifications, Offline Local Cache |

---

## 📁 Project Folder Structure

```
roadguard-app/
├── public/                     # Static assets & PWA icons
├── src/
│   ├── components/
│   │   ├── admin/             # Admin telemetry & blackspot management
│   │   ├── ai/                # Gemini assistant & predictive triage
│   │   ├── auth/              # Auth forms & ProtectedRoute guards
│   │   ├── community/         # Volunteer mesh & community chat
│   │   ├── dashboard/         # Live metrics, emergency contacts, quick actions
│   │   ├── landing/           # Hero, feature grid, testimonials, statistics
│   │   ├── layout/            # Glass Navbar, Footer, App Shell
│   │   ├── map/               # Interactive emergency & trauma map
│   │   ├── pwa/               # Offline banner, PWA prompt, push simulator
│   │   ├── samaritan/         # Good Samaritan legal shield & token rewards
│   │   ├── sos/               # SOS trigger, live countdown & voice channel
│   │   ├── training/          # Micro-courses, CPR guides, quiz modules
│   │   └── ui/                # DemoModeBar, LoadingScreen, Skeleton UI, Toasts
│   ├── context/
│   │   ├── AuthContext.tsx    # Firebase / Mock User authentication
│   │   ├── DemoContext.tsx    # Hackathon Demo Mode & preloaded data
│   │   └── ThemeContext.tsx   # Light / Dark mode state
│   ├── data/                  # Map services, blackspot & training data
│   ├── pages/                 # Route entry pages (Home, SOS, Admin, Presentation, etc.)
│   ├── services/              # Gemini AI API client & Firebase services
│   ├── types.ts               # Core TypeScript interface definitions
│   ├── App.tsx                # React Router v6 tree with Suspense
│   └── main.tsx               # App entry point
├── .env.example               # Template environment configuration
├── firebase.json              # Firebase Hosting configuration
├── netlify.toml               # Netlify SPA routing rules
├── vercel.json                # Vercel deployment configuration
├── DOCUMENTATION.md           # System Architecture & Flow Diagrams
└── README.md                  # Project documentation
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-org/roadguard.git
cd roadguard
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your credentials:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
VITE_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="YOUR_PROJECT.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
```

### 3. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Mode & Presentation Mode

RoadGuard includes built-in **Hackathon Demo Mode**:
- Click **"Demo Controls"** floating badge at bottom-right or toggle **Demo Mode** in the header.
- Instantly populates simulated incidents, trauma bed status, volunteer mesh alerts, and AI responses.
- Navigate to `/presentation` or click **"Pitch Mode"** for an interactive deck showcasing Problem, Golden Hour Statistics, Architecture, SOS Simulation, and Future Scope.

---

## 🌐 Deployment Configuration

### Vercel
Configuration file `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Netlify
Configuration file `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

---

## 📜 Documentation

Full technical architecture, database schema, emergency dispatch flows, and component hierarchy are available in [`DOCUMENTATION.md`](./DOCUMENTATION.md).

---

## 📄 License & Legal Notice

This project is released under the **Apache-2.0 License**.

*Disclaimer: Good Samaritan legal protection features align with National Road Safety Guidelines protecting bystanders rendering assistance in good faith.*
