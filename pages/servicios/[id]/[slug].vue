<script setup>
import { onMounted, ref } from "vue";
import { useServicesStore } from "#imports";

const route = useRoute();
const categorySlug = ref(route.params.id); // En realidad es el slug de la categoría
const serviceSlug = ref(route.params.slug); // Este es el slug del servicio

const servicesStore = useServicesStore();
const categoriesStore = useCategoriesStore();

// Variables reactivas para el servicio actual
const currentService = ref(null);
const currentCategory = ref(null);

onMounted(async () => {
  // Cargar categorías si no están disponibles
  if (!categoriesStore.hasCategories) {
    await categoriesStore.fetchCategories();
  }
  
  // Obtener la categoría por slug
  currentCategory.value = categoriesStore.getCategoryBySlug(categorySlug.value);
  
  if (currentCategory.value) {
    // Obtener los servicios de la categoría
    const services = await categoriesStore.fetchCategoryServices(currentCategory.value.id);
    
    // Encontrar el servicio específico por slug
    currentService.value = services.find(service => service.slug === serviceSlug.value);
    
    // Si encontramos el servicio, obtener sus detalles completos
    if (currentService.value) {
      // Usar el ID del servicio en lugar del slug
      await servicesStore.getServiceById(currentService.value.id);
    } else {
      console.error('Service not found with slug:', serviceSlug.value);
    }
  } else {
    console.error('Category not found with slug:', categorySlug.value);
  }
});

const items = ['Descripción', 'Preparación', 'Procedimiento', 'Preguntas Frecuentes']
const selected = ref('Descripción')

const setSelected = (item) => {
  selected.value = item
}
const openAccordion = ref('0')

// Computed properties para datos dinámicos
const serviceTitle = computed(() => {
  return currentService.value?.title?.rendered || 
         currentService.value?.title || 
         servicesStore.services?.title?.rendered || 
         'Servicio no encontrado';
});

const serviceDescription = computed(() => {
  return currentService.value?.excerpt?.rendered || 
         currentService.value?.excerpt || 
         'Descripción no disponible';
});

const imageUrl = computed(() => {
  // Priorizar la imagen del store que ahora tiene mejor calidad
  const finalUrl = servicesStore.imgServices || 
                   currentService.value?.featured_image || 
                   '/placeholder.svg';
  
  return finalUrl;
});

const shortDetails = computed(() => {
  return servicesStore.shortDetails || {
    time: 'No especificado',
    time_reponse: 'No especificado',
    preparation: 'No especificado',
    cantidad: 'No especificado'
  };
});

const longDetails = computed(() => {
  return servicesStore.longDetails || {
    description: 'Descripción no disponible',
    preparation: 'Preparación no disponible',
    Procedure: 'Procedimiento no disponible',
    faq: []
  };
});

const itemsAccodion = computed(() => [
  {
    label: 'Descripción',
    icon: 'i-lucide-file-text',
    description: longDetails.value.description,
    isHtml: true
  },
  {
    label: 'Preparación',
    icon: 'i-lucide-briefcase-medical',
    description: longDetails.value.preparation,
    isHtml: true
  },
  {
    label: 'Procedimiento',
    icon: 'i-lucide-list-checks',
    description: longDetails.value.Procedure,
    isHtml: true
  },
  {
    label: 'Preguntas Frecuentes',
    icon: 'i-lucide-help-circle',
    description: longDetails.value.faq,
    isHtml: false
  }
]);

// WhatsApp message dinámico
const whatsappMessage = computed(() => {
  const serviceName = serviceTitle.value;
  return `Hola, quisiera información de ${serviceName}`;
});

const whatsappUrl = computed(() => {
  return `https://wa.me/50377461474?text=${encodeURIComponent(whatsappMessage.value)}`;
});

// Meta tags dinámicos
useSeoMeta({
  title: computed(() => `${serviceTitle.value} - ALTIMO`),
  description: computed(() => serviceDescription.value),
  ogTitle: computed(() => `${serviceTitle.value} - ALTIMO`),
  ogDescription: computed(() => serviceDescription.value),
  ogImage: computed(() => imageUrl.value),
  twitterCard: 'summary_large_image'
});
</script>

<template>
  <section class="bg-[#213364] py-16 text-white">
    <div class="container px-4 md:px-6">
      <div class="mx-auto max-w-3xl text-center">
        <div v-if="!currentService" class="animate-pulse">
          <div class="h-8 bg-blue-800 rounded w-3/4 mx-auto mb-4"></div>
          <div class="h-4 bg-blue-800 rounded w-1/2 mx-auto"></div>
        </div>
        <div v-else>
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {{ serviceTitle }}
          </h1>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16">
    <div class="container px-4 md:px-6">
      <div class="grid gap-12 lg:grid-cols-3">
        <div class="lg:col-span-1">
          <div class="sticky top-24 space-y-6">
            <!--Información rapida-->
            <div v-if="categorySlug==='cirugias'"
              class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div class="flex flex-col space-y-1.5 p-6">
                <div class="text-2xl font-semibold leading-none tracking-tight">
                  Información Rápida
                </div>
                <div class="text-sm text-muted-foreground">
                  Detalles de cirugia
                </div>
              </div>
              <div class="p-6 pt-0 space-y-4">
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                    class="lucide lucide-clock mt-0.5 h-7 w-7 shrink-0 text-blue-600">
                    <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                      <path d="M40 8H8v32h32zM8 6a2 2 0 0 0-2 2v32a2 2 0 0 0 2 2h32a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" />
                      <path
                        d="M10 34h10v2H10zm18 0h4v2h-4zm-6 0h4v2h-4zm12 0h4v2h-4zm-17.172-6h4.724a4 4 0 0 0 2.798-1.142L28 23.284v-.456A4 4 0 0 1 29.172 20l1.689-1.69l-2.606-1.736zM12 30l16-16l6 4l-3.414 3.414A2 2 0 0 0 30 22.828v.456a2 2 0 0 1-.6 1.43l-3.65 3.573A6 6 0 0 1 21.551 30z" />
                      <path
                        d="M26.707 21.293a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0m10-13.185l-7.6 7.6l-1.414-1.415l7.6-7.6zm1.5 4.285a1 1 0 0 1 0 1.414l-5.5 5.5l-1.414-1.415l5.5-5.5a1 1 0 0 1 1.414 0" />
                    </g>
                  </svg>
                  <div>
                    <h4 class="font-medium">Tipo de cirugía</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.time }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                    class="lucide lucide-clock mt-0.5 h-7 w-7 shrink-0 text-blue-600">
                    <g fill="currentColor">
                      <path
                        d="M8 19.035c0-2.65.885-5.189 2.345-7.047C11.8 10.136 13.787 9 16.03 9c3.103 0 5.51 2.02 7.071 5.202L24 16.03l.898-1.828C26.459 11.02 28.866 9 31.968 9c2.245 0 4.232 1.136 5.688 2.988C39.116 13.846 40 16.385 40 19.035q-.001.591-.056 1.174a10.6 10.6 0 0 1 1.76 1.738c.192-.945.296-1.916.296-2.912c0-3.075-1.021-6.054-2.772-8.282C37.473 8.518 34.944 7 31.968 7C28.466 7 25.802 8.963 24 11.734C22.2 8.964 19.535 7 16.031 7c-2.975 0-5.503 1.518-7.259 3.752C7.022 12.98 6 15.96 6 19.035c0 6.84 4.535 12.336 8.85 16.034a46 46 0 0 0 7.948 5.436a28 28 0 0 0 .71.368l.042.02l.011.005l.005.003l.448.215l.444-.227l.003-.002l.011-.005l.04-.022l.152-.08c.13-.07.319-.172.558-.307c.477-.27 1.156-.666 1.969-1.18a51 51 0 0 0 1.898-1.261A10.5 10.5 0 0 1 27.2 36.9q-.57.381-1.077.701a44 44 0 0 1-2.135 1.27l-.246-.13a43.8 43.8 0 0 1-7.59-5.19C11.965 29.961 8 24.974 8 19.034" />
                      <path
                        d="M34 31a2 2 0 1 0-.676-3.883l-2.299-2.299l-1.414 1.414l2.42 2.42Q32 28.822 32 29a2 2 0 0 0 2 2" />
                      <path fill-rule="evenodd"
                        d="M33.5 37a8.5 8.5 0 1 0 0-17a8.5 8.5 0 0 0 0 17m0-2a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13"
                        clip-rule="evenodd" />
                    </g>
                  </svg>
                  <div>
                    <h4 class="font-medium">Recuperación</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.time_reponse }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                    class="lucide lucide-clock mt-0.5 h-7 w-7 shrink-0 text-blue-600">
                    <g fill="currentColor">
                      <path
                        d="M20 20h-4v3h4zm-4 5h4v3h-4zm4 5h-4v3h4zm2-10h4v3h-4zm4 5h-4v3h4zm-4 5h4v3h-4zm10-10h-4v3h4zm-4 5h4v3h-4zm4 5h-4v3h4zm-7-15v-3h3v-2h-3V7h-2v3h-3v2h3v3z" />
                      <path fill-rule="evenodd"
                        d="M17 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2h8v2h-2v34h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2V8h-1V6zm0 5h-4v31h4v-4h-1v-2h16v2h-1v4h4V11h-4v5a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2zm0-2h-4V8h4zm2-3h10v10H19zm4 36h-4v-4h4zm6 0v-4h-4v4zm6-33V8h-4v1z"
                        clip-rule="evenodd" />
                    </g>
                  </svg>
                  <div>
                    <h4 class="font-medium">Hospitalización</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.preparation }}
                    </p>
                  </div>
                </div>
                <div data-orientation="horizontal" role="none"
                  class="shrink-0 bg-border border-gray-200 h-[1px] w-full"></div>
                <div class="flex justify-center">
                  <a class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-[#213364] text-white text-primary-foreground hover:bg-[#001871]/90 h-10 px-4 py-2 w-full"
                    :href="whatsappUrl" target="_blank">
                    <UIcon name="i-fa6-brands-whatsapp" class="size-5" />
                    Agendar Cita
                  </a>
                </div>
              </div>
            </div>
            <!--Información rapida-->
            <div v-else class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div class="flex flex-col space-y-1.5 p-6">
                <div class="text-2xl font-semibold leading-none tracking-tight">
                  Información Rápida
                </div>
                <div class="text-sm text-muted-foreground">
                  Detalles importantes sobre el servicio
                </div>
              </div>
              <div class="p-6 pt-0 space-y-4">
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-clock mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <div>
                    <h4 class="font-medium">Duración</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.time }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-file-text mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    <path d="M10 9H8"></path>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                  </svg>
                  <div>
                    <h4 class="font-medium">Resultados</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.time_reponse }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-shield-alert mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                    <path
                      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z">
                    </path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                  <div>
                    <h4 class="font-medium">Preparación</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.preparation }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="2048" height="2048" viewBox="0 0 2048 2048" class="lucide lucide-shield-alert mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                    <path fill="currentColor"
                      d="M1152 640H512V512h640zM256 1664h681l-64 128H128V128h1408v640h-128V256H256zm256-384h617l-64 128H512zm512-384v128H512V896zm939 967q14 28 14 57q0 26-10 49t-27 41t-41 28t-50 10h-754q-26 0-49-10t-41-27t-28-41t-10-50q0-29 14-57l299-598v-241h-128V896h640v128h-128v241zm-242-199l-185-369v-271h-128v271l-185 369z" />
                  </svg>
                  <div>
                    <h4 class="font-medium">Cantidad de exámenes</h4>
                    <p class="text-sm text-gray-500">
                      {{ shortDetails.cantidad_de_examenes }}
                    </p>
                  </div>
                </div>
                <div data-orientation="horizontal" role="none"
                  class="shrink-0 bg-border border-gray-200 h-[1px] w-full"></div>
                <div class="flex justify-center">
                  <a class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-[#001871] text-white text-primary-foreground hover:bg-[#001871]/90 h-10 px-4 py-2 w-full"
                    :href="whatsappUrl" target="_blank">
                    <UIcon name="i-fa6-brands-whatsapp" class="size-5" />
                    Agendar Cita
                  </a>
                </div>
              </div>
            </div>

            <!-- Navegación de regreso -->
            <div class="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm">
              <div class="p-6">
                <NuxtLink :to="`/servicios/${categorySlug}`"
                  class="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-arrow-left h-4 w-4">
                    <path d="M12 19l-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                  </svg>
                  Volver a {{ currentCategory?.name || 'Categoría' }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="mb-8 max-h-[500px] overflow-hidden rounded-lg">
            <img :alt="serviceTitle" loading="eager" width="1200" height="600" decoding="async" data-nimg="1"
              class="w-full lg:max-w-2/3 h-full max-h-[500px] lg:max-h-[300px] object-cover" :src="imageUrl"
              style="image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;" />
          </div>

          <div dir="ltr" data-orientation="horizontal">
            <UAccordion :items="itemsAccodion" v-model="openAccordion" v-if="$device.isMobile">
              <template #content="{ item }">
                <div v-if="item.isHtml">
                  <div v-html="item.description"></div>
                </div>
                <div v-else>
                  <ul>
                    <template v-for="(itemDescription, index) in item.description" :key="index">
                      <li>
                        <div class="rounded-lg p-4">
                          <div class="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round"
                              class="lucide lucide-circle-help mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                              <path d="M12 17h.01"></path>
                            </svg>
                            <div>
                              <h4 class="font-medium">{{ itemDescription.faq_title }}</h4>
                              <p class="text-sm text-gray-600">
                                {{ itemDescription.faq_description }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </template>
                  </ul>
                </div>
              </template>
            </UAccordion>

            <!-- Version Desktop -->
            <div
              class="items-center justify-center rounded-md sm:gap-4 grid w-full grid-cols-3 sm:grid-cols-4 select-container p-1 breadcrumb"
              v-if="!$device.isMobile">
              <button v-for="(item, index) in items" :key="index" :class="[
                'text-sm font-medium transition duration-400 py-2 rounded-sm btn-breadcrumb',
                selected === item ? 'select-active' : 'cursor-pointer'
              ]" @click="setSelected(item)">
                {{ $device.isMobile && item === 'Preguntas Frecuentes' ? 'FAQ' : item }}
              </button>
            </div>

            <div
              class="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
              v-if="!$device.isMobile">

              <div v-if="selected === 'Descripción'" v-html="longDetails.description"></div>
              <div v-if="selected === 'Preparación'" v-html="longDetails.preparation"></div>
              <div v-if="selected === 'Procedimiento'" v-html="longDetails.Procedure"></div>
              <div v-if="selected === 'Preguntas Frecuentes'">
                <ul class="grid gap-3" v-if="longDetails.faq && longDetails.faq.length > 0">
                  <li v-for="(item, index) in longDetails.faq" :key="index">
                    <div class="rounded-lg border border-gray-200 p-4">
                      <div class="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                          class="lucide lucide-circle-help mt-0.5 h-5 w-5 shrink-0 text-blue-600">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <path d="M12 17h.01"></path>
                        </svg>
                        <div>
                          <h4 class="font-medium">{{ item.faq_title }}</h4>
                          <p class="text-sm text-gray-600">
                            {{ item.faq_description }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-else class="text-center py-8 text-gray-500">
                  No hay preguntas frecuentes disponibles para este servicio.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.select-active {
  background-color: #213364;
  color: #fff;
  font-weight: 600;
}

.breadcrumb {
  background-color: #85bbeb27;
}

.btn-breadcrumb {
  transition: all 0.3s ease;
}
</style>
