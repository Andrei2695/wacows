<template>
  <div v-if="visible" class="modal-backdrop">
    <div class="modal d-block" tabindex="-1" style="display: block;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border">
          <div class="modal-header bg-primary text-white">
            <h5 class=" modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="$emit('cancelar')"></button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn btn-secondary" @click="$emit('cancelar')"> {{ Constantes.LABEL_CANCELAR
              }}</button>
              <button class="btn btn-primary" @click="$emit('guardar')"> {{ Constantes.LABEL_GUARDAR
              }}</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Constantes } from '@/ui/utils'
defineProps({
  visible: { type: Boolean, required: true },
  title: { type: String, required: true },
});
defineEmits(["cancelar", "guardar"]);
</script>
