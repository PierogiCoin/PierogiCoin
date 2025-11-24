import { z } from 'zod'

describe('Environment Validation', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('validates email schema', () => {
    const emailSchema = z.string().email()
    
    expect(() => emailSchema.parse('test@example.com')).not.toThrow()
    expect(() => emailSchema.parse('invalid-email')).toThrow()
  })

  it('validates URL schema', () => {
    const urlSchema = z.string().url()
    
    expect(() => urlSchema.parse('https://example.com')).not.toThrow()
    expect(() => urlSchema.parse('not-a-url')).toThrow()
  })

  it('validates enum schema', () => {
    const envSchema = z.enum(['development', 'production', 'test'])
    
    expect(() => envSchema.parse('development')).not.toThrow()
    expect(() => envSchema.parse('invalid')).toThrow()
  })

  it('handles optional fields', () => {
    const schema = z.object({
      required: z.string(),
      optional: z.string().optional(),
    })

    expect(() => schema.parse({ required: 'value' })).not.toThrow()
    expect(() => schema.parse({ optional: 'value' })).toThrow()
  })

  it('provides default values', () => {
    const schema = z.object({
      value: z.string().default('default'),
    })

    const result = schema.parse({})
    expect(result.value).toBe('default')
  })

  it('validates minimum length', () => {
    const schema = z.string().min(5)
    
    expect(() => schema.parse('12345')).not.toThrow()
    expect(() => schema.parse('1234')).toThrow()
  })

  it('flatten errors for better debugging', () => {
    const schema = z.object({
      email: z.string().email(),
      age: z.number().min(18),
    })

    const result = schema.safeParse({
      email: 'invalid',
      age: 10,
    })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      expect(errors.email).toBeDefined()
      expect(errors.age).toBeDefined()
    }
  })
})

describe('Environment Type Safety', () => {
  it('ensures type safety for env variables', () => {
    const schema = z.object({
      PORT: z.string().transform(val => parseInt(val, 10)),
      DEBUG: z.string().transform(val => val === 'true'),
    })

    const result = schema.parse({
      PORT: '3000',
      DEBUG: 'true',
    })

    expect(typeof result.PORT).toBe('number')
    expect(typeof result.DEBUG).toBe('boolean')
    expect(result.PORT).toBe(3000)
    expect(result.DEBUG).toBe(true)
  })
})
