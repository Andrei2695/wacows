<template>
  <div
    class="position-fixed top-0 end-0 p-3"
    style="z-index: 1080"
    v-if="visible"
  >
    <div
      class="toast align-items-center text-white show fade"
      :class="`bg-${type}`"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="d-flex">
        <div class="toast-body">
          {{ message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          @click="visible = false"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const type = ref<'primary' | 'success' | 'warning' | 'danger'>('primary')

function show(msg: string, variant: typeof type.value = 'primary') {
  message.value = msg
  type.value = variant
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 4000)
}

defineExpose({ show })
</script>
