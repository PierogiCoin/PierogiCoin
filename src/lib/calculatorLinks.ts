/**
 * Calculator Link Generator
 * Generuje shareable linki do różnych sekcji kalkulatora
 */

export type CalculatorType = 'ai' | 'simple' | 'choice';

export interface CalculatorLinkOptions {
  type?: CalculatorType;
  preselect?: {
    projectType?: string;
    design?: string;
    features?: string[];
    deadline?: string;
  };
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

/**
 * Generuje link do kalkulatora
 */
export function generateCalculatorLink(options: CalculatorLinkOptions = {}): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const params = new URLSearchParams();

  // Typ kalkulatora
  if (options.type) {
    params.set('calc', options.type);
  }

  // Preselekcja opcji
  if (options.preselect) {
    if (options.preselect.projectType) {
      params.set('type', options.preselect.projectType);
    }
    if (options.preselect.design) {
      params.set('design', options.preselect.design);
    }
    if (options.preselect.features && options.preselect.features.length > 0) {
      params.set('features', options.preselect.features.join(','));
    }
    if (options.preselect.deadline) {
      params.set('deadline', options.preselect.deadline);
    }
  }

  // UTM parameters
  if (options.utmSource) {
    params.set('utm_source', options.utmSource);
  }
  if (options.utmMedium) {
    params.set('utm_medium', options.utmMedium);
  }
  if (options.utmCampaign) {
    params.set('utm_campaign', options.utmCampaign);
  }

  const queryString = params.toString();
  const hash = '#kalkulator';
  
  return `${baseUrl}/${queryString ? `?${queryString}` : ''}${hash}`;
}

/**
 * Quick links do różnych wersji kalkulatora
 */
export const calculatorQuickLinks = {
  // Link do sekcji wyboru (AI vs Prosty)
  choice: () => generateCalculatorLink({ type: 'choice' }),
  
  // Link bezpośrednio do AI kalkulatora
  ai: () => generateCalculatorLink({ type: 'ai' }),
  
  // Link bezpośrednio do prostego kalkulatora
  simple: () => generateCalculatorLink({ type: 'simple' }),
  
  // Preselekcja: Landing Page
  landingPage: () => generateCalculatorLink({
    type: 'simple',
    preselect: {
      projectType: 'landing',
      design: 'custom',
      features: ['seo'],
      deadline: 'standard'
    }
  }),
  
  // Preselekcja: Strona Firmowa
  businessWebsite: () => generateCalculatorLink({
    type: 'simple',
    preselect: {
      projectType: 'website',
      design: 'custom',
      features: ['cms', 'seo'],
      deadline: 'standard'
    }
  }),
  
  // Preselekcja: E-commerce
  ecommerce: () => generateCalculatorLink({
    type: 'simple',
    preselect: {
      projectType: 'ecommerce',
      design: 'premium',
      features: ['cms', 'seo', 'payments'],
      deadline: 'standard'
    }
  }),
  
  // Preselekcja: Aplikacja Webowa
  webApp: () => generateCalculatorLink({
    type: 'simple',
    preselect: {
      projectType: 'app',
      design: 'premium',
      features: ['cms', 'multilang'],
      deadline: 'standard'
    }
  }),
};

/**
 * Parsuje parametry z URL i zwraca opcje kalkulatora
 */
export function parseCalculatorParams(): CalculatorLinkOptions | null {
  if (typeof window === 'undefined') return null;

  const searchParams = new URLSearchParams(window.location.search);
  const options: CalculatorLinkOptions = {};

  // Typ kalkulatora
  const calcType = searchParams.get('calc') as CalculatorType | null;
  if (calcType) {
    options.type = calcType;
  }

  // Preselekcja
  const type = searchParams.get('type');
  const design = searchParams.get('design');
  const features = searchParams.get('features');
  const deadline = searchParams.get('deadline');

  if (type || design || features || deadline) {
    options.preselect = {
      projectType: type || undefined,
      design: design || undefined,
      features: features ? features.split(',') : undefined,
      deadline: deadline || undefined,
    };
  }

  return Object.keys(options).length > 0 ? options : null;
}

/**
 * Hook do kopiowania linku do schowka
 */
export function copyCalculatorLink(link: string): Promise<boolean> {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return Promise.resolve(false);
  }

  return navigator.clipboard
    .writeText(link)
    .then(() => true)
    .catch(() => false);
}

/**
 * Formatuje link dla social media
 */
export function formatSocialLink(type: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp', calculatorLink: string, message?: string): string {
  const encodedLink = encodeURIComponent(calculatorLink);
  const encodedMessage = message ? encodeURIComponent(message) : '';

  switch (type) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
    
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedLink}${message ? `&text=${encodedMessage}` : ''}`;
    
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
    
    case 'whatsapp':
      return `https://wa.me/?text=${encodedMessage}%20${encodedLink}`;
    
    default:
      return calculatorLink;
  }
}
