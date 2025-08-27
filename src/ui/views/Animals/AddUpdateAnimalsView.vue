<template>
  <div class="p-4">
    <h3>Agregar Nuevo Animal</h3>
    <form @submit.prevent="guardarAnimal">
      <div class="mb-3">
        <label class="form-label">Código</label>
        <input v-model="animal.codigo" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Nombre</label>
        <input v-model="animal.nombre" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Raza</label>
        <input v-model="animal.raza" type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Edad</label>
        <input v-model="animal.edad" type="number" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Lote</label>
        <select v-model="animal.ubicacion" class="form-select">
          <option v-for="l in lotes" :key="l.codigo" :value="l.nombre">{{ l.nombre }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Estado</label>
        <select v-model="animal.estado" class="form-select">
          <option>Activo</option>
          <option>Muerto</option>
          <option>Vendido</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button> <button type="button" class="btn btn-secondary"
        @click="iraAnimalList">Salir</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { IAnimal, ILote } from '@/domain/Entities';
import { LoteService } from '@/infrastructure/Services/LoteService';
import { LoteRepository } from '@/infrastructure/Repositories/LoteRepository';
import { GetAllLoteUseCase } from '@/application/Usecases/GetAllLoteUseCase';
import { AnimalService } from '@/infrastructure/Services/AnimalService';
import { AnimalRepository } from '@/infrastructure/Repositories/AnimalRepository';

const router = useRouter();
const route = useRoute();
const animal = ref<IAnimal>({
  codigo: 0,
  nombre: '',
  raza: '',
  edad: 0,
  ubicacion: '',
  estado: 'Activo',
  foto: '',
});
const lotes = ref<ILote[]>([]);
const modo = ref<'agregar' | 'editar'>('agregar');

const cargarLotes = async () => {
  const getAllLoteUseCase = new GetAllLoteUseCase(new LoteRepository(new LoteService()));
  lotes.value = await getAllLoteUseCase.ExecuteAsync();
};
const cargarAnimal = async (id: number) => {
  const repo = new AnimalRepository(new AnimalService());
  const a = await repo.GetById(id);
  if (a) {
    animal.value = a;
    modo.value = 'editar';
  }
};

const iraAnimalList = () => {
  router.push('/animales/lista'); // Redirige al listado de animales
};
const guardarAnimal = async () => {
  const repo = new AnimalRepository(new AnimalService());
  if (modo.value === 'agregar') {
    await repo.create(animal.value);
  } else {
    await repo.update(animal.value.codigo, animal.value); // tu PUT
  }
  router.push('/animales/lista');
};
watch(
  () => route.query.codigo,
  (nuevoCodigo) => {
    if (nuevoCodigo) {
      cargarAnimal(Number(nuevoCodigo));
    }
  },
  { immediate: true } // para que también corra la primera vez
);

onMounted(() => {
  cargarLotes();
  const id = Number(route.query.id);
  if (id) {
    cargarAnimal(id);
  }
});
</script>
