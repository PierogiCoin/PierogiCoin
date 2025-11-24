/**
 * Environment validation entry point
 * Import this at the top of your app to validate env vars
 */

import { validateEnv } from './env'

// Run validation
validateEnv()

export { env, getEnv, hasEnv, getMissingEnvVars } from './env'
