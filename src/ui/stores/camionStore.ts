import { defineStore } from 'pinia'

export const useCamionStore = defineStore('camion', {
  state: () => ({
    animalesEnCamion: [] as number[],
  }),
  getters: {
    cantidadAnimales: (state) => state.animalesEnCamion.length,
  },
  actions: {
    agregar(codigo: number) {
      if (!this.animalesEnCamion.includes(codigo)) {
        this.animalesEnCamion.push(codigo)
      }
    },
    quitar(codigo: number) {
      this.animalesEnCamion = this.animalesEnCamion.filter((c) => c !== codigo)
    },
    limpiar() {
      this.animalesEnCamion = []
    },
  },
})
