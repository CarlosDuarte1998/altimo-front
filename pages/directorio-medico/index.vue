<template>
    <!-- Hero Section -->
    <section class="bg-[#213364] py-16 text-white">
        <div class="container px-4 md:px-6">
            <div class="mx-auto max-w-3xl text-center">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Directorio Médico</h1>
                <p class="mt-4 text-blue-100 md:text-xl">
                    Conoce a nuestros profesionales médicos aliados, comprometidos con la excelencia, brindan confianza y atención especial.
                </p>
            </div>
        </div>
    </section>

    <!-- Médicos Section -->
    <section class="py-16">
        <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
            <!-- Barra de Búsqueda -->
            <div class="mb-8">
                <div class="relative max-w-md mx-auto">
                    <input
                        v-model="searchTerm"
                        @input="handleSearch"
                        type="text"
                        placeholder="Buscar por nombre o especialidad..."
                        class="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    >
                    <UIcon 
                        name="i-heroicons-magnifying-glass" 
                        class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" 
                    />
                    <button
                        v-if="searchTerm"
                        @click="clearSearch"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <UIcon name="i-heroicons-x-mark" class="h-4 w-4 text-gray-400" />
                    </button>
                </div>
            </div>

            <!-- Título de Resultados -->
            <div v-if="medicosStore.hasMedicos" class="mb-8">
                <h2 class="text-2xl font-bold tracking-tight text-[#213364] sm:text-3xl">
                    {{ searchTerm ? `Resultados para "${searchTerm}"` : 'Nuestro Equipo Médico' }}
                </h2>
                <p v-if="filteredMedicos.length > 0" class="text-gray-600 mt-2">
                    {{ filteredMedicos.length }} {{ filteredMedicos.length === 1 ? 'médico encontrado' : 'médicos encontrados' }}
                </p>
                <div class="h-[1px] w-full bg-gray-200 mt-4"></div>
            </div>

            <!-- Estado de Carga -->
            <div v-if="medicosStore.isLoading" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div v-for="i in 4" :key="i" class="text-center">
                    <USkeleton class="mx-auto mb-4 h-40 w-40 rounded-full" />
                    <USkeleton class="h-6 w-32 mx-auto mb-2" />
                    <USkeleton class="h-4 w-24 mx-auto mb-2" />
                    <USkeleton class="h-16 w-full" />
                </div>
            </div>

            <!-- Mensaje de Error -->
            <div v-else-if="medicosStore.error" class="text-center py-12">
                <UIcon name="i-heroicons-exclamation-triangle" class="text-red-500 text-5xl mb-4" />
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Error al cargar el directorio</h3>
                <p class="text-gray-600 mb-4">{{ medicosStore.error }}</p>
                <UButton @click="medicosStore.fetchMedicos()" color="primary">
                    Reintentar
                </UButton>
            </div>

            <!-- Sin Médicos -->
            <div v-else-if="!medicosStore.hasMedicos" class="text-center py-12">
                <UIcon name="i-heroicons-user-group" class="text-gray-400 text-5xl mb-4" />
                <h3 class="text-xl font-semibold text-gray-900 mb-2">No hay médicos disponibles</h3>
                <p class="text-gray-600">El directorio médico estará disponible pronto.</p>
            </div>

            <!-- Sin Resultados -->
            <div v-if="searchTerm && filteredMedicos.length === 0 && !medicosStore.isLoading" class="text-center py-12">
                <UIcon name="i-heroicons-magnifying-glass" class="text-gray-400 text-5xl mb-4" />
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Sin resultados</h3>
                <p class="text-gray-600 mb-4">No encontramos médicos que coincidan con "{{ searchTerm }}"</p>
                <UButton @click="clearSearch" color="primary" variant="outline">
                    Mostrar todos los médicos
                </UButton>
            </div>

            <!-- Grid de Médicos -->
            <div v-else-if="filteredMedicos.length > 0" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div v-for="medico in filteredMedicos" :key="medico.id"
                    class="text-center group cursor-pointer transition-transform duration-300 hover:scale-105">
                    <!-- Imagen del Médico -->
                    <div
                        class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
                        <img :alt="medico.nombre" loading="lazy" width="160" height="160"
                            class="h-full w-full object-cover" :src="medico.imagen" @error="handleImageError">
                    </div>

                    <!-- Información del Médico -->
                    <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {{ medico.nombre }}
                    </h3>

                    <p class="text-sm font-medium text-blue-600 mt-1">
                        {{ getEspecialidadName(medico) }}
                    </p>

                    <!-- Botón Ver Perfil -->
                    <UButton @click="openMedicoModal(medico)"
                        class="mt-4 bg-blue-600 hover:bg-blue-700 text-white border-0" size="sm">
                        Ver Perfil
                    </UButton>
                </div>
            </div>
        </div>
    </section>

    <!-- Modal del Médico -->
    <UModal v-model:open="isModalOpen"
        :title="selectedMedico ? selectedMedico.nombre : 'Perfil Médico'"
        :description="selectedMedico ? getEspecialidadName(selectedMedico) : ''" :ui="{
            content: 'w-[calc(100vw-2rem)] max-w-4xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden',
            body: 'max-h-[calc(100dvh-16rem)] overflow-y-auto modal-body-scroll'
        }">
        <template #body="{ close }">
            <div v-if="selectedMedico" class="space-y-6 pr-2">
                <!-- Imagen y Datos Básicos -->
                <div class="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <div class="flex-shrink-0">
                        <div class="h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full ring-4 ring-blue-100">
                            <img :alt="selectedMedico.nombre" class="h-full w-full object-cover"
                                :src="selectedMedico.imagen" @error="handleImageError">
                        </div>
                    </div>

                    <div class="flex-1 text-center sm:text-left">
                        <h2 class="text-2xl font-bold text-gray-900">{{ selectedMedico.nombre }}</h2>
                        <p class="text-lg text-blue-600 font-medium mt-1">
                            {{ getEspecialidadName(selectedMedico) }}
                        </p>

                        <!-- Información de Contacto -->
                        <div v-if="selectedMedico.telefono || selectedMedico.email" class="mt-1 space-y-1">
                            <div v-if="selectedMedico.direccion"
                                class="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                                <UIcon name="heroicons:map-pin" class="text-blue-500" />
                                <span>{{ selectedMedico.direccion }}</span>
                            </div>
                            <div v-if="selectedMedico.celular"
                                class="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                                <UIcon name="heroicons:device-phone-mobile" class="text-blue-500" />
                                <span>{{ selectedMedico.celular }}</span>
                            </div>
                            <div v-if="selectedMedico.telefono"
                                class="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                                <UIcon name="i-heroicons-phone" class="text-blue-500" />
                                <span>{{ selectedMedico.telefono }}</span>
                            </div>
                            <!-- <div v-if="selectedMedico.email" class="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600">
                                <UIcon name="i-heroicons-envelope" class="text-blue-500" />
                                <span>{{ selectedMedico.email }}</span>
                            </div> -->
                        </div>
                    </div>
                </div>

                <!-- Descripción -->
                <div v-if="selectedMedico.descripcion" class="border-t pt-2">
                    <h4 class="text-lg font-semibold text-gray-900 mb-1">Acerca de</h4>
                    <p class="text-gray-700 leading-relaxed text-justify">{{ selectedMedico.descripcion }}</p>
                </div>
                <!-- Servicios -->
                <!-- <div v-if="selectedMedico.servicios" class="border-t pt-4">
                    <h4 class="text-lg font-semibold text-gray-900 mb-3">Servicios</h4>
                    <p class="text-gray-700 leading-relaxed text-justify">{{ selectedMedico.servicios }}</p>
                </div> -->
                <div v-if="selectedMedico.servicios" class="border-t pt-2">
                    <h4 class="text-lg font-semibold text-gray-900 mb-1">Servicios</h4>
                    <ul class="list-disc list-inside text-gray-700 leading-relaxed">
                        <li v-for="(servicio, index) in selectedMedico.servicios
                            .split('-')
                            .map(s => s.trim())
                            .filter(s => s.length > 0)" :key="index">
                            {{ servicio }}
                        </li>
                    </ul>
                </div>

                <!-- Educación -->
                <div v-if="selectedMedico.educacion && selectedMedico.educacion.length > 0" class="border-t pt-4">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <UIcon name="i-heroicons-academic-cap" class="text-blue-500" />
                        Educación
                    </h4>
                    <ul class="list-disc list-inside space-y-1 text-gray-700">
                        <li v-for="(edu, index) in selectedMedico.educacion" :key="index">{{ edu }}</li>
                    </ul>
                </div>

                <!-- Certificaciones -->
                <div v-if="selectedMedico.certificaciones && selectedMedico.certificaciones.length > 0"
                    class="border-t pt-4">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <UIcon name="i-heroicons-check-badge" class="text-blue-500" />
                        Certificaciones
                    </h4>
                    <ul class="list-disc list-inside space-y-1 text-gray-700">
                        <li v-for="(cert, index) in selectedMedico.certificaciones" :key="index">{{ cert }}</li>
                    </ul>
                </div>

                <!-- Experiencia -->
                <div v-if="selectedMedico.experiencia" class="border-t pt-4">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <UIcon name="i-heroicons-briefcase" class="text-blue-500" />
                        Experiencia
                    </h4>
                    <p class="text-gray-700">{{ selectedMedico.experiencia }}</p>
                </div>

                <!-- Horarios -->
                <div v-if="selectedMedico.horarios" class="border-t pt-4">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <UIcon name="i-heroicons-clock" class="text-blue-500" />
                        Horarios de Atención
                    </h4>
                    <p class="text-gray-700">{{ selectedMedico.horarios }}</p>
                </div>
            </div>
        </template>

        <template #footer="{ close }">
            <div class="flex justify-end">
                <UButton @click="close" color="neutral" variant="outline">
                    Cerrar
                </UButton>
            </div>
        </template>
    </UModal>
</template>

<script setup lang="ts">
import { useMedicosStore } from '~/stores/medicos'

// Interfaces
interface Medico {
    id: number
    nombre: string
    slug: string
    link: string
    especialidad: string
    descripcion: string
    descripcionBreve: string
    cargo: string
    imagen: string
    telefono: string
    email: string
    educacion: string[]
    experiencia: string
    certificaciones: string[]
    horarios: string
    acf: any
    direccion: string
    celular: string
    servicios: string
}

const { corporateInfo, getKeywordsString, generateDescription } = useALTIMOSEO()
const medicosStore = useMedicosStore()

// Estado para búsqueda y modal
const searchTerm = ref('')
const searchTimeout = ref<NodeJS.Timeout | null>(null)
const isModalOpen = ref(false)
const selectedMedico = ref<Medico | null>(null)

// Función para normalizar texto (remover acentos y convertir a minúsculas)
const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9\s]/g, '') // Remover caracteres especiales
        .trim()
}

// Función para obtener el nombre de la especialidad 
const getEspecialidadName = (medico: Medico) => {
    return medico.especialidad || 'Especialidad no especificada'
}

// Computed para médicos filtrados
const filteredMedicos = computed(() => {
    if (!searchTerm.value.trim()) {
        return medicosStore.medicosByName as Medico[]
    }
    
    const normalizedTerm = normalizeText(searchTerm.value)
    const searchWords = normalizedTerm.split(' ').filter(word => word.length > 0)
    
    return (medicosStore.medicosByName as Medico[]).filter(medico => {
        const normalizedNombre = normalizeText(medico.nombre)
        const normalizedEspecialidad = normalizeText(getEspecialidadName(medico))
        const fullText = `${normalizedNombre} ${normalizedEspecialidad}`
        
        // Buscar si todas las palabras están presentes en el texto completo
        return searchWords.every(word => 
            fullText.includes(word)
        )
    })
})

// Función de búsqueda con debounce
const handleSearch = () => {
    if (searchTimeout.value) {
        clearTimeout(searchTimeout.value)
    }
    
    searchTimeout.value = setTimeout(() => {
        // La búsqueda se maneja automáticamente con el computed filteredMedicos
    }, 300)
}

// Limpiar búsqueda
const clearSearch = () => {
    searchTerm.value = ''
}

// Cargar médicos al montar el componente
onMounted(async () => {
    await medicosStore.fetchMedicos()
})

// Función para abrir el modal con los datos del médico
const openMedicoModal = (medico: Medico) => {
    selectedMedico.value = medico
    isModalOpen.value = true
}

// Limpiar médico seleccionado cuando se cierra el modal
watch(isModalOpen, (newValue) => {
    if (!newValue) {
        setTimeout(() => {
            selectedMedico.value = null
        }, 300)
    }
})

// Limpiar timeout al desmontar
onBeforeUnmount(() => {
    if (searchTimeout.value) {
        clearTimeout(searchTimeout.value)
    }
})

// Manejo de error de imagen
const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    target.src = '/placeholder.svg'
}

// SEO optimizado para página "Directorio Médico"
useSeoMeta({
    title: `Directorio Médico | ${corporateInfo.name}`,
    description: generateDescription(`Conoce a nuestro equipo médico especializado en ${corporateInfo.name}. Profesionales comprometidos con la excelencia en diagnóstico por imágenes en Santa Ana, El Salvador.`),
    keywords: getKeywordsString([
        'médicos especialistas Santa Ana',
        'radiólogos El Salvador',
        'equipo médico ALTIMO',
        'directorio médico Santa Ana',
        'especialistas diagnóstico por imágenes',
        'cardiólogos Santa Ana',
        'médicos certificados El Salvador'
    ]),
    ogTitle: `Directorio Médico - ${corporateInfo.shortName} Centro de Imágenes Santa Ana`,
    ogDescription: `Conoce a nuestro equipo de profesionales médicos especializados en ${corporateInfo.name}, comprometidos con la excelencia médica en Santa Ana, El Salvador.`,
    ogImage: `${corporateInfo.website}/logo-horizontal.png`,
    ogUrl: `${corporateInfo.website}/directorio-medico`
})

// Schema.org para página de equipo médico
useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'MedicalOrganization',
                name: corporateInfo.name,
                description: `Equipo médico especializado de ${corporateInfo.name}`,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: corporateInfo.address,
                    addressLocality: 'Santa Ana',
                    addressCountry: 'El Salvador'
                },
                // Agregar médicos dinámicamente cuando estén disponibles
                ...(medicosStore.hasMedicos && {
                    employee: medicosStore.medicosByName.map((medico: Medico) => ({
                        '@type': 'Physician',
                        name: medico.nombre,
                        medicalSpecialty: medico.especialidad || medico.cargo,
                        ...(medico.imagen && medico.imagen !== '/placeholder.svg' && {
                            image: medico.imagen
                        })
                    }))
                })
            })
        }
    ]
})
</script>