'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('🔴 Global Error:', error)
  }, [error])

  return (
    <html lang="pl">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom right, #0f172a, #000000)',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
            padding: '20px',
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              textAlign: 'center',
              background: 'rgba(30, 41, 59, 0.8)',
              padding: '48px',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                fontSize: '64px',
                marginBottom: '24px',
              }}
            >
              ⚠️
            </div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              Krytyczny błąd aplikacji
            </h1>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '32px',
                opacity: 0.9,
              }}
            >
              Wystąpił poważny błąd. Spróbuj odświeżyć stronę.
            </p>
            <button
              onClick={reset}
              style={{
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(to right, #0891b2, #2563eb)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
              onFocus={e => {
                e.currentTarget.style.transform = 'scale(1.05)'
              }}
              onBlur={e => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              Odśwież stronę
            </button>
            <div
              style={{
                marginTop: '32px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                fontSize: '14px',
                opacity: 0.7,
              }}
            >
              <a
                href="mailto:czesc@lykkreacji.pl"
                style={{ color: '#22d3ee', textDecoration: 'none' }}
              >
                czesc@lykkreacji.pl
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
