import { z } from 'zod'

/**
 * Environment Variables Schema
 * Type-safe validation of all environment variables
 */

// Server-side environment variables
const serverSchema = z.object({
  // Required
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // AI Configuration (required for calculator)
  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required for AI calculator'),

  // Email Configuration (at least one required)
  RESEND_API_KEY: z.string().optional(),
  EMAIL_SERVER_USER: z.string().email().optional(),
  EMAIL_SERVER_PASSWORD: z.string().optional(),
  EMAIL_TO: z.string().email().optional(),

  // Vercel Blob (optional)
  BLOB_READ_WRITE_TOKEN: z.string().optional(),

  // Rate Limiting (optional - uses in-memory if not set)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  RATE_LIMIT_WHITELIST: z.string().optional(),
  RATE_LIMIT_BLACKLIST: z.string().optional(),

  // Admin
  ADMIN_SECRET: z.string().optional(),

  // Error tracking
  NEXT_PUBLIC_ERROR_ENDPOINT: z.string().url().optional(),
})

// Client-side environment variables (NEXT_PUBLIC_*)
const clientSchema = z.object({
  // EmailJS
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: z.string().optional(),
  NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID: z.string().optional(),
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: z.string().optional(),

  // Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),

  // API
  NEXT_PUBLIC_API_URL: z.string().url().optional(),

  // Error tracking
  NEXT_PUBLIC_ERROR_ENDPOINT: z.string().url().optional(),

  // Analytics endpoint
  NEXT_PUBLIC_ANALYTICS_ENDPOINT: z.string().url().optional(),
})

/**
 * Custom validation: At least one email service must be configured
 */
function validateEmailConfig(data: z.infer<typeof serverSchema>) {
  const hasResend = !!data.RESEND_API_KEY
  const hasGmail = !!(data.EMAIL_SERVER_USER && data.EMAIL_SERVER_PASSWORD)

  if (!hasResend && !hasGmail) {
    throw new Error(
      '❌ Email configuration error: Either RESEND_API_KEY or EMAIL_SERVER_USER + EMAIL_SERVER_PASSWORD must be set'
    )
  }

  return data
}

/**
 * Validate and parse server environment variables
 */
function validateServerEnv() {
  const parsed = serverSchema.safeParse(process.env)

  if (!parsed.success) {
    console.error('❌ Invalid server environment variables:')
    console.error(parsed.error.flatten().fieldErrors)
    throw new Error('Invalid server environment variables')
  }

  // Custom validation
  try {
    validateEmailConfig(parsed.data)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      throw error
    }
  }

  return parsed.data
}

/**
 * Validate and parse client environment variables
 */
function validateClientEnv() {
  const parsed = clientSchema.safeParse({
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ERROR_ENDPOINT: process.env.NEXT_PUBLIC_ERROR_ENDPOINT,
    NEXT_PUBLIC_ANALYTICS_ENDPOINT: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
  })

  if (!parsed.success) {
    console.error('❌ Invalid client environment variables:')
    console.error(parsed.error.flatten().fieldErrors)
    throw new Error('Invalid client environment variables')
  }

  return parsed.data
}

// Validate environment variables at module load
let serverEnv: z.infer<typeof serverSchema>
let clientEnv: z.infer<typeof clientSchema>

try {
  serverEnv = validateServerEnv()
  clientEnv = validateClientEnv()

  // Success message in development
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Environment variables validated successfully')
    
    // Show configuration status
    console.log('📋 Configuration status:')
    console.log(`  • AI (Gemini): ${serverEnv.GEMINI_API_KEY ? '✓' : '✗'}`)
    console.log(`  • Email (Resend): ${serverEnv.RESEND_API_KEY ? '✓' : '✗'}`)
    console.log(`  • Email (Gmail): ${serverEnv.EMAIL_SERVER_USER ? '✓' : '✗'}`)
    console.log(`  • Redis: ${serverEnv.UPSTASH_REDIS_REST_URL ? '✓' : '✗ (using in-memory)'}`)
    console.log(`  • EmailJS: ${clientEnv.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? '✓' : '✗'}`)
    console.log(`  • Analytics: ${clientEnv.NEXT_PUBLIC_GA_ID ? '✓' : '✗'}`)
  }
} catch (error) {
  if (process.env.NODE_ENV === 'production') {
    // In production, fail fast
    throw error
  } else {
    // In development, show warning but don't crash
    console.warn('⚠️ Environment validation failed (development mode)')
    console.warn('Some features may not work correctly')
    
    // Create empty objects to prevent crashes
    serverEnv = {} as z.infer<typeof serverSchema>
    clientEnv = {} as z.infer<typeof clientSchema>
  }
}

/**
 * Type-safe environment variables
 * Use these instead of process.env
 */
export const env = {
  ...serverEnv,
  ...clientEnv,
} as const

/**
 * Get environment variable with fallback
 */
export function getEnv<T>(key: keyof typeof env, fallback: T): T {
  const value = env[key]
  return (value || fallback) as T
}

/**
 * Check if environment variable is set
 */
export function hasEnv(key: keyof typeof env): boolean {
  return !!env[key]
}

/**
 * Get all required missing environment variables
 */
export function getMissingEnvVars(): string[] {
  const missing: string[] = []

  // Check required variables
  if (!env.GEMINI_API_KEY) missing.push('GEMINI_API_KEY')
  
  // Email (at least one method)
  if (!env.RESEND_API_KEY && !env.EMAIL_SERVER_USER) {
    missing.push('RESEND_API_KEY or EMAIL_SERVER_USER')
  }

  return missing
}

/**
 * Validate environment on app start
 */
export function validateEnv() {
  const missing = getMissingEnvVars()

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:')
    missing.forEach(key => console.error(`  • ${key}`))
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing required environment variables')
    }
  }
}

// Type exports for convenience
export type ServerEnv = z.infer<typeof serverSchema>
export type ClientEnv = z.infer<typeof clientSchema>
