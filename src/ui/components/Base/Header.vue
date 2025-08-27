<template>
  <header class="custom-header d-flex justify-content-between align-items-center px-4">
    <!-- Logo o nombre de la app -->
    <div class="d-flex align-items-center">
      <img src="@/ui/assets/logo.png" alt="Logo" height="26" class="me-3" />
      <h1 class="fs-5 mb-0 fw-semibold custom-color ">{{ LocalStorageService.get('fincaSeleccionada') || 'Finca' }}</h1>
    </div>
    <!-- Acciones (carrito + logout) -->
    <div class="d-flex align-items-center gap-4">
      <!-- Carrito -->
      <button class="btn btn-custom-icon position-relative p-0 border-0 bg-transparent">
        <IconTruck :size="22" />
        <span v-if="cartItemCount > 0"
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ cartItemCount }}
        </span>
      </button>
      <!-- Divider (opcional) -->
      <div class="vr"></div>
      <!-- Logout -->
      <button class="btn  btn-custom-icon d-flex align-items-center gap-2 p-0 border-0 bg-transparent" @click="logout">
        <IconLogOut :size="22" />
      </button>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/ui/stores'
import { LocalStorageService } from '@/infrastructure/Services/LocalStorageService'

const sessionStore = useSessionStore()
const router = useRouter()

const cartItemCount = 3 // temporal

function logout() {
  sessionStore.cleanSession()
  router.push('/login')
}
</script>
