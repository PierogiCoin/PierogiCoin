import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔒 Tryb ścisły Reacta – pomaga wykrywać błędy w czasie dev
  reactStrictMode: true,

  // ✅ Sprawdzenie typów i lintera przy buildzie (dba o jakość kodu)
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // 🖼️ Optymalizacja obrazów
  images: {
    // Jeśli korzystasz z lokalnych plików w folderze public/images — nie potrzeba domen
    // Ale dodajemy fallback, by uniknąć błędów 400
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Pozwala ładować obrazy z dowolnych domen (bezpieczne jeśli używasz optymalizacji)
      },
    ],
  },

  // 🌐 Poprawiona sekcja eksperymentalna
  experimental: {
    // Usunięto: optimizeCss: true, - powodowało to błąd "Cannot find module 'critters'" na Vercel
    scrollRestoration: true, // Ta opcja jest bardzo przydatna i stabilna, zostawiamy ją
  },

  // 📦 Dodatkowo — optymalizacja outputu
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 🚀 Dla Vercela – poprawne ścieżki publiczne
  output: 'standalone',

  // ⚡ Webpack optimization
  webpack: (config, { isServer }) => {
    // Optimize large string serialization
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    };

    return config;
  },

  // 🔒 Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://generativelanguage.googleapis.com; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);