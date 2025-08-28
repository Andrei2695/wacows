<template>
  <BaseModal :visible="visible" :title="`Cambiar de lote a ${propiedades.animal?.nombre ?? ''}`"
    @cancelar="$emit('cancelar')" @guardar="onGuardar">
    <form>
      <div class="mb-3">
        <label class="form-label">{{ Constantes.LOTE_NUEVO }}</label>
        <select v-model="localLote.id" class="form-select">
          <option :value="0">{{ Constantes.SELECT_LABEL }}</option>
          <option v-for="est in lotes" :key="est.id" :value="est.id">
            {{ est.nombre }}
          </option>
        </select>
        <div v-if="errors.loteSeleccionado" class="text-danger small">{{ errors.loteSeleccionado }}</div>
      </div>
    </form>
  </BaseModal>
</template>
<script setup lang="ts">
import { ref, type PropType, watch, type Ref, reactive, onMounted } from "vue";

import BaseModal from "@/ui/components/Base/Modal.vue";
import type { ILote, IAnimal } from '@/domain/Entities'
import { useModalCargandoStore } from '@/ui/stores/index'
import { GetAllLoteUseCase } from '@/application/Usecases/GetAllLoteUseCase';
import { LoteRepository } from '@/infrastructure/Repositories/LoteRepository';
import { LoteService } from '@/infrastructure/Services/LoteService';
import { Constantes } from "@/ui/utils";

const lotes: Ref<ILote[]> = ref<ILote[]>([]);
const modalCargandoStore = useModalCargandoStore();
const propiedades = defineProps({
  visible: { type: Boolean, required: true },
  lote: { type: Object as PropType<ILote>, required: true },
  animal: { type: Object as PropType<IAnimal>, required: false }
});
const emit = defineEmits(["cancelar", "guardar"]);
const localLote = ref<ILote>({ ...propiedades.lote });
const errors = reactive<{ loteSeleccionado: string }>({
  loteSeleccionado: ""
});

const cargarLotes = async (): Promise<void> => {
  try {
    modalCargandoStore.mostrarModal();
    const getAllLoteUseCase = new GetAllLoteUseCase(
      new LoteRepository(new LoteService()),
    );
    const respuesta: ILote[] = await getAllLoteUseCase.ExecuteAsync();
    lotes.value = respuesta;
    modalCargandoStore.ocultarModal();
  } catch (error) {
    console.error(error);
    modalCargandoStore.ocultarModal();
    alert(error);
  }
};
const validar = () => {
  errors.loteSeleccionado = ""

  if (!localLote.value.id || localLote.value.id === 0) {
    errors.loteSeleccionado = Constantes.ERROR_CAMBIO_LOTE_REQUERIDO
    return false
  }
  return true
}
const onGuardar = () => {
  if (validar()) {
    emit("guardar", localLote.value.id)
  }
}

watch(() => propiedades.lote, (nuevo) => { localLote.value = { ...nuevo }; }, { deep: true, immediate: true });

onMounted(async () => {
  cargarLotes();
});
</script>
