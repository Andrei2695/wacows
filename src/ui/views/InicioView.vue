<template>
  <div class="container-fluid py-4">
    <div class="row g-4">
      <div
        class="col-12 col-sm-6 col-lg-3"
        v-for="(stat, index) in stats"
        :key="index"
      >
        <div class="card bg-light stat-card h-100 shadow-sm">
          <div class="card-body d-flex align-items-center">
            <div class="icon-wrapper me-3">
              <component :is="stat.icon" class="text-primary" :size="32" />
            </div>
            <div>
              <h5 class="mb-1 fw-semibold text-dark">{{ stat.value }}</h5>
              <small class="text-muted">{{ stat.label }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Milk, Truck, Droplet } from 'lucide-vue-next'

const stats = [
  {
    icon: Milk,
    value: '2,899 kg',
    label: 'Promedio diario Última Lactancia',
  },
  {
    icon: Truck,
    value: '5 traslados',
    label: 'Animales transportados esta semana',
  },
  {
    icon: Droplet,
    value: '85%',
    label: 'Humedad promedio de la finca',
  },
  {
    icon: Milk,
    value: '124',
    label: 'Total de animales activos',
  },
]
</script>

<style scoped>
.icon-wrapper {
  background-color: #e9f2ff;
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-card {
  border: none;
  transition: transform 0.15s ease-in-out;
}

.stat-card:hover {
  transform: translateY(-2px);
}
</style>
