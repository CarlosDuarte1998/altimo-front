<script setup>
import { useConfigStore } from '#imports';

const configStore = useConfigStore();

// Cargar configuraciones al montar
onMounted(async () => {
  if (!configStore.hasDataLoaded) {
    await configStore.fetchConfiguraciones();
  }
});

// Computed para las aseguradoras
const insurances = computed(() => configStore.insurance || []);
</script>


<template>
    <!-- Version Desktop con UMarquee -->
    <div class="hidden lg:block py-8 w-full">
        <UMarquee 
            v-if="insurances.length > 0"
            :pause-on-hover="false"
            :ui="{
                root: '[--duration:60s]',
                content: 'gap-[70px]'
            }"
        >
            <div 
                v-for="(item, index) in insurances" 
                :key="index"
                class="logo-item"
            >
                <img 
                    :src="item.imagen" 
                    :alt="item.nombre || 'Logo aseguradora'" 
                    class="logo-desktop"
                    loading="lazy"
                />
            </div>
        </UMarquee>
        
        <!-- Fallback si no hay logos -->
        <div v-else class="text-center text-gray-500">
            Cargando aseguradoras...
        </div>
    </div>

    <!-- Version Mobile (sin cambios) -->
    <div class="lg:hidden">
        <div class="grid grid-cols-2 px-5">
            <template v-for="(item, index) in insurances" :key="index">
               <div class="flex justify-center items-center py-4">
                 <img 
                    :src="item.imagen" 
                    :alt="item.nombre || 'Logo aseguradora'" 
                    class="logos-mobile" 
                    loading="lazy" 
                 />
               </div>
            </template>
        </div>
        
        <!-- Fallback mobile -->
        <div v-if="insurances.length === 0" class="text-center text-gray-500 py-8">
            Cargando aseguradoras...
        </div>
    </div>
</template>

<style scoped>
/* Desktop logos */
.logo-item {
    padding: 0 35px;
}

.logo-desktop {
    width: 150px;
    height: 150px;
    object-fit: contain;
}

/* Mobile logos */
.logos-mobile {
    display: inline-block;
    width: 150px;
    aspect-ratio: 1/1;
    object-fit: contain;
}
</style>