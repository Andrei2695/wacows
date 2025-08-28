<template>
  <div class="mb-3 row">
    <div class="col-12">
      <h5 class="mt-2">
        {{ modo === 'agregar' ? Constantes.LABEL_AGREGAR_ANIMAL : Constantes.LABEL_EDITAR_ANIMAL }}
      </h5>
    </div>
  </div>
  <form @submit.prevent="guardarAnimal">
    <div class="row mb-3">
      <div class="col-6 col-md-2">
        <label class="form-label">Código</label>
        <input v-model="animal.codigo" type="number" class="form-control" disabled />
      </div>
      <div class="col-6 col-md-4">
        <label class="form-label">Nombre</label>
        <input v-model="animal.nombre" type="text" :class="['form-control', errores.nombre && 'is-invalid']" />
        <div class="invalid-feedback" v-if="errores.nombre">{{ errores.nombre }}</div>
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label">Raza</label>
        <select v-model="animal.idRaza" :class="['form-select', errores.idRaza && 'is-invalid']">
          <option :value="0">{{ Constantes.SELECT_LABEL }}</option>
          <option v-for="l in razas" :key="l.id" :value="l.id">{{ l.nombre }}</option>
        </select>
        <div class="invalid-feedback" v-if="errores.idRaza">{{ errores.idRaza }}</div>
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label">Categoría</label>
        <select v-model="animal.idCategoria" :class="['form-select', errores.idCategoria && 'is-invalid']">
          <option :value="0">{{ Constantes.SELECT_LABEL }}</option>
          <option v-for="l in categorias" :key="l.id" :value="l.id">{{ l.descripcion }}</option>
        </select>
        <div class="invalid-feedback" v-if="errores.idCategoria">{{ errores.idCategoria }}</div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12 col-md-4">
        <label class="form-label">Lote</label>
        <select v-model="animal.idLote" :class="['form-select', errores.idLote && 'is-invalid']">
          <option :value="0">{{ Constantes.SELECT_LABEL }}</option>
          <option v-for="l in lotes" :key="l.id" :value="l.id">{{ l.nombre }}</option>
        </select>
        <div class="invalid-feedback" v-if="errores.idLote">{{ errores.idLote }}</div>
      </div>
      <div class="col-12 col-md-4">
        <label class="form-label">Motivo Entrada</label>
        <select v-model="animal.idMotivoEntrada" :class="['form-select', errores.idMotivoEntrada && 'is-invalid']">
          <option :value="0">{{ Constantes.SELECT_LABEL }}</option>
          <option v-for="l in motivosEntrada" :key="l.id" :value="l.id">{{ l.descripcion }}</option>
        </select>
        <div class="invalid-feedback" v-if="errores.idMotivoEntrada">{{ errores.idMotivoEntrada }}</div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-6 col-md-3">
        <label class="form-label">Fecha Nacimiento</label>
        <input :value="animal.fechaNacimiento ? animal.fechaNacimiento.toISOString().split('T')[0] : ''"
          @input="animal.fechaNacimiento = new Date(($event.target as HTMLInputElement).value)" type="date"
          :class="['form-control', errores.fechaNacimiento && 'is-invalid']" :disabled="animal.idMotivoEntrada == 2" />
        <div class="invalid-feedback" v-if="errores.fechaNacimiento">{{ errores.fechaNacimiento }}</div>
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label">Fecha Entrada</label>
        <input :value="animal.fechaEntrada ? animal.fechaEntrada.toISOString().split('T')[0] : ''"
          @input="animal.fechaEntrada = new Date(($event.target as HTMLInputElement).value)" type="date"
          :class="['form-control', errores.fechaEntrada && 'is-invalid']" :disabled="animal.idMotivoEntrada == 1" />
        <div class="invalid-feedback" v-if="errores.fechaEntrada">{{ errores.fechaEntrada }}</div>
      </div>
      <div class="col-6 col-md-2">
        <label class="form-label">Edad (meses)</label>
        <input v-model="animal.edad" type="number" :class="['form-control', errores.edad && 'is-invalid']"
          :disabled="animal.idMotivoEntrada == 1" />
        <div class="invalid-feedback" v-if="errores.edad">{{ errores.edad }}</div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-6 col-md-3">
        <label class="form-label">Color</label>
        <select v-model="animal.idColor" :class="['form-select', errores.idColor && 'is-invalid']">
          <option :value="0">{{ Constantes.SELECT_LABEL }}</option>
          <option v-for="l in colores" :key="l.id" :value="l.id">{{ l.descripcion }}</option>
        </select>
        <div class="invalid-feedback" v-if="errores.idColor">{{ errores.idColor }}</div>
      </div>
      <div class="col-6 col-md-3">
        <label class="form-label">Estado</label>
        <select v-model="animal.estado" class="form-select">
          <option>Activo</option>
          <option>Muerto</option>
          <option>Vendido</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-primary me-2">Guardar</button>
        <button type="button" class="btn btn-secondary" @click="iraAnimalList">Salir</button>
      </div>
    </div>
  </form>
  <Toast ref="refToast" />
</template>



<script setup lang="ts">
import { ref, onMounted, watch, type Reactive, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Constantes } from "@/ui/utils";
import type { IAnimal, ILote, IRaza, ICategoria, IColor, IMotivoEntrada } from '@/domain/Entities';
import Toast from '@/ui/components/shared/Toast.vue'
import { LoteService } from '@/infrastructure/Services/LoteService';
import { LoteRepository } from '@/infrastructure/Repositories/LoteRepository';
import { GetAllLoteUseCase } from '@/application/Usecases/GetAllLoteUseCase';
import { AnimalService } from '@/infrastructure/Services/AnimalService';
import { AnimalRepository } from '@/infrastructure/Repositories/AnimalRepository';
import { GetAllRazaUseCase } from '@/application/Usecases/GetAllRazaUseCase';
import { RazaService } from '@/infrastructure/Services/RazaService';
import { RazaRepository } from '@/infrastructure/Repositories/RazaRepository';
import { GetAllCategoriaUseCase } from '@/application/Usecases/GetAllCategoriaUseCase';
import { CategoriaService } from '@/infrastructure/Services/CategoriaService';
import { CategoriaRepository } from '@/infrastructure/Repositories/CategoriaRepository';
import { GetAllColorUseCase } from '@/application/Usecases/GetAllColorUseCase';
import { ColorService } from '@/infrastructure/Services/ColorService';
import { ColorRepository } from '@/infrastructure/Repositories/ColorRepository';
import { GetMotivoEntradaUseCase } from '@/application/Usecases/GetMotivoEntradaUseCase';
import { MotivoEntradaService } from '@/infrastructure/Services/MotivoEntradaService';
import { MotivoEntradaRepository } from '@/infrastructure/Repositories/MotivoEntradaRepository';


const router = useRouter();
const route = useRoute();
const refToast = ref()
const animal = ref<IAnimal>({
  id: 0,
  foto: '',
  codigo: 0,
  nombre: '',
  idRaza: 0,
  idCategoria: 0,
  edad: 0,
  idColor: 0,
  idLote: 0,
  estado: 'Activo',
  idMotivoEntrada: 0,

});
const lotes = ref<ILote[]>([]);
const razas = ref<IRaza[]>([]);
const categorias = ref<ICategoria[]>([]);
const colores = ref<IColor[]>([]);
const motivosEntrada = ref<IMotivoEntrada[]>([]);
const modo = ref<'agregar' | 'editar'>('agregar');
const errores: Reactive<{
  nombre?: string;
  idRaza?: string;
  idCategoria?: string;
  idLote?: string;
  idMotivoEntrada?: string;
  edad?: string;
  idColor?: string;
  fechaNacimiento?: string;
  fechaEntrada?: string;
}> = reactive({});

const cargarColores = async () => {
  const getAllCategoriaUseCase = new GetAllColorUseCase(new ColorRepository(new ColorService()));
  colores.value = await getAllCategoriaUseCase.ExecuteAsync();
};
const cargarMotivosEntrada = async () => {
  const getAllCategoriaUseCase = new GetMotivoEntradaUseCase(new MotivoEntradaRepository(new MotivoEntradaService()));
  motivosEntrada.value = await getAllCategoriaUseCase.ExecuteAsync();
};
const cargarCategorias = async () => {
  const getAllCategoriaUseCase = new GetAllCategoriaUseCase(new CategoriaRepository(new CategoriaService()));
  categorias.value = await getAllCategoriaUseCase.ExecuteAsync();
};
const cargarLotes = async () => {
  const getAllLoteUseCase = new GetAllLoteUseCase(new LoteRepository(new LoteService()));
  lotes.value = await getAllLoteUseCase.ExecuteAsync();
};
const cargarRazas = async () => {
  const getAllRazaUseCase = new GetAllRazaUseCase(new RazaRepository(new RazaService()));
  razas.value = await getAllRazaUseCase.ExecuteAsync();
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

const validarFormulario = (): boolean => {
  let esValidoElFormulario = true;

  Object.keys(errores).forEach(k => delete errores[k as keyof typeof errores]);

  if (!animal.value.nombre) {
    errores.nombre = "El campo nombre es requerido";
    esValidoElFormulario = false;
  }

  if (!animal.value.idRaza) {
    errores.idRaza = "Debe seleccionar una raza";
    esValidoElFormulario = false;
  }

  if (!animal.value.idCategoria) {
    errores.idCategoria = "Debe seleccionar una categoría";
    esValidoElFormulario = false;
  }

  if (!animal.value.idLote) {
    errores.idLote = "Debe seleccionar un lote";
    esValidoElFormulario = false;
  }

  if (!animal.value.idMotivoEntrada) {
    errores.idMotivoEntrada = "Debe seleccionar un motivo de entrada";
    esValidoElFormulario = false;
  }

  if (!animal.value.edad && animal.value.idMotivoEntrada != 1) {
    errores.edad = "Debe ingresar la edad";
    esValidoElFormulario = false;
  }

  if (!animal.value.idColor) {
    errores.idColor = "Debe seleccionar un color";
    esValidoElFormulario = false;
  }
  const hoy = new Date();
  if (animal.value.idMotivoEntrada === 1) {
    if (!animal.value.fechaNacimiento) {
      errores.fechaNacimiento = "Debe ingresar la fecha de nacimiento";
      esValidoElFormulario = false;
    } else if (animal.value.fechaNacimiento > hoy) {
      errores.fechaNacimiento = "La fecha de nacimiento no puede ser futura";
      esValidoElFormulario = false;
    }
  } else {
    if (!animal.value.fechaEntrada) {
      errores.fechaEntrada = "Debe ingresar la fecha de entrada";
      esValidoElFormulario = false;
    } else if (animal.value.fechaNacimiento && animal.value.fechaEntrada < animal.value.fechaNacimiento) {
      errores.fechaEntrada = "La fecha de entrada no puede ser anterior a la fecha de nacimiento";
      esValidoElFormulario = false;
    }
  }
  return esValidoElFormulario;
};
const guardarAnimal = () => {
  if (!validarFormulario()) return;
  //  const repo = new AnimalRepository(new AnimalService());
  if (modo.value === 'agregar') {
    refToast.value?.show(`Animal ingresado satisfactoriamente`, 'success')
    // await repo.create(animal.value);
  } else {
    // await repo.update(animal.value.codigo, animal.value); // tu PUT
    refToast.value?.show(`Animal modificado satisfactoriamente`, 'success')
  }
  setTimeout(() => {
    router.push('/animales/lista');
  }, 1500)

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
  cargarColores();
  cargarMotivosEntrada();
  cargarCategorias();
  cargarRazas();
  cargarLotes();
  const id = Number(route.query.id);
  if (id) {
    cargarAnimal(id);
  }
});
</script>
