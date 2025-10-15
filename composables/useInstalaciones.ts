interface Nivel {
  titulo: string
  descripcion: string
  imagen: number
  imagen_url?: string
}

interface Detalle {
  descripcion: string
  imagen: number
  imagen_url?: string
  niveles: {
    nivel_1: Nivel
    nivel_2: Nivel
    nivel_3: Nivel
  }
}

interface Instalacion {
  id: number
  title: {
    rendered: string
  }
  slug: string
  date: string
  modified: string
  acf: {
    detalles: Detalle[]
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
      media_details: {
        sizes: {
          large?: { source_url: string }
          medium?: { source_url: string }
          full: { source_url: string }
        }
      }
    }>
  }
}

interface ShareUrls {
  facebook: string
  twitter: string
  whatsapp: string
  linkedin: string
  email: string
}

export const useInstalaciones = () => {
  const API_URL = 'https://admin-altimo.gunssoft.tech/wp-json/wp/v2'
  
  /**
   * Obtener todas las instalaciones
   */
  const fetchInstalaciones = async (): Promise<Instalacion[]> => {
    try {
      const response = await $fetch<Instalacion[]>(`${API_URL}/instalacion?_embed`)
      return response
    } catch (error) {
      console.error('Error fetching instalaciones:', error)
      throw error
    }
  }

  /**
   * Obtener una instalación por slug
   */
  const fetchInstalacionBySlug = async (slug: string): Promise<Instalacion | null> => {
    try {
      const response = await $fetch<Instalacion[]>(`${API_URL}/instalacion?slug=${slug}&_embed`)
      const instalacion = response?.[0]
      return instalacion || null
    } catch (error) {
      console.error('Error fetching instalacion by slug:', error)
      throw error
    }
  }

  /**
   * Obtener URL de imagen desde WordPress por ID
   */
  const getImageUrl = async (imageId: number, size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'): Promise<string> => {
    try {
      if (!imageId) return '/placeholder.svg'
      
      const response = await $fetch<any>(`${API_URL}/media/${imageId}`)
      
      if (response?.media_details?.sizes?.[size]) {
        return response.media_details.sizes[size].source_url
      }
      
      return response?.source_url || '/placeholder.svg'
    } catch (error) {
      console.error('Error fetching image:', error)
      return '/placeholder.svg'
    }
  }

  /**
   * Procesar instalación con URLs de imágenes
   */
  const processInstalacion = async (instalacion: Instalacion): Promise<any> => {
    if (!instalacion?.acf?.detalles?.[0]) {
      return {
        id: instalacion.id,
        title: instalacion.title.rendered,
        slug: instalacion.slug,
        date: instalacion.date,
        descripcion: '',
        imagen: '/placeholder.svg',
        niveles: []
      }
    }

    const detalle = instalacion.acf.detalles[0]
    
    // Obtener imagen principal
    const imagenPrincipal = await getImageUrl(detalle.imagen, 'large')
    
    // Procesar niveles
    const niveles = []
    if (detalle.niveles?.nivel_1) {
      const imagen1 = await getImageUrl(detalle.niveles.nivel_1.imagen, 'large')
      niveles.push({
        ...detalle.niveles.nivel_1,
        imagen_url: imagen1
      })
    }
    if (detalle.niveles?.nivel_2) {
      const imagen2 = await getImageUrl(detalle.niveles.nivel_2.imagen, 'large')
      niveles.push({
        ...detalle.niveles.nivel_2,
        imagen_url: imagen2
      })
    }
    if (detalle.niveles?.nivel_3) {
      const imagen3 = await getImageUrl(detalle.niveles.nivel_3.imagen, 'large')
      niveles.push({
        ...detalle.niveles.nivel_3,
        imagen_url: imagen3
      })
    }

    return {
      id: instalacion.id,
      title: instalacion.title.rendered,
      slug: instalacion.slug,
      date: instalacion.date,
      modified: instalacion.modified,
      descripcion: detalle.descripcion,
      imagen: imagenPrincipal,
      niveles
    }
  }

  /**
   * Formatear fecha en español
   */
  const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}) => {
    const defaultOptions: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { ...defaultOptions, ...options })
  }

  /**
   * Generar URLs para compartir en redes sociales
   */
  const generateShareUrls = (instalacion: any, currentUrl: string): ShareUrls => {
    const title = encodeURIComponent(instalacion.title)
    const description = encodeURIComponent(instalacion.descripcion || '')
    const url = encodeURIComponent(currentUrl)

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      whatsapp: `https://wa.me/?text=${title}%20${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email: `mailto:?subject=${title}&body=${description}%0A%0A${url}`
    }
  }

  /**
   * Encontrar instalaciones relacionadas
   */
  const findRelatedInstalaciones = (currentInstalacion: any, limit: number = 3): any[] => {
    const allInstalaciones = useState<any[]>('allInstalaciones', () => [])
    
    if (!allInstalaciones.value || allInstalaciones.value.length === 0) {
      return []
    }

    return allInstalaciones.value
      .filter(inst => inst.id !== currentInstalacion.id)
      .slice(0, limit)
  }

  /**
   * Copiar al portapapeles
   */
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error('Error copying to clipboard:', err)
      return false
    }
  }

  /**
   * Generar metadata SEO para una instalación
   */
  const getInstalacionSEOMeta = (instalacion: any, siteUrl: string) => {
    const { corporateInfo, getKeywordsString, generateDescription } = useALTIMOSEO()
    
    const title = `${instalacion.title} | Instalaciones ${corporateInfo.shortName}`
    const description = generateDescription(instalacion.descripcion || `Conoce nuestras ${instalacion.title.toLowerCase()} en ${corporateInfo.name}`)
    const imageUrl = instalacion.imagen || `${siteUrl}/logo-horizontal.png`
    const pageUrl = `${siteUrl}/instalaciones/${instalacion.slug}`

    return {
      title,
      description,
      keywords: getKeywordsString([
        instalacion.title,
        'instalaciones ALTIMO',
        'centro médico Santa Ana',
        'infraestructura médica',
        'instalaciones modernas'
      ]),
      ogTitle: title,
      ogDescription: description,
      ogImage: imageUrl,
      ogUrl: pageUrl,
      ogType: 'article',
      articlePublishedTime: instalacion.date,
      articleModifiedTime: instalacion.modified
    }
  }

  return {
    fetchInstalaciones,
    fetchInstalacionBySlug,
    getImageUrl,
    processInstalacion,
    formatDate,
    generateShareUrls,
    findRelatedInstalaciones,
    copyToClipboard,
    getInstalacionSEOMeta
  }
}
