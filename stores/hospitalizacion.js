import { defineStore } from "pinia";
import axios from "axios";

export const useHospitalizacion = defineStore("hospitalizacion", {
    
    state: () => ({
        descripcion: "",
        titulo1: "",
        descripcion1: "",
        titulo2: "",
        descripcion2: "",
        titulo3: "",
        descripcion3: "",
        listas: [],
        imagen: "",
        isLoading: false,
        loaded: false,
        error: null,
    }),

    actions: {
        async fetchHospitalizacion() {
            if (!this.loaded) {
                this.isLoading = true;
                this.error = null;

                try {
                    const response = await axios.get(
                        `https://admin-altimo.gunssoft.tech/wp-json/acf/v3/hospitalizacion`
                    );
                    const data = response.data;
                    this.descripcion = data.descripcion || "";
                    this.titulo1 = data.titulo1 || "";
                    this.descripcion1 = data.descripcion1 || "";
                    this.titulo2 = data.titulo2 || "";
                    this.descripcion2 = data.descripcion2 || "";
                    this.titulo3 = data.titulo3 || "";
                    this.descripcion3 = data.descripcion3 || "";
                    this.titulo4 = data.titulo4 || "";
                    this.descripcion4 = data.descripcion4 || "";
                    this.titulo5 = data.titulo5 || "";
                    
                    this.listas = data.listas?.map(item => ({
                        titulo: item?.titulo || '',
                        listas_li: item?.listas_li?.map(li => ({
                            titulo: li.titulo || ''
                        })) || []
                    })) || []

                    this.imagen = data.imagen || '',

                    this.loaded = true;

                } catch (error) {
                    console.error("Error fetching Hospitalizacion:", error);
                    this.error = error;
                } finally {
                    this.isLoading = false;
                }
            }

        },
    },

    getters: {
        getDescripcion2HTML: (state) => state.descripcion2,
        hasDescripcion2: (state) => !!state.descripcion2,
        getDescripcion4HTML: (state) => state.descripcion4,
        hasDescripcion4: (state) => !!state.descripcion4,
    },
});
