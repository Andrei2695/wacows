<template>
  <RouterView />
  <LoadingModal />
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoadingModal from '@/ui/components/shared/LoadingModal.vue';
</script>
