<template>
  <div class="d-flex">
    <Sidebar />
    <div class="flex-grow-1 d-flex flex-column">
      <Header />
      <div class="flex-grow-1 p-4 page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/ui/components/shared/Sidebar.vue'
import Header from '@/ui/components/shared/Header.vue'
</script>
