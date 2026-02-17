// Google Analytics 4 integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) return;

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll track manually
  });
};

export const trackPageView = (path: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag('event', eventName, params);
};

// Pre-defined events
export const analytics = {
  signupComplete: () => trackEvent('sign_up'),
  loginComplete: () => trackEvent('login'),
  lessonStart: (lessonId: string, duration: number) => 
    trackEvent('lesson_start', { lesson_id: lessonId, duration }),
  lessonComplete: (lessonId: string, score: number) => 
    trackEvent('lesson_complete', { lesson_id: lessonId, score }),
  exerciseSubmit: (exerciseId: string) => 
    trackEvent('exercise_submit', { exercise_id: exerciseId }),
  recordingUsed: () => trackEvent('recording_used'),
  subscriptionPurchase: (plan: string, amount: number) =>
    trackEvent('purchase', { currency: 'BRL', value: amount, items: [{ item_name: plan }] }),
  bookmarkItem: (itemType: string) => trackEvent('bookmark_item', { item_type: itemType }),
  onboardingComplete: () => trackEvent('onboarding_complete'),
};
