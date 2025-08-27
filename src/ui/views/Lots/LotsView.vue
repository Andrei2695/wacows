<template>
  <div class="mb-3 row">
    <div class="col-md-1">
      <h5 class="mt-2">{{ Constantes.LABEL_LOTS }}</h5>
    </div>
    <div class="col-11 d-flex justify-content-end">
      <button class="btn btn-primary" :title="Constantes.TOOLTIP_AGREGAR_LOTE" @click="abrirModal">
        <IconPlus :size="16" />
      </button>
    </div>
  </div>
  <div class="mt-8">
    <EasyDataTable :theme-color="'#0d821e'" class="mt-3" :headers="headers" :items="lotes"
      rowsPerPageMessage="Filas por página" rowsOfPageSeparatorMessage="de" emptyMessage="No hay datos disponibles"
      buttons-pagination alternating :rows-per-page="5" :sort-by="sortBy" :sort-type="sortType"
      table-class-name="customize-table" header-text-direction="center" body-text-direction="center">
      <template #item-estado="{ estado }">
        <span class="badge rounded-pill" :class="{
          'bg-success': estado === 'Activo',
          'bg-danger': estado === 'Inactivo'
        }">
          {{ estado }}
        </span>
      </template>
      <template #item-acciones="{ codigo, estado }">
        <div class="btn-group btn-group-sm">
          <button v-if="estado === 'Activo'" class="btn btn-outline-secondary"
            @click="editarModal(getLoteByCodigo(codigo))" title="Editar lote">
            <IconPencil :size="22" />
          </button>
          <button class="btn btn-outline-secondary" @click="cambiarEstado(codigo)"
            :title="estado === 'Activo' ? 'Inactivar lote' : 'Activar lote'">
            <IconBadgeCheck v-if="estado === 'Activo'" :size="22" />
            <IconBadge v-else :size="22" />
          </button>
        </div>
      </template>
    </EasyDataTable>
    <LoteModal :visible="visibleModal" :modo="modo" :lote="formLote" @cancelar="cerrarModal" @guardar="guardarLote" />
    <Toast ref="refToast" />
  </div>
</template>
<script setup lang="ts">
import { type Ref, ref, onMounted } from "vue";
import { type SortType } from "vue3-easy-data-table";
import { Constantes } from "@/ui/utils";
import type { ILote } from "@/domain/Entities";
import { useModalCargandoStore } from '@/ui/stores/index'
import Toast from '@/ui/components/shared/Toast.vue'
import LoteModal from "@/ui/views/Lots/LotViewModal.vue";

import { LoteService } from '@/infrastructure/Services/LoteService';
import { LoteRepository } from '@/infrastructure/Repositories/LoteRepository';
import { GetAllLoteUseCase } from '@/application/Usecases/GetAllLoteUseCase';

const sortBy = "codigo";
const sortType: SortType = "asc";
const visibleModal = ref(false);
const modo = ref<"agregar" | "editar">("agregar");
const formLote = ref<ILote>({ codigo: 0, nombre: "", estado: "Activo" });
const lotes: Ref<ILote[]> = ref<ILote[]>([]);
const modalCargandoStore = useModalCargandoStore();
const refToast = ref()
const headers = [
  { text: "Código", value: "codigo", sortable: true },
  { text: "Nombre", value: "nombre", sortable: true },
  { text: "Estado", value: "estado" },
  { text: "Acciones", value: "acciones" }
];


const abrirModal = () => {
  modo.value = "agregar";
  formLote.value = { codigo: lotes.value.length + 1, nombre: "", estado: "Activo" };
  visibleModal.value = true;
};
const editarModal = (lote: ILote) => {
  modo.value = "editar";
  formLote.value = { ...lote };
  visibleModal.value = true;
};
const cerrarModal = () => {
  visibleModal.value = false;
};
const guardarLote = (lote: ILote) => {
  if (modo.value === "agregar") {
    lotes.value.push(lote);
  } else if (modo.value === "editar") {
    const index = lotes.value.findIndex(l => l.codigo === lote.codigo);
    if (index !== -1) lotes.value[index] = lote;
  }
  cerrarModal();
  refToast.value?.show("Registro ingresado satisfactoriamente", 'success')
};

const cambiarEstado = (codigo: number) => {
  const lote = lotes.value.find(l => l.codigo === codigo);
  if (lote) {
    lote.estado = lote.estado === "Activo" ? "Inactivo" : "Activo";
    const mensaje = lote.estado === "Activo"
      ? "Lote activado satisfactoriamente"
      : "Lote inactivado satisfactoriamente";

    refToast.value?.show(mensaje, "success");
  }
};

const getLoteByCodigo = (codigo: number): ILote => {
  return lotes.value.find(a => a.codigo === codigo)!;
};
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

onMounted(async () => {
  await cargarLotes();
});
</script>
