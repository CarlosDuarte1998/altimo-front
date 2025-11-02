import { defineStore } from 'pinia'

export const useMedicosStore = defineStore('medicos', {
  state: () => ({
    isLoading: false,
    medicos: [],
    selectedMedico: null,
    error: null,
    API_BASE_URL: useRuntimeConfig().public.API_BASE_URL + '/v2',
  }),

  getters: {
    // Obtener todos los médicos
    allMedicos: (state) => state.medicos,
    
    // Médicos ordenados por nombre
    medicosByName: (state) => {
      return [...state.medicos].sort((a, b) => 
        a.nombre.localeCompare(b.nombre)
      )
    },
    
    // Buscar médico por ID
    getMedicoById: (state) => (id) => {
      return state.medicos.find(medico => medico.id === parseInt(id))
    },
    
    // Buscar médico por slug
    getMedicoBySlug: (state) => (slug) => {
      return state.medicos.find(medico => medico.slug === slug)
    },
    
    // Total de médicos
    totalMedicos: (state) => state.medicos.length,
    
    // Verificar si hay médicos
    hasMedicos: (state) => state.medicos.length > 0,
  },

  actions: {
    // Normalizar datos del médico
    normalizeMedico(medico) {
      // Obtener imagen destacada si existe en _embedded
      const featuredMedia = medico._embedded?.['wp:featuredmedia']?.[0]
      let imagenUrl = '/placeholder.svg'
      
      if (featuredMedia) {
        imagenUrl = featuredMedia.media_details?.sizes?.full?.source_url || 
                   featuredMedia.media_details?.sizes?.large?.source_url ||
                   featuredMedia.media_details?.sizes?.medium_large?.source_url ||
                   featuredMedia.source_url || 
                   '/placeholder.svg'
      }

      // Extraer datos de ACF
      const detalles = medico.acf?.informacion_general?.detalles?.[0] || {}
      
      // Obtener especialidad de la taxonomía
      const especialidadTaxonomy = medico._embedded?.['wp:term']?.[0]?.[0]
      const especialidadNombre = especialidadTaxonomy?.name || detalles.especilidad || 'Especialidad no especificada'
      
      // Limpiar HTML de la descripción
      const descripcionHTML = detalles.Descripcion || ''
      const descripcionLimpia = descripcionHTML.replace(/<[^>]*>/g, '').trim()

      return {
        id: medico.id,
        nombre: medico.title?.rendered || 'Sin nombre',
        slug: medico.slug,
        link: medico.link,
        especialidad: especialidadNombre,
        descripcion: descripcionLimpia || '',
        descripcionBreve: '',
        cargo: detalles.cargo || '',
        imagen: imagenUrl,
        telefono: detalles.telefono || '',
        email: detalles.email || '',
        educacion: detalles.educacion || [],
        experiencia: detalles.experiencia || '',
        certificaciones: detalles.certificaciones || [],
        horarios: detalles.horarios || '',
        celular: detalles.celular || '',
        direccion: detalles.direccion || '',
        servicios: detalles.servicios || '',
        // Datos originales completos con _embedded
        acf: {
          ...medico.acf,
          _embedded: medico._embedded
        }
      }
    },

    // Obtener todos los médicos
    async fetchMedicos() {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/medico`, {
          params: {
            per_page: 100, // Obtener todos los médicos
            _embed: true // Incluir imágenes destacadas
          }
        })
        
        // Normalizar los datos de los médicos
        this.medicos = response.map(medico => this.normalizeMedico(medico))
        
        return this.medicos
      } catch (error) {
        this.error = 'Error al cargar el directorio médico'
        console.error('Error fetching medicos:', error)
        // En caso de error, retornar array vacío en lugar de lanzar error
        this.medicos = []
        return []
      } finally {
        this.isLoading = false
      }
    },

    // Obtener un médico específico por ID
    async fetchMedicoById(id) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/medico/${id}?_embed`)
        
        this.selectedMedico = this.normalizeMedico(response)
        return this.selectedMedico
      } catch (error) {
        this.error = `Error al cargar el médico con ID ${id}`
        console.error('Error fetching medico by ID:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Obtener un médico específico por slug
    async fetchMedicoBySlug(slug) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await $fetch(`${this.API_BASE_URL}/medico`, {
          params: {
            slug: slug,
            _embed: true
          }
        })
        
        if (response && response.length > 0) {
          this.selectedMedico = this.normalizeMedico(response[0])
          return this.selectedMedico
        } else {
          throw new Error('Médico no encontrado')
        }
      } catch (error) {
        this.error = `Error al cargar el médico ${slug}`
        console.error('Error fetching medico by slug:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Limpiar el médico seleccionado
    clearSelectedMedico() {
      this.selectedMedico = null
    },

    // Limpiar errores
    clearError() {
      this.error = null
    }
  }
})
