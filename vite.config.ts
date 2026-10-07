import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'

const compression = (await import('vite-plugin-compression')).default

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: "Field Log \u2014 Mico's Map\u00faa Journey",
        short_name: 'Field Log',
        description: "Mico Arenga's Quarter One AIE100 portfolio \u2014 a field log of the Map\u00faa journey.",
        theme_color: '#1B2A2A',
        background_color: '#E4DFCB',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/aie100-portfolio/',
        start_url: '/aie100-portfolio/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,avif,woff2}'],
        globIgnores: ['photos/**'],
        navigateFallback: '/aie100-portfolio/index.html',
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    // @ts-expect-error - compression plugin type issues
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
    // @ts-expect-error - compression plugin type issues
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  base: '/aie100-portfolio/',
  server: {
    allowedHosts: true,
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    target: 'es2022',
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom')) {
              return 'vendor-react-dom'
            }
            if (id.includes('react') && !id.includes('react-dom') && !id.includes('react-router')) {
              return 'vendor-react'
            }
            if (id.includes('react-router-dom')) {
              return 'vendor-router'
            }
            if (id.includes('react-markdown') || id.includes('remark-gfm') || id.includes('unified') || id.includes('unist') || id.includes('hast') || id.includes('mdast') || id.includes('micromark') || id.includes('vfile')) {
              return 'vendor-markdown'
            }
            if (id.includes('web-vitals')) {
              return 'vendor-vitals'
            }
            return 'vendor'
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? ''
          const info = name.split('.')
          const ext = info[info.length - 1]
          if (/\.(css)$/.test(name)) {
            return 'assets/css/[name]-[hash].css'
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif|woff2?)$/.test(name)) {
            return 'assets/media/[name]-[hash].' + ext
          }
          return 'assets/[name]-[hash].' + ext
        },
      },
    },
    reportCompressedSize: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['web-vitals'],
  },
  css: {
    devSourcemap: false,
  },
  esbuild: {
    legalComments: 'none',
    treeShaking: true,
  },
})