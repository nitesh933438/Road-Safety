/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomToaster } from './components/ui/CustomToaster';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { DemoProvider } from './context/DemoContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminRoute } from './components/auth/AdminRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { OfflineBanner } from './components/pwa/OfflineBanner';
import { InstallPrompt } from './components/pwa/InstallPrompt';
import { PushNotificationSimulator } from './components/pwa/PushNotificationSimulator';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { DemoModeBar } from './components/ui/DemoModeBar';

// Eagerly load critical pages
import { Home } from './pages/Home';
import { SosEmergencyPage } from './pages/SosEmergencyPage';

// Lazy load non-critical pages
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const AiAssistantPage = lazy(() => import('./pages/AiAssistantPage').then(module => ({ default: module.AiAssistantPage })));
const SmartEmergencyMapPage = lazy(() => import('./pages/SmartEmergencyMapPage').then(module => ({ default: module.SmartEmergencyMapPage })));
const TrainingAcademyPage = lazy(() => import('./pages/TrainingAcademyPage').then(module => ({ default: module.TrainingAcademyPage })));
const GoodSamaritanHubPage = lazy(() => import('./pages/GoodSamaritanHubPage').then(module => ({ default: module.GoodSamaritanHubPage })));
const SystemSpecs = lazy(() => import('./pages/SystemSpecs').then(module => ({ default: module.SystemSpecs })));
const AboutHackathon = lazy(() => import('./pages/AboutHackathon').then(module => ({ default: module.AboutHackathon })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const LoginPage = lazy(() => import('./pages/auth/Login').then(module => ({ default: module.LoginPage })));
const SignupPage = lazy(() => import('./pages/auth/Signup').then(module => ({ default: module.SignupPage })));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPassword').then(module => ({ default: module.ForgotPasswordPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const CommunityNetworkPage = lazy(() => import('./pages/CommunityNetworkPage').then(module => ({ default: module.CommunityNetworkPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(module => ({ default: module.AdminDashboardPage })));
const AccessDeniedPage = lazy(() => import('./pages/AccessDeniedPage').then(module => ({ default: module.AccessDeniedPage })));
const AiPredictionPage = lazy(() => import('./pages/AiPredictionPage').then(module => ({ default: module.AiPredictionPage })));
const AiSafeRoutePage = lazy(() => import('./pages/AiSafeRoutePage').then(module => ({ default: module.AiSafeRoutePage })));
const SmartRiskLayerPage = lazy(() => import('./pages/SmartRiskLayerPage').then(module => ({ default: module.SmartRiskLayerPage })));
const EmergencyReportingPage = lazy(() => import('./pages/EmergencyReportingPage').then(module => ({ default: module.EmergencyReportingPage })));
const EmergencyCommandCenterPage = lazy(() => import('./pages/EmergencyCommandCenterPage').then(module => ({ default: module.EmergencyCommandCenterPage })));
const RoadHazardPage = lazy(() => import('./pages/RoadHazardPage').then(module => ({ default: module.RoadHazardPage })));
const DrivingGuardianPage = lazy(() => import('./pages/DrivingGuardianPage').then(module => ({ default: module.DrivingGuardianPage })));
const PresentationModePage = lazy(() => import('./pages/PresentationModePage').then(module => ({ default: module.PresentationModePage })));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage').then(module => ({ default: module.NotificationsPage })));

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <DemoProvider>
              <BrowserRouter>
              <CustomToaster />
              <OfflineBanner />
              <InstallPrompt />
              <PushNotificationSimulator />
              <DemoModeBar />
              <Layout>
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    
                    <Route path="/sos" element={<SosEmergencyPage />} />
                    <Route path="/guardian" element={<DrivingGuardianPage />} />
                    <Route path="/command-center" element={<EmergencyCommandCenterPage />} />
                    <Route path="/hazards" element={<RoadHazardPage />} />
                    <Route path="/emergency-report" element={<EmergencyReportingPage />} />
                    <Route path="/safe-route" element={<AiSafeRoutePage />} />
                    <Route path="/risk-layer" element={<SmartRiskLayerPage />} />
                    <Route path="/ai-assistant" element={<AiAssistantPage />} />
                    <Route path="/ai-prediction" element={<AiPredictionPage />} />
                    <Route path="/map" element={<SmartEmergencyMapPage />} />
                    <Route path="/training" element={<TrainingAcademyPage />} />
                    <Route path="/samaritan" element={<GoodSamaritanHubPage />} />
                    <Route path="/community" element={<CommunityNetworkPage />} />
                    <Route path="/access-denied" element={<AccessDeniedPage />} />
                    <Route path="/specs" element={<SystemSpecs />} />
                    <Route path="/about" element={<AboutHackathon />} />
                    <Route path="/presentation" element={<PresentationModePage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    
                    {/* Admin Protected Route */}
                    <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />

                    {/* Protected User Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </DemoProvider>
        </NotificationProvider>
      </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

