<template>
  <div>
    <div class="modal" tabindex="-1" ref="modalCargando" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-body text-center">
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <p class="mt-2 text-light">Cargando...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap';
import { ref, onMounted, watch } from 'vue';
import { useModalCargandoStore } from '@/ui/stores/index'
const modalCargandoStore = useModalCargandoStore();

const modalCargando = ref<HTMLElement | null>(null);
let bootstrapModal: Modal;

watch(
  () => modalCargandoStore.visible,
  (nuevoValor) => {
    mostrarCargando(nuevoValor);
  },
);

const mostrarCargando = (mostrar: boolean) => {
  if (!bootstrapModal) return;
  if (mostrar) {
    bootstrapModal.show();
  } else {
    bootstrapModal.hide();
  }
};

onMounted(() => {
  bootstrapModal = new Modal(modalCargando.value!);
});
</script>
