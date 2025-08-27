<template>
  <aside class="sidebar">
    <!-- Menú -->
    <nav class="sidebar-nav">
      <ul>
        <li :class="{ active: route.name === 'inicio' }" @click="navigateTo('inicio')">
          <IconHome :size="22" />
          <span>Inicio</span>
        </li>
        <li :class="{ active: route.name === 'animales' }" @click="navigateTo('animales')">
          <IconTractor :size="22" />
          <span>Animales</span>
        </li>
        <li :class="{ active: route.name === 'lots' }" @click="navigateTo('lots')">
          <IconTractor :size="22" />
          <span>Lotes</span>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

function navigateTo(name: string) {
  router.push({ name })
}
</script>
