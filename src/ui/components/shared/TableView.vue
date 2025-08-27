<template>
  <EasyDataTable table-class-name="customize-table" header-text-direction="center" body-text-direction="center"
    rowsPerPageMessage="Filas por página" emptyMessage="No hay datos disponibles" rowsOfPageSeparatorMessage="de"
    alternating theme-color="#0d821e" :headers="headers" :items="rows" :rows-per-page="rowsPerPage"
    :search-field="campoBuscar" :search-value="campoValor" :sort-by="ordenarPor" :sort-type="tipoOrden"
    :show-index="mostrarIndex" :buttons-pagination="mostrarBotonPaginacion" :body-row-class-name="getRowClass"
    v-model:items-selected="itemsSelected" class="mt-3">
    <slot v-for="header in headers" :name="`item-${header.value}`"></slot>
    <template #empty-message>
      <slot name="empty-message">
        <span>No existen registros</span>
      </slot>
    </template>
    <template #loading>
      <slot name="loading">
        <span>Cargando...</span>
      </slot>
    </template>
  </EasyDataTable>

  <br />
  {{ itemsSelected }}
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";

interface IPropiedades {
  headers: { text: string; value: string }[];
  rows: any[];
  campoBuscar?: string;
  campoValor?: string;
  ordenarPor?: string;
  tipoOrden?: "asc" | "desc";
  mostrarIndex?: boolean;
  mostrarBotonPaginacion?: boolean;
  rowsPerPage?: number;
  setClassSelected?: (nuevaClase: string) => string;
}

const props = defineProps<IPropiedades>();
const itemsSelected = ref<any[]>([]);

const getRowClass = (claseSeleccionado: string) => {
  return props.setClassSelected ? props.setClassSelected(claseSeleccionado) : "";
};
</script>
