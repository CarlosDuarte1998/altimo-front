<script setup lang="ts">
import BannerSwipper from '~/components/BannerSwipper.vue';

const categoriesStore = useCategoriesStore();
const { corporateInfo, getKeywordsString, generateDescription, getSchemaData } = useALTIMOSEO();

// SEO Meta Tags para la página principal
useSeoMeta({
  title: `${corporateInfo.name} - Diagnóstico por Imágenes Santa Ana`,
  description: generateDescription('CIMRO es el centro líder en diagnóstico por imágenes en Santa Ana, El Salvador. Tomografía computarizada multicorte, ultrasonidos, rayos X, mamografía, cardiología. Aseguradoras afiliadas SISA, ACSA, MAPFRE.'),
  keywords: getKeywordsString(),
  ogTitle: `${corporateInfo.name} Santa Ana El Salvador`,
  ogDescription: generateDescription(),
  ogImage: `${corporateInfo.website}/logo-horizontal.png`,
  ogUrl: corporateInfo.website,
  twitterTitle: `${corporateInfo.name} Santa Ana`,
  twitterDescription: 'Diagnóstico por imágenes con tecnología de vanguardia en Santa Ana, El Salvador. Agende su cita en CIMRO.',
  twitterImage: `${corporateInfo.website}/logo-horizontal.png`,
});

// Structured Data para SEO local y script de Taggbox
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(getSchemaData('homepage'))
    },
    {
      src: 'https://widget.taggbox.com/embed.min.js',
      type: 'text/javascript',
      defer: true
    }
  ]
});

// Cargar categorías al montar el componente
onMounted(async () => {
  if (!categoriesStore.hasCategories) {
    await categoriesStore.fetchCategories();
  }
});

// Obtener las primeras 3 categorías para mostrar en homepage
const mainCategories = computed(() => {
  const categories = categoriesStore.categories || [];
  return categories.slice(0, 3) as any[];
});
</script>

<template>
   <section class="relative">
      <BannerSwipper />
   </section>

   <section class="w-full">

      <div class="max-w-[1300px] m-auto py-5 mt-10">
         <div class="text-center">
            <h1 class=" text-3xl font-bold tracking-tight text-[#213364] sm:text-4xl">
               Nuestros Servicios
            </h1>
            <p class="mx-auto mt-4 max-w-[700px] text-gray-500">Ofrecemos servicios de laboratorio clínico, cirugías y hospitalización con altos estándares de calidad.</p>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 px-5 md:px-0">
               <NuxtLink 
                  v-for="(category, index) in mainCategories" 
                  :key="category?.id || index"
                  :to="`/servicios/${category?.slug || ''}`"
                  class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm transition-all duration-500 ease-out hover:shadow-lg hover:scale-95"
               >
                  <!-- Header -->
                  <div class="flex flex-col space-y-1.5 p-6">
                     <div class="text-xl font-semibold leading-tight tracking-tight text-[#213364]">
                        {{ category?.name || 'Categoría' }}
                     </div>
                     <div class="text-sm text-muted-foreground">
                        {{ category?.count || 0 }} {{ (category?.count === 1) ? 'servicio' : 'servicios' }} disponibles
                     </div>
                  </div>

                  <!-- Image and Description -->
                  <div class="p-6 pt-0">
                     <img 
                        :alt="`Servicios de ${category?.name || 'hospitalización'} en ALTIMO El Salvador`" 
                        loading="lazy" 
                        width="350" 
                        height="200"
                        decoding="async" 
                        class="mb-4 rounded-lg object-cover w-full h-48"
                        :src="category?.imagen_url || category?.image || `https://picsum.photos/350/200?random=${category?.id || index}`"
                     />
                     <p class="text-sm text-gray-500 line-clamp-3">
                        {{ category?.description || 'Servicios de diagnóstico por imagen con tecnología de última generación y personal especializado.' }}
                     </p>
                  </div>

                  <!-- Footer -->
                  <div class="flex items-center justify-between p-6 pt-0">
                     <span class="flex items-center text-sm font-medium text-blue-600">
                        Ver servicios de {{ category?.name || 'diagnóstico' }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                           viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                           stroke-linecap="round" stroke-linejoin="round"
                           class="lucide lucide-arrow-right ml-1 h-4 w-4" aria-hidden="true">
                           <path d="M5 12h14"></path>
                           <path d="m12 5 7 7-7 7"></path>
                        </svg>
                     </span>
                  </div>
               </NuxtLink>
               
               <!-- Mensaje de carga si no hay categorías -->
               <div v-if="mainCategories.length === 0" class="col-span-full text-center py-8">
                  <div class="animate-pulse">
                     <div class="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                     <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
               </div>
            </div>

            <div class="mt-10 text-center">
               <NuxtLink
                  class="inline-flex items-center justify-center rounded-md bg-[#213364] text-white hover:bg-blue-400 h-10 px-6 py-2 font-medium transition-colors min-h-[44px]"
                  to="/servicios"
                  aria-label="Ver todos los servicios médicos disponibles en ALTIMO">Ver todos los servicios</NuxtLink>
            </div>



         </div>
      </div>

   </section>

   <section class="bg-gray-50 py-16">
      <div class="container m-auto px-4 md:px-6 max-w-[1300px]">
         <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold tracking-tight text-[#213364] sm:text-4xl">¿Por qué elegirnos?</h2>
            <p class="mx-auto mt-4 max-w-[700px] text-gray-500">En Áltimo nos distinguimos por nuestro compromiso de brindar excelencia médica y calidad en cada servicio.</p>
         </div>
         
         <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <!-- CONFIANZA -->
            <div class="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
               <div class="mb-4 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <UIcon name="i-heroicons-shield-check" class="w-8 h-8 text-blue-600" />
               </div>
               <h3 class="mb-3 text-xl font-semibold text-[#213364]">Confianza</h3>
               <p class="text-gray-600 text-sm leading-relaxed">Nuestro compromiso es generar confianza a cada paciente a través de un servicio seguro y de calidad.</p>
            </div>

            <!-- Atención Humanizada -->
            <div class="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
               <div class="mb-4 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <UIcon name="i-heroicons-heart" class="w-8 h-8 text-blue-600" />
               </div>
               <h3 class="mb-3 text-xl font-semibold text-[#213364]">Atención Humanizada</h3>
               <p class="text-gray-600 text-sm leading-relaxed">Nuestro personal está comprometido con brindar un trato cálido y respetuoso a cada paciente.</p>
            </div>

            <!-- Profesionalismo -->
            <div class="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
               <div class="mb-4 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <UIcon name="i-heroicons-academic-cap" class="w-8 h-8 text-blue-600" />
               </div>
               <h3 class="mb-3 text-xl font-semibold text-[#213364]">Profesionalismo</h3>
               <p class="text-gray-600 text-sm leading-relaxed">Nuestro personal se distingue por su profesionalismo y compromiso con la salud de cada paciente.</p>
            </div>
         </div>
      </div>
   </section>

   <!-- Métodos de Pago Section -->
   <section class="py-16 bg-white">
      <div class="container m-auto px-4 md:px-6 max-w-[1300px]">
         <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold tracking-tight text-[#213364] sm:text-4xl">Métodos de Pago</h2>
            <p class="mx-auto mt-4 max-w-[700px] text-gray-500">Ofrecemos múltiples opciones de pago para su comodidad y facilidad de acceso a nuestros servicios.</p>
         </div>
         
         <div class="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <!-- Tasa 0 -->
            <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
               <div class="relative z-10">
                  <div class="mb-6 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                     <UIcon name="i-heroicons-percent-badge" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="mb-4 text-2xl font-bold">Tasa 0%</h3>
                  <p class="text-green-100 mb-6 leading-relaxed">Financiamiento sin intereses para hacer más accesibles nuestros servicios médicos.</p>
                  <div class="mt-auto">
                     <span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                        Sin Intereses
                     </span>
                  </div>
               </div>
               <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            </div>

            <!-- Tarjetas de Crédito y Débito -->
            <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
               <div class="relative z-10">
                  <div class="mb-6 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                     <UIcon name="i-heroicons-credit-card" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="mb-4 text-2xl font-bold">Tarjetas</h3>
                  <p class="text-blue-100 mb-6 leading-relaxed">Aceptamos tarjetas de crédito y débito, tanto nacionales como internacionales.</p>
                  <div class="mt-auto flex flex-wrap gap-2">
                     <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                        Nacional
                     </span>
                     <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                        Internacional
                     </span>
                  </div>
               </div>
               <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            </div>

            <!-- Transferencias -->
            <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
               <div class="relative z-10">
                  <div class="mb-6 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                     <UIcon name="solar:card-transfer-broken" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="mb-4 text-2xl font-bold">Transferencias nacionales e internacionales</h3>
                  <p class="text-purple-100 mb-6 leading-relaxed">Aceptamos transferencias bancarias nacionales e internacionales para tu mayor comodidad.</p>
                  <div class="mt-auto">
                     <span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                        Seguro y Confiable
                     </span>
                  </div>
               </div>
               <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            </div>

            <!-- Certificado Prepago -->
            <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
               <div class="relative z-10">
                  <div class="mb-6 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                     <UIcon name="nimbus:gift-card" class="w-8 h-8 text-white" />
                  </div>
                  <h3 class="mb-4 text-2xl font-bold">Certificado prepago</h3>
                  <p class="text-orange-100 mb-6 leading-relaxed">Pago con certificado de regalo mediante código o enlace.</p>
                  <div class="mt-auto">
                     <span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                        Seguro y Confiable
                     </span>
                  </div>
               </div>
               <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            </div>
         </div>

         <!-- Información adicional -->
         <div class="mt-12 text-center">
            <div class="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg border border-gray-200">
               <h4 class="text-lg font-semibold text-[#213364] mb-3">Facilidades de Pago</h4>
               <p class="text-gray-600 text-sm leading-relaxed mb-4">
                  En ALTIMO entendemos la importancia de hacer accesibles nuestros servicios médicos. Por eso ofrecemos diversas opciones de pago que se adaptan a sus necesidades.
               </p>
               <div class="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                     class="inline-flex items-center justify-center rounded-md bg-[#213364] text-white hover:bg-blue-400 h-10 px-6 py-2 font-medium transition-colors"
                     href="https://api.whatsapp.com/send/?phone=50377461474&text=Hola%2C+quisiera+informaci%C8%AFn+sobre+los+m%C3%A9todos+de+pago&type=phone_number&app_absent=0" 
                     target="_blank"
                  >
                     <Icon name="i-flowbite-whatsapp-solid" class="mr-2 h-4 w-4" />
                     Consultar Opciones de Pago
                  </a>
                  <NuxtLink 
                     class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 h-10 px-6 py-2 font-medium transition-colors"
                     to="/contactanos"
                  >
                     Más Información
                  </NuxtLink>
               </div>
            </div>
         </div>
      </div>
   </section>

   <section class="relative bg-gradient-to-r bg-[#213364] py-20 text-white">
      <div class="container relative z-10 px-4 md:px-6 m-auto">
         <div class="grid gap-6 md:grid-cols-2 md:gap-12">
            <div class="flex flex-col justify-center space-y-4">
               <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Diagnóstico por imagen con
                  tecnología avanzada</h2>
               <p class="max-w-[600px] text-blue-100 md:text-xl">En ALTIMO combinamos la más alta tecnología con un
                  equipo médico especializado para ofrecerle un diagnóstico preciso y confiable.</p>
               <div class="flex flex-col gap-3 sm:flex-row">
                  <a class="inline-flex items-center justify-center h-11 rounded-md px-8 bg-white text-blue-900 hover:bg-blue-50 font-medium transition-colors"
                     href="https://api.whatsapp.com/send/?phone=50377461474&text=Hola%2C+quisiera+informaci%C8%AFn&type=phone_number&app_absent=0" target="_blank">
                     <Icon name="i-flowbite-whatsapp-solid" class="mr-2 h-5 w-5" />
                     Agendar Cita
                  
                  </a>
                
                  <NuxtLink class="inline-flex items-center justify-center h-11 rounded-md px-8 border border-white text-white hover:bg-white/10 font-medium transition-colors"
                     to="/servicios">Conocer Servicios
                     
                  </NuxtLink>
               </div>
            </div>
            <div class="flex items-center justify-center"><img alt="Equipo médico avanzado de ALTIMO - Medical Center" loading="lazy" width="500"
                  height="400" decoding="async" data-nimg="1" class="rounded-lg object-cover" style="color:transparent"
                  src="https://admin-altimo.gunssoft.tech/wp-content/uploads/2025/10/Fachada-1.png"></div>
         </div>
      </div>
      <div class="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
   </section>

   <section>

   </section>

   <!-- <section class="py-16">
      <div class="container px-4 md:px-6 max-w-[1300px] m-auto">
         <div class="mb-12 text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lo que dicen nuestros pacientes</h2>
            <p class="mx-auto mt-4 max-w-[700px] text-gray-500">La satisfacción de nuestros pacientes es nuestro mayor
               orgullo.</p>
         </div>
         <div class="taggbox" style="width:100%;height:100%;overflow:auto;" data-widget-id="285784" website="1"></div>
      </div>
   </section> -->

   <!-- <section>
      <div class="mb-6 text-center">
         <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">Aseguradoras Afiliadas</h2>
      </div>
      <BransLoop />
   </section> -->

 

   <!-- Recent Posts Section -->
   <RecentPosts 
     title="Últimas Noticias"
     subtitle="Mantente informado sobre las novedades y avances en ALTIMO"
     :limit="3"
     :show-author="false"
     :show-reading-time="false"
   />

</template>

<style scoped>
/* Animación suave para las cards */
.hover\:scale-95:hover {
  transform: scale(0.99);
}

/* Transiciones suaves */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-500 {
  transition-duration: 500ms;
}

.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}

/* Truncado de texto */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>