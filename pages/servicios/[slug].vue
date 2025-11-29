<template>
    <section class="bg-[#213364] py-16 text-white">
        <div class="container px-4 md:px-6">
            <div class="mx-auto max-w-3xl text-center">
                <div v-if="categoriesStore.isLoading" class="animate-pulse">
                    <div class="h-8 bg-blue-800 rounded w-3/4 mx-auto mb-4"></div>
                    <div class="h-4 bg-blue-800 rounded w-1/2 mx-auto"></div>
                </div>
                <div v-else-if="currentCategory">
                    <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        {{ currentCategory.name }}
                    </h1>
                    <p v-if="currentCategory.description" class="mt-4 text-blue-100 md:text-xl">
                        {{ currentCategory.description }}
                    </p>
                </div>
                <div v-else>
                    <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Categoría no encontrada
                    </h1>
                    <p class="mt-4 text-blue-100 md:text-xl">
                        La categoría que buscas no existe o ha sido removida.
                    </p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Services Content -->
    <section class="py-16">
        <div class="container max-w-[1300px] mx-auto px-4 md:px-6">
            
            
            <!-- Tabs para Laboratorio Clínico -->
            <div v-if="isLaboratorioClinico && !categoriesStore.isLoading">
                <UTabs 
                    :items="labTabItems" 
                    variant="link" 
                    color="primary"
                    :ui="{
                        indicator: 'bg-blue-600',
                        trigger: 'data-[state=active]:text-blue-600 hover:text-blue-600'
                    }"
                    class="w-full"
                >
                    <!-- Tab: Estudios -->
                    <template #estudios>
                        <div class="mt-6">
                            <!-- Empty State -->
                            <div v-if="!estudiosServices || estudiosServices.length === 0" class="text-center py-12">
                                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <p class="text-lg font-semibold text-gray-900">No hay estudios disponibles</p>
                                <p class="text-gray-500">Esta categoría no tiene estudios configurados.</p>
                            </div>

                            <!-- Services Grid -->
                            <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <NuxtLink 
                                    v-for="service in estudiosServices" 
                                    :key="service.id" 
                                    :to="`/servicios/${route.params.slug}/${service.slug}`"
                                    class="service-card rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer block"
                                >
                                    <!-- Service Image -->
                                    <div class="h-48 overflow-hidden relative">
                                        <img 
                                            v-if="service.featured_image" 
                                            :src="service.featured_image" 
                                            :alt="service.featured_image_alt || service.title?.rendered || 'Imagen del servicio'"
                                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                            @error="handleImageError"
                                        >
                                        <div v-else class="image-placeholder w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                            <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                        </div>
                                        <div class="image-placeholder w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center absolute inset-0" style="display: none;">
                                            <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <!-- Service Content -->
                                    <div class="p-6">
                                        <h3 class="text-xl font-semibold text-gray-900 mb-2">
                                            {{ service.title?.rendered || 'Sin título' }}
                                        </h3>
                                        <div 
                                            v-if="service.excerpt?.rendered" 
                                            class="text-sm text-gray-600 line-clamp-3"
                                            v-html="service.excerpt.rendered"
                                        ></div>
                                        <p v-else class="text-sm text-gray-600 line-clamp-3">
                                            Servicio de diagnóstico especializado
                                        </p>
                                        
                                        <div class="mt-4 flex items-center text-blue-600 font-medium text-sm">
                                            Ver detalles
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </template>

                    <!-- Tab: Perfiles -->
                    <template #perfiles>
                        <div class="mt-6">
                            <!-- Loading State para Perfiles -->
                            <div v-if="isLoadingPerfiles">
                                <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <div v-for="n in 6" :key="n" class="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
                                        <div class="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 p-6 h-24 animate-shimmer"></div>
                                        <div class="p-6">
                                            <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-md animate-shimmer skeleton-line mb-3"></div>
                                            <div class="space-y-2">
                                                <div class="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer skeleton-line"></div>
                                                <div class="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer skeleton-line"></div>
                                                <div class="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 animate-shimmer skeleton-line"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Error State para Perfiles -->
                            <div v-else-if="perfilesError" class="text-center py-12">
                                <div class="text-red-600 mb-4">
                                    <svg class="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                    </svg>
                                    <p class="text-lg font-semibold">Error al cargar los perfiles</p>
                                    <p class="text-sm text-gray-500">{{ perfilesError }}</p>
                                </div>
                                <button @click="loadPerfiles" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    Reintentar
                                </button>
                            </div>

                            <!-- Perfiles Content -->
                            <div v-else>
                                <!-- Empty State -->
                                <div v-if="perfiles.length === 0" class="text-center py-12">
                                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                    <p class="text-lg font-semibold text-gray-900">No hay perfiles disponibles</p>
                                    <p class="text-gray-500">Por favor, inténtalo más tarde.</p>
                                </div>

                                <!-- Perfiles Grid -->
                                <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <div 
                                        v-for="perfil in perfiles" 
                                        :key="perfil.id"
                                        class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
                                    >
                                        <!-- Header with description -->
                                        <div class="border-b border-gray-100 p-6">
                                            <div class="flex items-start gap-3 mb-3">
                                                <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                    <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div class="flex-1">
                                                    <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ perfil.nombre }}</h3>
                                                    <p class="text-sm text-gray-500">{{ perfil.descripcion }}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Body -->
                                        <div class="p-6">
                                            <h4 class="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">Exámenes incluidos</h4>
                                            
                                            <!-- Lista de exámenes -->
                                            <ul v-if="perfil.examenes && perfil.examenes.length > 0" class="space-y-2.5">
                                                <li 
                                                    v-for="(examen, index) in perfil.examenes" 
                                                    :key="index"
                                                    class="flex items-start gap-2.5 text-sm text-gray-700"
                                                >
                                                    <UIcon name="i-heroicons-check-circle-solid" class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                                    <span class="leading-relaxed">{{ examen }}</span>
                                                </li>
                                            </ul>
                                            
                                            <!-- Sin exámenes -->
                                            <p v-else class="text-sm text-gray-400 italic">
                                                No hay exámenes especificados para este perfil.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </UTabs>
            </div>
            
            <!-- Contenido para Hospitalización -->
<div v-else-if="isHospitalizacion && !categoriesStore.isLoading">
  <section class="py-16">
        <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
            <div class="grid gap-12 md:grid-cols-2">
                <div>
                    <h2 class="mb-6 text-2xl font-bold tracking-tight text-[#213364] sm:text-3xl text-center">Hospitalización Áltimo</h2>
                    <div class="space-y-4 text-gray-600 text-lg">
                        <p>Hemos creado nuestro servicio de hospitalización, diseñándolo para brindar comodidad, seguridad y atención constante. Cada habitación es un espacio privado, amplio y equipado para asegurar una experiencia de bienestar y confianza a nuestros pacientes y sus acompañantes.</p>
                    </div>
                </div>
                <div class="flex items-center justify-center"><img alt="Instalaciones de ALTIMO" loading="lazy"
                        width="500" height="400" decoding="async" data-nimg="1" class="rounded-lg object-cover"
                        src="https://admin-altimo.gunssoft.tech/wp-content/uploads/2025/09/Edificio2-scaled-e1757734412469.jpg"
                        style="color: transparent;"></div>
            </div>
            <div class="col-span-12 mt-5">
                <h2 class="mb-6 text-2xl font-bold tracking-tight text-[#213364] sm:text-3xl text-center">
                    Atención Especializada y Continua
                </h2>
                <div class="space-y-2 text-gray-600 text-lg">
                    <p>
                         Nuestros profesionales de la salud están disponibles las 24 horas para brindar acompañamiento cercano, realizar monitoreo constante y responder de manera oportuna ante cualquier cambio en el estado de salud del paciente.
                         <br></br><br></br>
                         Cuenta con estaciones de enfermería en el segundo y tercer nivel para apoyar el área de habitaciones y un sistema de comunicación que permite al paciente contacto permanente, garantizando seguridad, control y una atención verdaderamente personalizada.
                    </p>
                </div>
            </div>

            <div class="col-span-12 mt-10">
                <h2 class="mb-6 text-2xl font-bold tracking-tight text-[#213364] sm:text-3xl text-center">
                   Excelencia Médica y Tecnología Avanzada
                </h2>
                <div class="space-y-2 text-gray-600 text-lg">
                    <p>
                         Contamos con médicos especialistas, protocolos clínicos seguros y tecnología de última generación que permiten tratamientos precisos y adecuados para cada patología. Nuestro liderazgo médico y el talento del personal se reflejan en una atención confiable, humana y eficiente.
                    </p>
                </div>
            </div>

            <!-- <div class="grid gap-12 md:grid-cols-2 mt-10">
                <div class="flex items-center">
                    <h2 class="mb-6 text-3xl font-bold tracking-tight text-[#213364] sm:text-3xl leading-relaxed">
                        Nuestros quirófanos han sido certificados por el CSSP cumpliendo con protocolos de cirugía segura.
                    </h2>
                </div>
                <div class="flex items-center justify-center"><img alt="Instalaciones de ALTIMO" loading="lazy"
                        width="500" height="400" decoding="async" data-nimg="1" class="rounded-lg object-cover"
                        src="https://admin-altimo.gunssoft.tech/wp-content/uploads/2025/10/Quirofanos1.jpg"
                        style="color: transparent;"></div>
            </div> -->

            <div class="col-span-12 mt-10">
    <h2 class="mb-6 text-2xl font-bold tracking-tight text-[#213364] sm:text-3xl text-center">
      Privacidad, Exclusividad y Confort
    </h2>
    <div class="space-y-2 text-gray-600 text-lg">
        <p>
             Brindamos un ambiente exclusivo con total privacidad y discreción. Cada habitación está diseñada para asegurar que el paciente pueda vivir su proceso de recuperación en un espacio tranquilo, seguro y sin interrupciones, el ruido de cada habitación ha sido aislado con paredes especiales.
             <br></br><br></br>
             Controlamos cuidadosamente el acceso a las áreas de hospitalización y manejamos la información clínica con absoluta confidencialidad, garantizando que cada detalle de la estancia se mantenga en un entorno reservado y respetuoso.
        </p>
    </div>
</div>

<div class="col-span-12 mt-10">
    <h2 class="mb-6 text-2xl font-bold tracking-tight text-[#213364] sm:text-3xl text-center">
        ¿Qué incluye la hospitalización?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <!-- 1. Seguridad y comodidad básica -->
        <div>
            <h3 class="text-xl font-semibold text-[#213364] mb-4">Seguridad y comodidad básica</h3>
            <ul class="space-y-2 text-gray-700">
                <li>✓ Cama hospitalaria</li>
                <li>✓ Baño privado con agua caliente y barras de seguridad</li>
                <li>✓ Sistema de detección de incendios</li>
            </ul>
        </div>

        <!-- 2. Atención clínica personalizada -->
        <div>
            <h3 class="text-xl font-semibold text-[#213364] mb-4">Atención clínica personalizada</h3>
            <ul class="space-y-2 text-gray-700">
                <li>✓ Alimentación personalizada supervisada por nutricionista</li>
                <li>✓ Limpieza diaria</li>
                <li>✓ Intercomunicador (comunicación directa con enfermería)</li>
            </ul>
        </div>

        <!-- 3. Comodidad para el paciente y acompañante -->
        <div>
            <h3 class="text-xl font-semibold text-[#213364] mb-4">Comodidad para el paciente y acompañante</h3>
            <ul class="space-y-2 text-gray-700">
                <li>✓ Aire acondicionado</li>
                <li>✓ Sofá cama para acompañante</li>
                <li>✓ Clóset privado</li>
                <li>✓ Refrigeradora</li>
                <li>✓ Televisión</li>
                <li>✓ Wifi gratuito</li>
            </ul>
        </div>

        <!-- 4. Servicios adicionales y experiencia premium -->
        <div>
            <h3 class="text-xl font-semibold text-[#213364] mb-4">Servicios adicionales y experiencia premium</h3>
            <ul class="space-y-2 text-gray-700">
                <li>✓ Kit de bienvenida</li>
                <li>✓ Servicio de lavandería</li>
                <li>✓ Servicio de cafetería para acompañantes</li>
            </ul>
        </div>

        <!-- 5. Organización y convivencia -->
        <div>
            <h3 class="text-xl font-semibold text-[#213364] mb-4">Organización y convivencia</h3>
            <ul class="space-y-2 text-gray-700">
                <li>✓ Control de visita según instrucciones del paciente</li>
            </ul>
        </div>

    </div>
</div>


        </div>
    </section>
</div>


            <!-- Contenido normal para otras categorías -->
            <div v-else>
                <!-- Loading State -->
                <div v-if="categoriesStore.isLoading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="n in 6" :key="n" class="rounded-lg border border-gray-200 bg-white shadow-sm animate-pulse overflow-hidden">
                    <div class="h-48 bg-gray-300"></div>
                    <div class="p-6">
                        <div class="h-6 bg-gray-300 rounded mb-2"></div>
                        <div class="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
            
            <!-- Error State -->
            <div v-else-if="categoriesStore.error" class="text-center py-12">
                <div class="text-red-600 mb-4">
                    <svg class="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <p class="text-lg font-semibold">Error al cargar los servicios</p>
                    <p class="text-sm text-gray-500">{{ categoriesStore.error }}</p>
                </div>
                <button @click="loadServices" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Reintentar
                </button>
            </div>

            <!-- Empty State -->
            <div v-else-if="!services || services.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-lg font-semibold text-gray-900">No hay servicios disponibles</p>
                <p class="text-gray-500">Esta categoría no tiene servicios configurados.</p>
                <NuxtLink to="/servicios" class="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Ver todas las categorías
                </NuxtLink>
            </div>

            <!-- Services Grid -->
            <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <NuxtLink 
                    v-for="service in services" 
                    :key="service.id" 
                    :to="`/servicios/${route.params.slug}/${service.slug}`"
                    class="service-card rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer block"
                >
                    <!-- Service Image -->
                    <div class="h-48 overflow-hidden relative">
                        <img 
                            v-if="service.featured_image" 
                            :src="service.featured_image" 
                            :alt="service.featured_image_alt || service.title?.rendered || 'Imagen del servicio'"
                            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            @error="handleImageError"
                        >
                        <div v-else class="image-placeholder w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                            <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <!-- Placeholder oculto para errores de carga -->
                        <div class="image-placeholder w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center absolute inset-0" style="display: none;">
                            <svg class="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                    </div>
                    
                    <!-- Service Content -->
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-4">{{ service.title?.rendered || service.title || 'Sin título' }}</h3>
                        <div class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                            Ver detalles →
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <!-- Back to Services -->
            <div class="text-center mt-12">
                <NuxtLink to="/servicios" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    Volver a todas las categorías
                </NuxtLink>
            </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const route = useRoute()
const categoriesStore = useCategoriesStore()

// Composable para perfiles
const { getPerfiles } = usePerfiles()

// Variables reactivas
const services = ref([])
const perfiles = ref([])
const isLoadingPerfiles = ref(false)
const perfilesError = ref(null)

// Computed para verificar si es Laboratorio Clínico
const isLaboratorioClinico = computed(() => {
  return currentCategory.value && (
    currentCategory.value.id === 21 ||
    currentCategory.value.id === '21' ||
    currentCategory.value.slug === 'laboratorio-clinico'
  )
})

const isHospitalizacion = computed(() => {
  return currentCategory.value && (
    currentCategory.value.id === 22 ||
    currentCategory.value.id === '22' ||
    currentCategory.value.slug === 'hospitalizacion'
  )
})

// Computed para servicios de estudios (sin perfiles)
const estudiosServices = computed(() => {
  if (!isLaboratorioClinico.value) return []
  return services.value
})

// Configuración de tabs para Laboratorio Clínico
const labTabItems = [
  {
    key: 'estudios',
    label: 'Estudios',
    icon: 'i-heroicons-beaker',
    slot: 'estudios'
  },
  {
    key: 'perfiles',
    label: 'Perfiles',
    icon: 'i-heroicons-document-text',
    slot: 'perfiles'
  }
]

// Computed para obtener la categoría actual
const currentCategory = computed(() => {
  return categoriesStore.getCategoryBySlug(route.params.slug)
})

// Función para cargar servicios
const loadServices = async () => {
  if (!currentCategory.value) return
  
  try {
    const response = await categoriesStore.fetchCategoryServices(currentCategory.value.id)
    // Validar que la respuesta sea un array y tenga datos válidos
    if (Array.isArray(response)) {
      // Filtrar servicios que NO pertenezcan a la categoría "Perfiles" (ID: 25)
      const filteredServices = response.filter(service => {
        // Si el servicio tiene categorías, verificar que no incluya la categoría Perfiles
        if (service.categoria && Array.isArray(service.categoria)) {
          return !service.categoria.includes(25) && !service.categoria.includes('25')
        }
        return true
      })
      
      services.value = filteredServices.map(service => ({
        ...service,
        // Asegurar que title existe
        title: service.title || { rendered: service.name || 'Sin título' },
        // Asegurar que excerpt existe
        excerpt: service.excerpt || { rendered: service.description || '' },
        // Asegurar que slug existe
        slug: service.slug || service.id || 'sin-slug',
        // Asegurar que la imagen existe (ya viene del store)
        featured_image: service.featured_image || null,
        featured_image_large: service.featured_image_large || null,
        featured_image_alt: service.featured_image_alt || 'Imagen del servicio'
      }))
    } else {
      services.value = []
    }
  } catch (error) {
    console.error('Error al cargar servicios:', error)
    services.value = []
  }
}

// Función para cargar perfiles
const loadPerfiles = async () => {
  isLoadingPerfiles.value = true
  perfilesError.value = null
  
  try {
    const data = await getPerfiles()
    perfiles.value = data
  } catch (error) {
    console.error('Error al cargar perfiles:', error)
    perfilesError.value = 'Error al cargar los perfiles. Por favor, inténtalo más tarde.'
  } finally {
    isLoadingPerfiles.value = false
  }
}

// Función para manejar errores de carga de imagen
const handleImageError = (event) => {
  const img = event.target
  const serviceCard = img.closest('.service-card')
  if (serviceCard) {
    // Ocultar la imagen y mostrar el placeholder
    img.style.display = 'none'
    const placeholder = serviceCard.querySelector('.image-placeholder')
    if (placeholder) {
      placeholder.style.display = 'flex'
    }
  }
}

// Cargar datos al montar el componente
onMounted(async () => {
  // Cargar categorías si no están disponibles
  if (!categoriesStore.hasCategories) {
    await categoriesStore.fetchCategories()
  }
  
  // Verificar si la categoría es "Perfiles" y redirigir
  const category = categoriesStore.getCategoryBySlug(route.params.slug)
  if (category && (category.id === 25 || category.id === '25' || category.slug === 'perfiles')) {
    // Redirigir a la página de servicios con el tab de perfiles
    navigateTo('/servicios')
    return
  }
  
  // Cargar servicios de la categoría actual
  await loadServices()
  
  // Si es Laboratorio Clínico, también cargar perfiles
  if (isLaboratorioClinico.value) {
    await loadPerfiles()
  }
})

// Watcher para recargar servicios cuando cambie la ruta
watch(() => route.params.slug, async (newSlug) => {
  // Verificar si la nueva ruta es "Perfiles" y redirigir
  const category = categoriesStore.getCategoryBySlug(newSlug)
  if (category && (category.id === 25 || category.id === '25' || category.slug === 'perfiles')) {
    navigateTo('/servicios')
    return
  }
  
  await loadServices()
  
  // Si es Laboratorio Clínico, también cargar perfiles
  if (isLaboratorioClinico.value) {
    await loadPerfiles()
  }
})

// Meta tags dinámicos
useSeoMeta({
  title: computed(() => currentCategory.value ? `${currentCategory.value.name} - ALTIMO` : 'Categoría no encontrada - ALTIMO'),
  description: computed(() => currentCategory.value?.description || 'Servicios de diagnóstico por imagen especializados'),
  ogTitle: computed(() => currentCategory.value ? `${currentCategory.value.name} - ALTIMO` : 'Categoría no encontrada - ALTIMO'),
  ogDescription: computed(() => currentCategory.value?.description || 'Servicios médicos especializados en diagnóstico por imagen'),
  ogImage: computed(() => currentCategory.value?.imagen_url || '/logo-horizontal.png'),
  twitterCard: 'summary_large_image'
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
