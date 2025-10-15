/**
 * Composable para manejar perfiles y sus servicios asociados
 */

interface PerfilServicio {
  id: number
  title: {
    rendered: string
  }
  slug: string
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  acf?: {
    perfiles?: {
      descipcion?: string
      examanes?: Array<{
        examen: string
      }>
    }
  }
  _embedded?: any
}

interface PerfilNormalizado {
  id: number
  nombre: string
  slug: string
  descripcion: string
  examenes: string[]
  imagen?: string
  imagenGrande?: string
  imagenAlt?: string
}

export const usePerfiles = () => {
  const config = useRuntimeConfig()
  const API_BASE_URL = config.public.API_BASE_URL

  /**
   * Obtener todos los servicios de la categoría Perfiles (ID: 25)
   */
  const getPerfiles = async (): Promise<PerfilNormalizado[]> => {
    try {
      const response = await $fetch<PerfilServicio[]>(
        `${API_BASE_URL}/v2/servicio?categoria=25&_embed`,
        {
          method: 'GET',
        }
      )

      // Normalizar los datos
      const perfilesNormalizados: PerfilNormalizado[] = response.map((perfil) => {
        // Obtener la imagen destacada
        const featuredMedia = perfil._embedded?.['wp:featuredmedia']?.[0]
        
        // Obtener descripción del ACF o de excerpt/content como fallback
        const descripcionACF = perfil.acf?.perfiles?.descipcion || ''
        const descripcionExcerpt = perfil.excerpt?.rendered || perfil.content?.rendered || ''
        const descripcionLimpia = descripcionExcerpt.replace(/<[^>]*>/g, '').trim()
        
        // Priorizar descripción del ACF, luego excerpt limpio, luego texto por defecto
        const descripcionFinal = descripcionACF || descripcionLimpia || ''
        
        // Extraer los exámenes del ACF
        const examenes = perfil.acf?.perfiles?.examanes?.map(e => e.examen) || []
        
        return {
          id: perfil.id,
          nombre: perfil.title.rendered,
          slug: perfil.slug,
          descripcion: descripcionFinal,
          examenes,
          imagen: featuredMedia?.media_details?.sizes?.medium?.source_url || 
                  featuredMedia?.source_url || undefined,
          imagenGrande: featuredMedia?.source_url || undefined,
          imagenAlt: featuredMedia?.alt_text || 
                    featuredMedia?.title?.rendered || 
                    perfil.title.rendered
        }
      })

      return perfilesNormalizados
    } catch (error) {
      console.error('Error al obtener perfiles:', error)
      throw error
    }
  }

  /**
   * Obtener un perfil específico por slug
   */
  const getPerfilBySlug = async (slug: string): Promise<PerfilNormalizado | null> => {
    try {
      const perfiles = await getPerfiles()
      return perfiles.find(p => p.slug === slug) || null
    } catch (error) {
      console.error('Error al obtener perfil por slug:', error)
      return null
    }
  }

  return {
    getPerfiles,
    getPerfilBySlug
  }
}
