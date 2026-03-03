import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CookieConsent from "./components/CookieConsent";
import { initGA, trackPageView } from "./services/analyticsService";
import AuthGuard from "./components/AuthGuard";

// Eagerly load critical route
import Index from "./pages/Index";

// Lazy load non-critical routes
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Exercise = lazy(() => import("./pages/Exercise"));
const Profile = lazy(() => import("./pages/Profile"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Signup = lazy(() => import("./pages/Signup"));
const Library = lazy(() => import("./pages/Library"));
const EmailPreferences = lazy(() => import("./pages/EmailPreferences"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const FAQ = lazy(() => import("./pages/FAQ"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Subscription = lazy(() => import("./pages/Subscription"));
const Diagnostic = lazy(() => import("./pages/Diagnostic"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-full max-w-md space-y-4 p-8">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  </div>
);

// Track page views
const PageTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
};

const App = () => {
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'accepted') {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTracker />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/diagnostico" element={<Diagnostic />} />

              {/* Protected routes (require auth + email verification) */}
              <Route path="/onboarding" element={<AuthGuard><Onboarding /></AuthGuard>} />
              <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
              <Route path="/exercise" element={<AuthGuard><Exercise /></AuthGuard>} />
              <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
              <Route path="/library" element={<AuthGuard><Library /></AuthGuard>} />
              <Route path="/email-preferences" element={<AuthGuard><EmailPreferences /></AuthGuard>} />
              <Route path="/dashboard/assinatura" element={<AuthGuard><Subscription /></AuthGuard>} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
