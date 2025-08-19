import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Constantes } from '@/ui/utils'

export const useModalCargandoStore = defineStore(Constantes.STORE_MODAL_CARGANDO, () => {
  const mostrar: Ref<boolean> = ref(false)

  const ocultarModal = () => {
    mostrar.value = false
  }
  const mostrarModal = () => {
    mostrar.value = true
  }

  return {
    visible: computed(() => mostrar.value),
    ocultarModal,
    mostrarModal,
  }
})
