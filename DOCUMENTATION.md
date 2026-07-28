# 📚 RoadGuard System Architecture & Technical Documentation

---

## 🏗️ 1. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT LAYER                                      |
|  React 18 + Vite + TypeScript | Tailwind CSS v4 | Framer Motion | Lucide Icons      |
+----------------------------------------+------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                              STATE & CONTEXT LAYER                                |
|  AuthContext (Firebase / Demo) | DemoContext (Simulated State) | ThemeContext     |
+----------------------------------------+------------------------------------------+
                                         |
               +-------------------------+-------------------------+
               |                                                   |
               v                                                   v
+------------------------------+                        +---------------------------+
|    AI & INTELLIGENCE SUITE   |                        |    STORAGE & TELEMETRY    |
|  Google Gemini API           |                        |  Firebase Auth & Firestore|
|  - Voice Triage Engine       |                        |  - Incident Logs          |
|  - Blackspot Predictor       |                        |  - Volunteer Registry     |
|  - First-Aid Copilot         |                        |  - Hospital Bed Telemetry |
+------------------------------+                        +---------------------------+
```

---

## 🌳 2. Component Tree

```
App
 ├── ErrorBoundary
 ├── ThemeProvider
 ├── AuthProvider
 └── DemoProvider
      └── BrowserRouter
           ├── Toaster
           ├── OfflineBanner
           ├── InstallPrompt
           ├── PushNotificationSimulator
           ├── DemoModeBar (Floating Controls)
           └── Layout
                ├── Navbar (Glassmorphism & Quick Links)
                ├── Suspense (LoadingScreen Skeleton)
                │    ├── Home
                │    │    ├── Hero
                │    │    ├── FeaturesSection
                │    │    ├── HowItWorks
                │    │    ├── LiveStatistics
                │    │    ├── Testimonials
                │    │    └── WhyChooseUs
                │    ├── Dashboard (Metrics, Quick Actions, Emergency Contacts)
                │    ├── SosEmergencyPage (1-Tap SOS, Voice Channel, Volunteer Ping)
                │    ├── SmartEmergencyMapPage (Services, Blackspots, Trauma Beds)
                │    ├── AiPredictionPage (Blackspot Heatmap & Risk Score)
                │    ├── AiAssistantPage (Multimodal Triage Chat)
                │    ├── TrainingAcademyPage (Micro-courses & Certification)
                │    ├── GoodSamaritanHubPage (Legal Shield & Token Rewards)
                │    ├── CommunityNetworkPage (Volunteer Rescue Directory)
                │    ├── AdminDashboardPage (Municipal Telemetry & Logs)
                │    ├── PresentationModePage (Pitch Deck View)
                │    ├── SystemSpecs
                │    └── AboutHackathon
                └── Footer
```

---

## 🔀 3. Routing Diagram

```
Public Routes:
  /                   --> Home Page
  /login              --> Login Page
  /signup             --> Signup Page
  /forgot-password    --> Password Recovery
  /sos                --> Emergency SOS Trigger
  /map                --> Live Emergency & Trauma Map
  /ai-assistant       --> First-Aid AI Triage Assistant
  /ai-prediction      --> Blackspot Predictive AI
  /training           --> Training & Certification Academy
  /samaritan          --> Good Samaritan Hub
  /community          --> Volunteer Rescue Network
  /admin              --> Admin Telemetry Dashboard
  /presentation       --> Hackathon Pitch Deck Mode
  /specs              --> Technical System Specifications
  /about              --> About Hackathon Project

Protected Routes (Requires Auth / Demo Mode):
  /dashboard          --> User Dashboard
  /profile            --> User Profile & Certifications
  /settings           --> Preferences & Emergency Contacts
```

---

## 🗄️ 4. Database Schema (Firestore / Cloud SQL Specification)

### Collections:

#### `users`
```typescript
interface UserDocument {
  uid: string;
  name: string;
  email: string;
  role: 'citizen' | 'volunteer' | 'paramedic' | 'admin';
  phone: string;
  bloodGroup: string;
  medicalInfo: string;
  rewardPoints: number;
  certifications: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  createdAt: Timestamp;
}
```

#### `incidents`
```typescript
interface IncidentDocument {
  id: string;
  callerUid: string;
  callerName: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Dispatched' | 'On Scene' | 'Transporting' | 'Resolved';
  assignedAmbulance: string;
  assignedHospitalId: string;
  aiTriageSummary: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### `hospitals`
```typescript
interface HospitalDocument {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  icuBedsAvailable: number;
  traumaBedsAvailable: number;
  ventilatorsAvailable: number;
  bloodUnits: Record<string, number>;
  contactPhone: string;
}
```

---

## 🔄 5. User & Emergency Flows

### 🚨 Emergency SOS Flow
```
User Presses SOS Button / Voice Trigger
  │
  ├─► Capture High-Precision GPS Coordinates
  ├─► Auto-Generate Gemini AI Triage Call Summary
  ├─► Broadcast Geofenced Push Alert to Volunteers (< 1km)
  ├─► Reserve Nearest Trauma ICU Bed & Dispatch ALS Ambulance
  └─► Send Instant SMS with Live Map Tracking Link to Emergency Contacts
```

### 🤝 Volunteer Mesh Response Flow
```
Push Notification Received on Volunteer Device
  │
  ├─► View Accident Severity, Distance & First-Aid Guide
  ├─► Accept Rescue Dispatch ("En Route")
  ├─► Turn-by-Turn GPS Navigation to Collision Site
  ├─► Render First-Aid / CPR until ALS Ambulance Arrives
  └─► Earn Good Samaritan Reward Tokens & Verifiable Badge
```

### 🔒 Authentication Flow
```
User Sign Up / Sign In
  │
  ├─► Firebase Auth / Demo Preloaded Session
  ├─► Fetch User Profile & Medical Card from Firestore / Local Context
  └─► Redirect to Protected Dashboard or SOS Screen
```
