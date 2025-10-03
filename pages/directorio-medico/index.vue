<template class="flex flex-col items-center justify-center gap-4 px-4 py-8 md:px-6 lg:px-8 max-w-[1380px] mx-auto">
    <section class="bg-blue-900 py-16 text-white">
        <div class="container px-4 md:px-6">
            <div class="mx-auto max-w-3xl text-center">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Directorio Médico</h1>
                <p class="mt-4 text-blue-100 md:text-xl">Conoce más sobre <b>ÁLTIMO</b>, nuestro compromiso con la
                    excelencia médica y la atención humanizada.</p>
            </div>
        </div>
    </section>


    <section class="py-16">
        <div class="container px-4 md:px-6 max-w-[1300px] mx-auto">
            
            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div class="text-center">
                    <div class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                        <img alt="Dr. Roberto Martínez" loading="lazy" width="160" height="160" decoding="async"
                            data-nimg="1" class="h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=160&h=160&fit=crop&crop=face&auto=format"
                            style="color: transparent;">
                    </div>
                    <h3 class="text-lg font-medium">Dr. Roberto Martínez</h3>
                    <p class="text-sm text-gray-500">Director Médico</p>
                    <p class="mt-2 text-sm text-gray-600">Especialista en Radiología Diagnóstica con más de 20 años de
                        experiencia en tomografía computarizada.</p>
                </div>
                <div class="text-center">
                    <div class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                        <img alt="Dra. María Elena García" loading="lazy" width="160" height="160" decoding="async"
                            data-nimg="1" class="h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&h=160&fit=crop&crop=face&auto=format"
                            style="color: transparent;">
                    </div>
                    <h3 class="text-lg font-medium">Dra. María Elena García</h3>
                    <p class="text-sm text-gray-500">Radióloga Especialista</p>
                    <p class="mt-2 text-sm text-gray-600">Experta en Radiología Intervencionista y Diagnóstico por
                        Imagen con certificación internacional.</p>
                </div>
                <div class="text-center">
                    <div class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                        <img alt="Dr. Carlos Hernández" loading="lazy" width="160" height="160" decoding="async"
                            data-nimg="1" class="h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=160&h=160&fit=crop&crop=face&auto=format"
                            style="color: transparent;">
                    </div>
                    <h3 class="text-lg font-medium">Dr. Carlos Hernández</h3>
                    <p class="text-sm text-gray-500">Cardiólogo Intervencionista</p>
                    <p class="mt-2 text-sm text-gray-600">Especialista en Cardiología Intervencionista y Tomografía
                        Cardíaca con más de 15 años de experiencia.</p>
                </div>
                <div class="text-center">
                    <div class="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                        <img alt="Dra. Ana Sofía López" loading="lazy" width="160" height="160" decoding="async"
                            data-nimg="1" class="h-full w-full object-cover"
                            src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=160&h=160&fit=crop&crop=face&auto=format"
                            style="color: transparent;">
                    </div>
                    <h3 class="text-lg font-medium">Dra. Ana Sofía López</h3>
                    <p class="text-sm text-gray-500">Radióloga Ginecológica</p>
                    <p class="mt-2 text-sm text-gray-600">Especialista en Ultrasonidos Ginecológicos, Obstétricos y
                        Mamografía Digital.</p>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup lang="ts">
const { corporateInfo, getKeywordsString, generateDescription } = useCIMROSEO();

// SEO optimizado para página "Quiénes Somos"
useSeoMeta({
    title: `Quiénes Somos | ${corporateInfo.name}`,
    description: generateDescription(`Conoce la historia, misión y visión de ${corporateInfo.name}. Centro especializado en diagnóstico por imágenes en Santa Ana, El Salvador, comprometido con la excelencia médica y tecnología de vanguardia.`),
    keywords: getKeywordsString([
        'historia ALTIMO',
        'misión centro radiológico Santa Ana',
        'visión diagnóstico por imágenes',
        'centro médico El Salvador historia',
        'radiología occidente El Salvador historia'
    ]),
    ogTitle: `Quiénes Somos - ${corporateInfo.shortName} Centro de Imágenes Santa Ana`,
    ogDescription: `Conoce la historia y compromiso de ${corporateInfo.name} con la excelencia en diagnóstico por imágenes en Santa Ana, El Salvador.`,
    ogImage: `${corporateInfo.website}/logo-horizontal.png`,
    ogUrl: `${corporateInfo.website}/directorio-medico`
});

// Schema.org para página institucional
useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'AboutPage',
                name: `Quiénes Somos - ${corporateInfo.name}`,
                description: `Historia, misión y visión de ${corporateInfo.name}, centro especializado en diagnóstico por imágenes en Santa Ana, El Salvador`,
                mainEntity: {
                    '@type': 'MedicalOrganization',
                    name: corporateInfo.name,
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: corporateInfo.address,
                        addressLocality: 'Santa Ana',
                        addressCountry: 'El Salvador'
                    }
                }
            })
        }
    ]
});
</script>