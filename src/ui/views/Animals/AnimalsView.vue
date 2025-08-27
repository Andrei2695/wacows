<template>
  <div class="mb-3 row">
    <div class=" col-md-1">
      <h5 class="mt-2">{{ Constantes.LABEL_ANIMALES }}</h5>
    </div>
    <div class="col-md-3">
      <select class="form-select" :aria-label="Constantes.LABEL_TODOS_LOS_ANIMALES" data-toggle="tooltip"
        data-placement="bottom" :title="Constantes.TOOLTIP_FILTRADO_POR">
        <option selected>{{ Constantes.LABEL_TODOS_LOS_ANIMALES }}</option>
        <option>codigo</option>
        <option>nombre</option>
      </select>
    </div>
    <div class="col-md-3">
      <input v-model="searchValue" type="text" class="form-control shadow-sm border-primary"
        :placeholder="Constantes.PLACEHOLDER_BUSCAR_ANIMAL" data-toggle="tooltip" data-placement="bottom"
        :title="Constantes.TOOLTIP_FILTRADO_POR" />
    </div>
    <div class="col-5 d-flex justify-content-end">
      <button class="btn btn-primary" :title="Constantes.TOOLTIP_AGREGAR_ANIMAL" @click="iraNuevoAnimal">
        <IconPlus :size="16" />
      </button>
    </div>
  </div>
  <EasyDataTable show-index :theme-color="'#0d821e'" class="mt-3" :headers="headers" :items="animales"
    rowsPerPageMessage="Filas por página" rowsOfPageSeparatorMessage="de" emptyMessage="No hay datos disponibles"
    buttons-pagination alternating :body-row-class-name="setRowClass" :rows-per-page="5" :search-field="searchField"
    :search-value="searchValue" :sort-by="sortBy" :sort-type="sortType" table-class-name="customize-table"
    header-text-direction="center" body-text-direction="center">
    <template #item-foto="{ foto, color }">
      <img :src="foto" alt="animal" class="rounded-circle" :style="{
        width: '50px',
        height: '50px',
        objectFit: 'cover',
        border: '5px solid ' + color
      }" />
    </template>
    <template #item-estado="{ estado }">
      <span class="badge rounded-pill" :class="{
        'bg-success': estado === 'Activo',
        'bg-danger': estado === 'Muerto',
        'bg-warning': estado === 'Vendido'
      }">
        {{ estado }}
      </span>
    </template>
    <template #item-acciones="{ codigo }">
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-secondary" @click="editarAnimal(getAnimalByCodigo(codigo))"
          title="Editar Animal">
          <IconPencil :size="22" />
        </button>
        <button v-if="!animalesEnCamion.includes(codigo)" class="btn btn-outline-success"
          @click="agregarAlCamion(codigo)" title="Agregar al camión">
          <IconTruck :size="22" />
        </button>
        <button v-else class="btn btn-outline-danger" @click="quitarDelCamion(codigo)" title="Quitar del camión">
          <IconTruck :size="22" />
        </button>
        <button class="btn btn-outline-secondary" @click="abrirModalLote(getAnimalByCodigo(codigo))"
          title="Cambiar de lote">
          <IconMapPinXInside :size="22" />
        </button>
        <button class="btn btn-outline-secondary" @click="verExpediente(getAnimalByCodigo(codigo))"
          title="Ver expediente">
          <IconFileHeart :size="22" />
        </button>
      </div>
    </template>
    <template #empty-message>
      <a href="#">No existen registros</a>
    </template>
    <template #loading>
      <img src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
        style="width: 100px; height: 80px;" />
    </template>
  </EasyDataTable>
  <ChangeLotViewModal :visible="visibleModal" :lote="formLote" :animal="animalSeleccionado" @cancelar="cerrarModal"
    @guardar="cambioLote" />
  <Toast ref="refToast" />
</template>
<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { useRouter } from 'vue-router';

import { type SortType } from "vue3-easy-data-table";
import { Constantes } from "@/ui/utils";
import type { IAnimal, ILote } from "@/domain/Entities";
import { useModalCargandoStore } from '@/ui/stores/index'
import ChangeLotViewModal from "@/ui/views/Animals/ChangeLotViewModal.vue";
import Toast from '@/ui/components/shared/Toast.vue'

import { AnimalService } from '@/infrastructure/Services/AnimalService';
import { LoteService } from '@/infrastructure/Services/LoteService';
import { AnimalRepository } from '@/infrastructure/Repositories/AnimalRepository';
import { LoteRepository } from '@/infrastructure/Repositories/LoteRepository';
import { GetAllAnimalUseCase } from '@/application/Usecases/GetAllAnimalUseCase';
import { GetAllLoteUseCase } from '@/application/Usecases/GetAllLoteUseCase';


const sortBy = "codigo";
const sortType: SortType = "asc";
const searchField = ref("");
const searchValue = ref("");
const animalesEnCamion = ref<number[]>([])
const animalSeleccionado = ref<IAnimal | null>(null)
const animales: Ref<IAnimal[]> = ref<IAnimal[]>([]);
const lotes: Ref<ILote[]> = ref<ILote[]>([]);
const modalCargandoStore = useModalCargandoStore();
const nuevoLote = ref('')
const visibleModal = ref(false);
const formLote = ref<ILote>({ codigo: 0, nombre: "", estado: "Activo" });
const refToast = ref()
const router = useRouter();
const headers = [
  { text: 'Arete', value: 'codigo', sortable: true },
  { text: 'Foto', value: 'foto' },
  { text: 'Nombre', value: 'nombre', sortable: true },
  { text: 'Raza', value: 'raza' },
  { text: 'Edad', value: 'edad' },
  { text: 'Lote', value: 'ubicacion', sortable: true },
  { text: 'Estado', value: 'estado' },
  { text: 'Acciones', value: 'acciones' }
]

const abrirModalLote = (animal: IAnimal) => {
  animalSeleccionado.value = animal
  formLote.value = { codigo: 0, nombre: "", estado: "Activo" }
  visibleModal.value = true
}
const cerrarModal = () => {
  visibleModal.value = false;
};
const cambioLote = (nuevoCodigoLote: number) => {
  if (animalSeleccionado.value) {
    const loteSeleccionado = lotes.value.find(l => l.codigo === nuevoCodigoLote)
    if (loteSeleccionado) {
      animalSeleccionado.value.ubicacion = loteSeleccionado.nombre
      refToast.value?.show(`${animalSeleccionado.value.nombre} movido satisfactoriamente`, 'success')
    }
    animalSeleccionado.value = null
    visibleModal.value = false
  }
}
const agregarAlCamion = (codigo: number) => {
  if (!animalesEnCamion.value.includes(codigo)) {
    animalesEnCamion.value.push(codigo)
  }
}
const quitarDelCamion = (codigo: number) => {
  animalesEnCamion.value = animalesEnCamion.value.filter(c => c !== codigo)
}
const verExpediente = (animal: IAnimal) => {
  animalSeleccionado.value = animal
  nuevoLote.value = animal.ubicacion
}
const editarAnimal = (animal: IAnimal) => {
  router.push({
    path: '/animales/nuevo',
    query: { id: animal.id }
  });
}
const setRowClass = (item: IAnimal) => {
  return animalesEnCamion.value.includes(item.codigo) ? 'table-camion' : 'undo-table-camion'
}
const getAnimalByCodigo = (codigo: number): IAnimal => {
  return animales.value.find(a => a.codigo === codigo)!
}
const cargarLotes = async (): Promise<void> => {
  try {
    modalCargandoStore.mostrarModal();
    const getAllLoteUseCase = new GetAllLoteUseCase(
      new LoteRepository(new LoteService()),
    );
    const respuesta: ILote[] = await getAllLoteUseCase.ExecuteAsync();
    lotes.value = respuesta;
    modalCargandoStore.ocultarModal();
  } catch (error) {
    console.error(error);
    modalCargandoStore.ocultarModal();
    alert(error);
  }
};
const cargarAnimales = async (): Promise<void> => {
  try {
    modalCargandoStore.mostrarModal();
    const getAllLoteUseCase = new GetAllAnimalUseCase(
      new AnimalRepository(new AnimalService()),
    );
    const respuesta: IAnimal[] = await getAllLoteUseCase.ExecuteAsync();
    animales.value = respuesta;
    modalCargandoStore.ocultarModal();
  } catch (error) {
    console.error(error);
    modalCargandoStore.ocultarModal();
    alert(error);
  }
};
const iraNuevoAnimal = () => {
  router.push('/animales/nuevo');
};

onMounted(async () => {
  cargarAnimales();
  cargarLotes();
});
</script>
