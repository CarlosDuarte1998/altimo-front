// https://nuxt.com/docs/api/configuration/nuxt-config

import colors from 'tailwindcss/colors'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // SPA mode para compatibilidad con hosting compartido
  ssr: false,
  
  // Configuración específica para SPA y hosting compartido
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      failOnError: false
    },
    experimental: {
      wasm: true
    }
  },

  ui: {
    colorMode: false
  },
  
  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/device',
    '@nuxtjs/robots'
  ],

  // Configuración de robots para baseURL
  robots: {
    robotsTxt: false
  },

  // Configuración SEO global
  app: {
    baseURL: '/',
    head: {
      htmlAttrs: {
        lang: 'es'
      },
      titleTemplate: '%s | ALTIMO - Medical Center',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'ALTIMO - Medical Center' },
        { name: 'description', content: 'ALTIMO - Medical Center en Santa Ana, El Salvador. Tomografía computarizada, ultrasonidos, rayos X, mamografía, cardiología. Diagnóstico por imágenes con tecnología de vanguardia.' },
        { name: 'keywords', content: 'ALTIMO, Medical Center, Santa Ana, tomografía computarizada Santa Ana, ultrasonidos Santa Ana, rayos x Santa Ana, mamografía Santa Ana, cardiología Santa Ana, diagnóstico por imágenes El Salvador, radiología occidente El Salvador, centro médico Santa Ana, SISA, ACSA, MAPFRE, Seguros Azul' },
        { property: 'og:site_name', content: 'ALTIMO - Medical Center' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'ALTIMO - Medical Center Santa Ana' },
        { property: 'og:description', content: 'Centro especializado en diagnóstico por imágenes en Santa Ana, El Salvador. Tomografía, ultrasonidos, rayos X, mamografía y cardiología con aseguradoras afiliadas.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@altimo.sv' },
        { name: 'twitter:title', content: 'ALTIMO - Medical Center' },
        { name: 'twitter:description', content: 'Servicios de diagnóstico por imágenes en Santa Ana, El Salvador. Tecnología de vanguardia y personal especializado.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://altimosv.com' }
      ]
    }
  },

  // Configuración de performance
  experimental: {
    payloadExtraction: false
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_API_BASE_URL,
      SITE_URL: process.env.NUXT_SITE_URL || 'https://altimosv.com',
      ADMIN_BASE_URL: process.env.NUXT_ADMIN_BASE_URL || 'https://admin-altimo.gunssoft.tech',
    }
  },

  // Configuración global del sitemap
  site: {
    url: 'https://altimosv.com'
  },

  // Configuración de CSS crítico
  css: ['~/assets/css/main.css']





})
