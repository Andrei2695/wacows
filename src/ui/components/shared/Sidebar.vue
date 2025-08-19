<template>
  <aside class="sidebar">
    <!-- Menú -->
    <nav class="sidebar-nav">
      <ul>
        <!-- Inicio -->
        <li :class="{ active: route.name === 'inicio' }" @click="navigateTo('inicio')">
          <Home :size="22" />
          <span>Inicio</span>
        </li>
        <li :class="{ active: route.name === 'gestion-licencias' }" @click="navigateTo('gestion-licencias')">
          <BrickWall :size="22" />
          <span>Licencias</span>
        </li>
        <li :class="{ active: route.name === 'animales' }" @click="navigateTo('animales')">
          <Tractor :size="22" />
          <span>Animales</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
/*import { useFarmStore } from '@/stores/farmStore'
import { useUserStore } from '@/stores/userStore'
*/
const router = useRouter()
const route = useRoute()

function navigateTo(name: string) {
  router.push({ name })
}
</script>
