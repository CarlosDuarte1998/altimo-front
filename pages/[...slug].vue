<script setup lang="ts">
const { corporateInfo } = useCIMROSEO();

// SEO para página de error
useSeoMeta({
  title: `Página no encontrada | ${corporateInfo.name}`,
  description: `La página que buscas no existe en ${corporateInfo.name}. Centro de diagnóstico por imágenes en Santa Ana, El Salvador.`,
  robots: 'noindex, nofollow'
});

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Página no encontrada - Error 404',
        description: 'Página de error 404 para rutas no existentes',
        mainEntity: {
          '@type': 'MedicalOrganization',
          name: corporateInfo.name,
          url: corporateInfo.website
        }
      })
    }
  ]
});
</script>

<template>
  <section class="min-h-screen flex items-center justify-center py-16 bg-white">
    <div class="container px-4 md:px-6 max-w-[1300px] mx-auto text-center">
      <!-- Icono o ilustración -->
      <div class="mb-8">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-24 h-24 text-blue-600 mx-auto" />
      </div>
      
      <!-- Mensaje principal -->
      <h1 class="text-3atxl font-bold text-gray-900 mb-4">404</h1>
      <h2 class="text-3xl font-semibold text-gray-800 mb-6">Página no encontrada</h2>
      
      <!-- Explicación -->
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Lo sentimos, no pudimos encontrar la página que estás buscando. 
        Puede que la dirección haya cambiado o la página ya no exista.
      </p>
      
      <!-- Acción principal -->
      <NuxtLink 
        to="/"
        class="inline-flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 h-12 px-8 py-3 font-medium transition-colors min-h-[44px] mb-6"
        aria-label="Volver a la página principal de CIMRO"
      >
        <UIcon name="i-heroicons-home" class="mr-2 h-5 w-5" />
        Volver al inicio
      </NuxtLink>
      
      <!-- Enlaces alternativos -->
      <div class="mt-8">
        <p class="text-gray-500 mb-4">También puedes:</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/servicios"
            class="text-blue-600 hover:text-blue-700 hover:underline font-medium"
          >
            Ver nuestros servicios
          </NuxtLink>
          <NuxtLink 
            to="/contactanos"
            class="text-blue-600 hover:text-blue-700 hover:underline font-medium"
          >
            Contactarnos
          </NuxtLink>
          <NuxtLink 
            to="/noticias"
            class="text-blue-600 hover:text-blue-700 hover:underline font-medium"
          >
            Leer noticias
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>