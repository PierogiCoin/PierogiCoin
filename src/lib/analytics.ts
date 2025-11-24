/**
 * Comprehensive Analytics Tracking
 * Wszystkie eventy dla Google Analytics / GTM
 */

// Extend window.dataLayer type
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * Helper do bezpiecznego pushowania do dataLayer
 */
const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
    console.log('📊 Analytics Event:', data);
  }
};

// ==================== PAGE VIEWS ====================

/**
 * Śledzenie wyświetlenia strony (SPA routing)
 */
export const trackPageView = (path: string, title?: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

// ==================== SEKCJE (SCROLL) ====================

/**
 * Śledzenie wejścia w sekcję
 */
export const trackSectionView = (sectionName: string, sectionId: string) => {
  pushToDataLayer({
    event: 'section_view',
    section_name: sectionName,
    section_id: sectionId,
    scroll_depth: Math.round((window.scrollY / document.documentElement.scrollHeight) * 100),
  });
};

/**
 * Śledzenie głębokości scrollowania
 */
export const trackScrollDepth = (percentage: number) => {
  pushToDataLayer({
    event: 'scroll_depth',
    scroll_percentage: percentage,
    page_path: window.location.pathname,
  });
};

// ==================== INTERAKCJE ====================

/**
 * Kliknięcie w przycisk CTA
 */
export const trackCTAClick = (
  ctaText: string,
  ctaLocation: string,
  ctaDestination?: string
) => {
  pushToDataLayer({
    event: 'cta_click',
    cta_text: ctaText,
    cta_location: ctaLocation,
    cta_destination: ctaDestination,
  });
};

/**
 * Kliknięcie w link nawigacji
 */
export const trackNavigationClick = (linkText: string, linkDestination: string) => {
  pushToDataLayer({
    event: 'navigation_click',
    link_text: linkText,
    link_destination: linkDestination,
  });
};

/**
 * Kliknięcie w social media
 */
export const trackSocialClick = (platform: string, action: string, location: string) => {
  pushToDataLayer({
    event: 'social_click',
    social_platform: platform,
    social_action: action,
    social_location: location,
  });
};

// ==================== TELEFON & KONTAKT ====================

/**
 * Kliknięcie w numer telefonu
 */
export const trackPhoneClick = (phoneNumber: string, location: string) => {
  pushToDataLayer({
    event: 'phone_click',
    phone_number: phoneNumber,
    phone_location: location,
  });
};

/**
 * Kliknięcie w email
 */
export const trackEmailClick = (email: string, location: string) => {
  pushToDataLayer({
    event: 'email_click',
    email_address: email,
    email_location: location,
  });
};

// ==================== FORMULARZE ====================

/**
 * Rozpoczęcie wypełniania formularza
 */
export const trackFormStart = (formName: string, formLocation: string) => {
  pushToDataLayer({
    event: 'form_start',
    form_name: formName,
    form_location: formLocation,
  });
};

/**
 * Wysłanie formularza
 */
export const trackFormSubmit = (
  formName: string,
  formLocation: string,
  formData?: Record<string, any>
) => {
  pushToDataLayer({
    event: 'form_submission',
    form_name: formName,
    form_location: formLocation,
    ...formData,
  });
};

/**
 * Błąd formularza
 */
export const trackFormError = (
  formName: string,
  errorField: string,
  errorMessage: string
) => {
  pushToDataLayer({
    event: 'form_error',
    form_name: formName,
    error_field: errorField,
    error_message: errorMessage,
  });
};

// ==================== KALKULATOR CENY ====================

/**
 * Rozpoczęcie kalkulatora
 */
export const trackCalculatorStart = () => {
  pushToDataLayer({
    event: 'calculator_start',
  });
};

/**
 * Zmiana opcji w kalkulatorze
 */
export const trackCalculatorStep = (step: number, selections: Record<string, any>) => {
  pushToDataLayer({
    event: 'calculator_step',
    calculator_step: step,
    selections: selections,
  });
};

/**
 * Ukończenie kalkulatora
 */
export const trackCalculatorComplete = (
  totalPrice: number,
  selectedOptions: Record<string, any>
) => {
  pushToDataLayer({
    event: 'calculator_complete',
    calculator_value: totalPrice,
    calculator_currency: 'PLN',
    selected_options: selectedOptions,
  });
};

// ==================== PORTFOLIO ====================

/**
 * Kliknięcie w projekt w portfolio
 */
export const trackPortfolioClick = (
  projectName: string,
  projectId: string,
  projectCategory?: string
) => {
  pushToDataLayer({
    event: 'portfolio_click',
    project_name: projectName,
    project_id: projectId,
    project_category: projectCategory,
  });
};

/**
 * Wyświetlenie szczegółów projektu
 */
export const trackPortfolioView = (projectName: string, projectId: string) => {
  pushToDataLayer({
    event: 'portfolio_view',
    project_name: projectName,
    project_id: projectId,
  });
};

/**
 * Kliknięcie w "Zobacz na żywo" / "Zobacz kod"
 */
export const trackPortfolioAction = (
  action: 'view_live' | 'view_code',
  projectName: string
) => {
  pushToDataLayer({
    event: 'portfolio_action',
    action_type: action,
    project_name: projectName,
  });
};

// ==================== VIDEO / MEDIA ====================

/**
 * Odtworzenie video
 */
export const trackVideoPlay = (videoName: string, videoLocation: string) => {
  pushToDataLayer({
    event: 'video_play',
    video_name: videoName,
    video_location: videoLocation,
  });
};

/**
 * Pauza video
 */
export const trackVideoPause = (
  videoName: string,
  videoProgress: number
) => {
  pushToDataLayer({
    event: 'video_pause',
    video_name: videoName,
    video_progress: videoProgress,
  });
};

/**
 * Ukończenie video
 */
export const trackVideoComplete = (videoName: string, videoDuration: number) => {
  pushToDataLayer({
    event: 'video_complete',
    video_name: videoName,
    video_duration: videoDuration,
  });
};

// ==================== SEARCH / FILTER ====================

/**
 * Wyszukiwanie
 */
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  pushToDataLayer({
    event: 'search',
    search_term: searchTerm,
    search_results: resultsCount,
  });
};

/**
 * Filtrowanie
 */
export const trackFilter = (filterType: string, filterValue: string) => {
  pushToDataLayer({
    event: 'filter_apply',
    filter_type: filterType,
    filter_value: filterValue,
  });
};

// ==================== DOWNLOAD ====================

/**
 * Pobranie pliku (PDF, etc.)
 */
export const trackDownload = (fileName: string, fileType: string, fileLocation: string) => {
  pushToDataLayer({
    event: 'file_download',
    file_name: fileName,
    file_type: fileType,
    file_location: fileLocation,
  });
};

// ==================== ENGAGEMENT ====================

/**
 * Czas spędzony na stronie
 */
export const trackTimeOnPage = (seconds: number) => {
  pushToDataLayer({
    event: 'time_on_page',
    time_seconds: seconds,
    time_minutes: Math.round(seconds / 60),
  });
};

/**
 * Opuszczenie strony (bounce)
 */
export const trackBounce = (timeBeforeBounce: number) => {
  pushToDataLayer({
    event: 'bounce',
    time_before_bounce: timeBeforeBounce,
  });
};

/**
 * Powrót na stronę
 */
export const trackReturn = (daysSinceLastVisit?: number) => {
  pushToDataLayer({
    event: 'return_visit',
    days_since_last_visit: daysSinceLastVisit,
  });
};

// ==================== ERRORS ====================

/**
 * Błąd JavaScript
 */
export const trackError = (errorMessage: string, errorStack?: string) => {
  pushToDataLayer({
    event: 'javascript_error',
    error_message: errorMessage,
    error_stack: errorStack,
    page_path: window.location.pathname,
  });
};

/**
 * Błąd 404
 */
export const track404 = (attemptedUrl: string, referrer?: string) => {
  pushToDataLayer({
    event: 'page_not_found',
    attempted_url: attemptedUrl,
    referrer: referrer || document.referrer,
  });
};

// ==================== CONVERSIONS ====================

/**
 * Konwersja - Lead (wygenerowana wycena)
 */
export const trackLead = (
  leadValue: number,
  leadSource: string,
  leadData?: Record<string, any>
) => {
  pushToDataLayer({
    event: 'generate_lead',
    value: leadValue,
    currency: 'PLN',
    lead_source: leadSource,
    ...leadData,
  });
};

/**
 * Konwersja - Zapytanie ofertowe
 */
export const trackQuoteRequest = (
  projectType: string,
  estimatedValue: number,
  contactMethod: string
) => {
  pushToDataLayer({
    event: 'quote_request',
    project_type: projectType,
    estimated_value: estimatedValue,
    currency: 'PLN',
    contact_method: contactMethod,
  });
};

/**
 * Konwersja główna
 */
export const trackConversion = (
  conversionType: string,
  conversionValue: number,
  conversionData?: Record<string, any>
) => {
  pushToDataLayer({
    event: 'conversion',
    conversion_type: conversionType,
    value: conversionValue,
    currency: 'PLN',
    ...conversionData,
  });
};

// ==================== USER BEHAVIOR ====================

/**
 * Zmiana motywu (light/dark)
 */
export const trackThemeChange = (newTheme: string) => {
  pushToDataLayer({
    event: 'theme_change',
    theme: newTheme,
  });
};

/**
 * Zmiana języka
 */
export const trackLanguageChange = (newLanguage: string) => {
  pushToDataLayer({
    event: 'language_change',
    language: newLanguage,
  });
};

/**
 * Kliknięcie w "Back to top"
 */
export const trackBackToTop = (scrollPosition: number) => {
  pushToDataLayer({
    event: 'back_to_top',
    scroll_position: scrollPosition,
  });
};

// ==================== OUTBOUND LINKS ====================

/**
 * Kliknięcie w link zewnętrzny
 */
export const trackOutboundLink = (url: string, linkText: string) => {
  pushToDataLayer({
    event: 'outbound_link',
    link_url: url,
    link_text: linkText,
  });
};

// ==================== SHARE ====================

/**
 * Udostępnianie strony
 */
export const trackShare = (platform: string, contentType: string, contentId?: string) => {
  pushToDataLayer({
    event: 'share',
    share_platform: platform,
    content_type: contentType,
    content_id: contentId,
  });
};

// ==================== COOKIE CONSENT ====================

/**
 * Zgoda na cookies
 */
export const trackCookieConsent = (
  consentType: 'accept_all' | 'reject_all' | 'custom',
  preferences?: Record<string, boolean>
) => {
  pushToDataLayer({
    event: 'cookie_consent',
    consent_type: consentType,
    consent_preferences: preferences,
  });
};
