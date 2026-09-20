/**
 * Google Analytics 4 tracking abstraction
 * Enables events tracking cleanly with graceful no-op if GA measurement ID is not configured
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export const initGA = () => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  // Dynamically inject gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
};

export const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  } else {
    // Development console debug log
    if (import.meta.env.DEV) {
      console.log(`[GA4 Event] ${eventName}:`, params);
    }
  }
};

export const trackPageView = (url, title) => {
  trackEvent('page_view', {
    page_location: url,
    page_title: title
  });
};
