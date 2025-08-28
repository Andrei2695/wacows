<template>
  <BaseModal :visible="visible" :title="modo === 'agregar' ? 'Agregar lote' : 'Editar lote'"
    @cancelar="$emit('cancelar')" @guardar="onGuardar">
    <form>
      <div v-if="modo === 'editar'" class="mb-3">
        <label class="form-label">Código</label>
        <input type="text" class="form-control" v-model="localLote.id" disabled />
      </div>

      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input type="text" class="form-control" v-model="localLote.nombre" placeholder="Ingrese el nombre del lote" />
        <div v-if="errors.nombre" class="text-danger small">{{ errors.nombre }}</div>
      </div>
    </form>
  </BaseModal>
</template>
<script setup lang="ts">
import { ref, watch, type PropType, reactive } from "vue";

import BaseModal from "@/ui/components/Base/Modal.vue";
import type { ILote } from '@/domain/Entities'

const propiedades = defineProps({
  visible: { type: Boolean, required: true },
  modo: { type: String as PropType<"agregar" | "editar">, required: true },
  lote: { type: Object as PropType<ILote>, required: true }
});
const emit = defineEmits(["cancelar", "guardar"]);
const localLote = ref<ILote>({ ...propiedades.lote });
const errors = reactive<{ nombre: string }>({
  nombre: ""
});

watch(
  () => propiedades.lote,
  (nuevo) => {
    localLote.value = { ...nuevo };
  },
  { deep: true, immediate: true }
);

const validar = () => {
  errors.nombre = "";

  if (!localLote.value.nombre || localLote.value.nombre.trim() === "") {
    errors.nombre = "El nombre es obligatorio";
    return false;
  }

  return true;
};

const onGuardar = () => {
  if (validar()) {
    emit("guardar", { ...localLote.value });
  }
};
</script>
