#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes Next.js bundle and provides recommendations
 */

const fs = require('fs')
const path = require('path')

console.log('📦 Analyzing Next.js Bundle...\n')

// Read build manifest
const buildManifestPath = path.join(__dirname, '../.next/build-manifest.json')

if (!fs.existsSync(buildManifestPath)) {
  console.error('❌ Build manifest not found. Run `npm run build` first.')
  process.exit(1)
}

const buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'))

// Analyze pages
console.log('📄 Page Sizes:')
console.log('─'.repeat(60))

const pages = buildManifest.pages || {}
let totalSize = 0

Object.keys(pages).forEach(page => {
  const files = pages[page]
  let pageSize = 0

  files.forEach(file => {
    const filePath = path.join(__dirname, '../.next', file)
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath)
      pageSize += stats.size
    }
  })

  totalSize += pageSize
  const sizeMB = (pageSize / 1024 / 1024).toFixed(2)
  const emoji = pageSize > 500000 ? '🔴' : pageSize > 250000 ? '🟡' : '🟢'
  
  console.log(`${emoji} ${page.padEnd(30)} ${sizeMB} MB`)
})

console.log('─'.repeat(60))
console.log(`📊 Total Bundle Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB\n`)

// Recommendations
console.log('💡 Recommendations:\n')

const recommendations = []

if (totalSize > 5 * 1024 * 1024) {
  recommendations.push('⚠️  Bundle size > 5MB - Consider code splitting')
}

// Check for large dependencies
console.log('📦 Analyzing Dependencies...')
const packageJsonPath = path.join(__dirname, '../package.json')
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }

// Known large packages
const largeDeps = {
  'gsap': 'Consider importing only needed modules',
  '@radix-ui': 'Large UI library - use tree shaking',
  'three': 'Very large - use dynamic imports',
  'howler': 'Audio library - consider alternatives',
}

Object.keys(largeDeps).forEach(dep => {
  if (Object.keys(deps).some(d => d.includes(dep))) {
    recommendations.push(`📦 ${dep}: ${largeDeps[dep]}`)
  }
})

if (recommendations.length === 0) {
  console.log('✅ No major issues found!')
} else {
  recommendations.forEach(rec => console.log(rec))
}

console.log('\n📈 Next Steps:')
console.log('  1. Run `npm run analyze` for visual bundle analysis')
console.log('  2. Check for duplicate dependencies')
console.log('  3. Use dynamic imports for large components')
console.log('  4. Enable compression in production')
console.log('\n✨ Done!\n')
