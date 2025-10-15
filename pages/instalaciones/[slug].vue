<template>
  <div>
    <section v-if="pending" class="py-16">
      <div class="container px-4 md:px-6 max-w-[800px] mx-auto">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
          <p class="mt-4 text-gray-600">Cargando instalación...</p>
        </div>
      </div>
    </section>

    <section v-else-if="error" class="py-16">
      <div class="container px-4 md:px-6 max-w-[800px] mx-auto">
        <div class="text-center">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 class="text-2xl font-bold text-red-800 mb-2">Instalación no encontrada</h1>
            <p class="text-red-600 mb-4">La instalación que buscas no existe o ha sido eliminada.</p>
            <NuxtLink 
              to="/quienes-somos"
              class="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors inline-block"
            >
              Volver a Quiénes Somos
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <article v-else-if="instalacion" class="py-8">
      <section class="border-b border-gray-200 pb-4">
        <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
          <Breadcrumbs :breadcrumbs="breadcrumbItems" />
        </div>
      </section>

      <header class="py-12">
        <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-6 text-center">
            {{ instalacion.title }}
          </h1>

          <p class="text-lg text-gray-600 leading-relaxed mb-8 text-center max-w-[800px] mx-auto">
            {{ instalacion.descripcion }}
          </p>

          <div v-if="instalacion.imagen" class="w-full mb-6">
            <div class="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden rounded-lg shadow-lg">
              <img 
                :src="instalacion.imagen"
                :alt="instalacion.title"
                class="w-full h-full object-cover object-center"
                loading="lazy"
              >
            </div>
          </div>
        </div>
      </header>

      <section class="py-16 bg-gradient-to-b from-white to-gray-50">
        <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
          <div class="text-center mb-12">
            <span class="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
              Detalles
            </span>
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explora Nuestras Instalaciones
            </h2>
            <p class="mt-4 text-gray-600 max-w-2xl mx-auto">
              Cada detalle ha sido pensado para brindarte la mejor experiencia y atención
            </p>
          </div>
          
          <div class="space-y-16">
            <div 
              v-for="(nivel, index) in instalacion.niveles" 
              :key="index"
              class="group"
            >
              <div class="grid md:grid-cols-2 gap-8 items-center">
                <div 
                  class="relative"
                  :class="{ 'md:order-2': index % 2 === 1 }"
                >
                  <div class="relative overflow-hidden rounded-2xl shadow-xl">
                    <div class="absolute top-6 left-6 z-10">
                      <div class="w-14 h-14 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <span class="text-2xl font-bold">{{ index + 1 }}</span>
                      </div>
                    </div>
                    
                    <div class="aspect-[4/3] overflow-hidden">
                      <img 
                        :src="nivel.imagen_url || '/placeholder.svg'"
                        :alt="nivel.titulo"
                        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      >
                    </div>
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                <div 
                  class="space-y-4"
                  :class="{ 'md:order-1': index % 2 === 1 }"
                >
                  <div>
                    <div class="flex items-center gap-4 mb-3">
                      <div class="h-1 w-12 bg-blue-600 rounded-full"></div>
                      <span class="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                        Nivel {{ index + 1 }}
                      </span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                      {{ nivel.titulo }}
                    </h3>
                  </div>
                  
                  <p class="text-lg text-gray-600 leading-relaxed">
                    {{ nivel.descripcion }}
                  </p>
                  
                  <div class="flex items-center gap-2 pt-4">
                    <div class="flex gap-1">
                      <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div class="w-2 h-2 bg-blue-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-8">
        <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
          <div class="flex justify-center">
            <NuxtLink 
              to="/quienes-somos"
              class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Volver a Quiénes Somos
            </NuxtLink>
          </div>
        </div>
      </section>
    </article>

    <section v-if="relatedInstalaciones.length > 0" class="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div class="container px-4 md:px-6 max-w-[1200px] mx-auto">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            Descubre más
          </span>
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Otras Instalaciones
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Explora nuestras otras instalaciones diseñadas para brindarte la mejor atención médica
          </p>
        </div>
        
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            v-for="related in relatedInstalaciones" 
            :key="related.id"
            :to="`/instalaciones/${related.slug}`"
            class="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div class="relative h-56 overflow-hidden">
              <img
                :alt="related.title"
                :src="related.imagen || '/placeholder.svg'"
                class="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              >
              
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              <div class="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              
              <div class="absolute bottom-0 left-0 right-0 p-5">
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">
                  {{ related.title }}
                </h3>
                <div class="flex items-center gap-2">
                  <div class="h-0.5 w-8 bg-blue-500 rounded-full"></div>
                  <span class="text-xs text-blue-300 font-medium uppercase tracking-wider">
                    Ver instalación
                  </span>
                </div>
              </div>
            </div>
            
            <div class="p-5 bg-white">
              <p class="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
                {{ related.descripcion }}
              </p>
              
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                  Explorar detalles
                </span>
                <div class="w-8 h-8 bg-blue-50 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300">
                  <svg class="w-4 h-4 text-blue-600 group-hover:text-white transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-12">
          <NuxtLink 
            to="/quienes-somos#instalaciones"
            class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Ver todas las instalaciones</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { 
  fetchInstalacionBySlug,
  fetchInstalaciones,
  processInstalacion,
  findRelatedInstalaciones, 
  getInstalacionSEOMeta 
} = useInstalaciones()

const route = useRoute()
const slug = route.params.slug as string

const instalacion = ref<any>(null)
const error = ref<any>(null)
const pending = ref(true)
const config = useRuntimeConfig()

const loadInstalacion = async () => {
  try {
    pending.value = true
    error.value = null
    
    const rawInstalacion = await fetchInstalacionBySlug(slug)
    
    if (!rawInstalacion) {
      error.value = new Error('Instalación no encontrada')
      return
    }
    
    instalacion.value = await processInstalacion(rawInstalacion)
    
    // Cargar todas las instalaciones para las relacionadas si no existen
    const allInstalaciones = useState<any[]>('allInstalaciones', () => [])
    if (!allInstalaciones.value || allInstalaciones.value.length === 0) {
      const rawInstalaciones = await fetchInstalaciones()
      const processed = await Promise.all(
        rawInstalaciones.map(inst => processInstalacion(inst))
      )
      allInstalaciones.value = processed
    }
  } catch (err) {
    console.error('Error loading instalacion:', err)
    error.value = err
  } finally {
    pending.value = false
  }
}

onMounted(async () => {
  await loadInstalacion()
})

const breadcrumbItems = computed(() => [
  { label: 'Quiénes Somos', to: '/quienes-somos' },
  { label: 'Instalaciones' },
  { label: instalacion.value?.title || 'Cargando...' }
])

const relatedInstalaciones = computed(() => {
  if (!instalacion.value) return []
  return findRelatedInstalaciones(instalacion.value, 3)
})

watch(instalacion, (newInstalacion) => {
  if (newInstalacion) {
    const seoMeta = getInstalacionSEOMeta(newInstalacion, config.public.SITE_URL || 'https://altimo.com.sv')
    
    useSeoMeta({
      title: seoMeta.title,
      description: seoMeta.description,
      keywords: seoMeta.keywords,
      ogTitle: seoMeta.ogTitle,
      ogDescription: seoMeta.ogDescription,
      ogImage: seoMeta.ogImage,
      ogUrl: seoMeta.ogUrl,
      ogType: 'website'
    })

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: newInstalacion.title,
            description: newInstalacion.descripcion,
            image: newInstalacion.imagen,
            publisher: {
              '@type': 'MedicalOrganization',
              name: 'ÁLTIMO Medical Center'
            }
          })
        }
      ]
    })
  }
})

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Instalación no encontrada'
  })
}
</script>

<style scoped>
.prose {
  max-width: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
