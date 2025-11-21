import { defineStore } from "pinia";
import axios from "axios";

export const useQuienesStore = defineStore("quienes", {
    
    state: () => ({
        quienesSomos: {},
        descripcion: "",
        historia: "",
        mision: "",
        vision: "",
        valores: {},
        descripcionequipo: "",
        // equipo: {
        // perfil: '',
        // nombre: '',
        // puesto: '',
        // descripcion: ''
        // },
        equipo: [],
        descripcion_certificaciones: [],
        detalles_certificacion: [],
        isLoading: false,
        loaded: false,
        error: null,
    }),

    actions: {
        async fetchquienesSomos() {
            if (!this.loaded) {
                this.isLoading = true;
                this.error = null;

                try {
                    const response = await axios.get(
                        `https://admin-altimo.gunssoft.tech/wp-json/acf/v3/quienes-somos`
                    );
                    console.log(response.data);
                    const data = response.data;
                    this.quienesSomos = data;
                    this.descripcion = data.descripcion || "";
                    this.historia = data.historia || "";
                    this.mision = data.mision || "";
                    this.vision = data.vision || "";
                   this.valores = Array.isArray(data.valores)? data.valores.map(item => item.valor) : [];
                    this.descripcionequipo = data.descripcionequipo || "";
                    
                    this.equipo = data.equipo?.map(item => ({
                    perfil: item.detalles_equipo?.perfil || '',
                    nombre: item.detalles_equipo?.nombre || '',
                    puesto: item.detalles_equipo?.puesto || '',
                    descripcion: item.detalles_equipo?.descripcion || ''
                    })) || [];
                    this.descripcion_certificaciones = data.descripcion_certificaciones || [];
                    this.detalles_certificacion = data.detalles_certificaciones?.map(item => ({
                    titulo_certificacion: item.certificacion?.titulo_certificacion || '',
                    descripcion_certificacion: item.certificacion?.descripcion_certificacion || '',
                    imagen_certificacion: item.certificacion?.imagen_certificacion || '',
                    pdf_certificacion: item.certificacion?.pdf_certificacion || ''
                    })) || [];

                    this.loaded = true;
                        console.log(this.equipo);
                        console.log("-------------------");
                        console.log(this.equipo.detalles_equipo);

                } catch (error) {
                    console.error("Error fetching quienesSomos:", error);
                    this.error = error;
                } finally {
                    this.isLoading = false;
                }
            }

        },
    },

    getters: {
        getHistoriaHTML: (state) => state.historia,
        getValoresHTML: (state) => state.valores,
        hasHistoria: (state) => !!state.historia,
        hasValores: (state) => !!state.valores
    },
});
