/**
 * Calculator Storage - localStorage management for calculator selections
 * Remembers user's calculator configuration and shows reminder
 */

export interface CalculatorSelection {
  type: string;
  design: string;
  features: string[];
  deadline: string;
}

export interface SavedCalculation {
  selections: CalculatorSelection;
  price: number;
  timestamp: number;
  emailSent?: boolean;
}

const STORAGE_KEY = 'lykkreacji_calculator_data';
const EXPIRY_DAYS = 7; // Pamiętaj przez 7 dni

/**
 * Save calculator configuration to localStorage
 */
export function saveCalculatorData(
  selections: CalculatorSelection,
  price: number,
  emailSent: boolean = false
): void {
  if (typeof window === 'undefined') return;

  const data: SavedCalculation = {
    selections,
    price,
    timestamp: Date.now(),
    emailSent,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save calculator data:', error);
  }
}

/**
 * Get saved calculator data from localStorage
 * Returns null if expired or not found
 */
export function getSavedCalculatorData(): SavedCalculation | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    const parsed: SavedCalculation = JSON.parse(data);

    // Check if expired (older than 7 days)
    const daysSinceCreation = (Date.now() - parsed.timestamp) / (1000 * 60 * 60 * 24);
    if (daysSinceCreation > EXPIRY_DAYS) {
      clearCalculatorData();
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Failed to get calculator data:', error);
    return null;
  }
}

/**
 * Clear saved calculator data
 */
export function clearCalculatorData(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear calculator data:', error);
  }
}

/**
 * Update email sent status
 */
export function markEmailAsSent(): void {
  const saved = getSavedCalculatorData();
  if (!saved) return;

  saveCalculatorData(saved.selections, saved.price, true);
}

/**
 * Check if user has saved calculation
 */
export function hasSavedCalculation(): boolean {
  return getSavedCalculatorData() !== null;
}

/**
 * Get time since last calculation in hours
 */
export function getTimeSinceCalculation(): number | null {
  const saved = getSavedCalculatorData();
  if (!saved) return null;

  return (Date.now() - saved.timestamp) / (1000 * 60 * 60);
}

/**
 * Format price to PLN currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get human-readable time since calculation
 */
export function getTimeSinceText(): string {
  const hours = getTimeSinceCalculation();
  if (hours === null) return '';

  if (hours < 1) return 'kilka minut temu';
  if (hours < 24) return `${Math.floor(hours)} godz. temu`;
  
  const days = Math.floor(hours / 24);
  if (days === 1) return 'wczoraj';
  if (days < 7) return `${days} dni temu`;
  
  return 'ponad tydzień temu';
}
