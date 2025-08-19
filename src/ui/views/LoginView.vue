<template>
  <div class="d-flex vh-100">
    <!-- Columna izquierda -->
    <div class="col-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white bg-primary p-5">
      <img src="@/ui/assets/logo.png" alt="Logo" class="mb-4" style="width: 120px;" />
      <h1 class="display-5 fw-bold">{{ Constantes.LABEL_BIENVENIDO }}</h1>
      <p class="lead text-light text-center w-75 mt-3">
        {{ Constantes.LABEL_BIENVENIDO_DETALLE }}
      </p>
    </div>
    <div class="col-12 col-md-6 d-flex align-items-center justify-content-center bg-white">
      <div class="card border-0 shadow-lg py-5 px-4 " style="width: 100%; max-width: 400px;">
        <h2 class="text-center mb-4 text-primary">{{ Constantes.LABEL_INICIAR_SESION }}</h2>
        <form @submit.prevent="doLogin" autocomplete="off" novalidate>
          <div class="form-floating mb-3">
            <label for="txtUsuario">{{ Constantes.LABEL_USUARIO }}</label>
            <input type="text" :class="['form-control', errores.usuario && 'is-invalid']" id="txtUsuario" v-model="user"
              :disabled="deshabilitarUsuarioYContrasena" />
            <div class="invalid-feedback" v-if="errores.usuario">
              {{ errores.usuario }}
            </div>
          </div>
          <div class="form-floating mb-3 position-relative">
            <label for="txtContrasena"> {{ Constantes.LABEL_CONTRASENA }}</label>
            <input :type="showPass ? 'text' : 'password'" :class="['form-control', errores.contrasena && 'is-invalid']"
              id="txtContrasena" v-model="contrasena" :disabled="deshabilitarUsuarioYContrasena" />
            <div class="invalid-feedback" v-if="errores.contrasena">
              {{ errores.contrasena }}
            </div>
            <button type="button"
              class="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
              @click="mostrarContrasena" :disabled="deshabilitarUsuarioYContrasena">
              <EyeOff v-if="showPass" :size="20" />
              <Eye v-else :size="20" />
            </button>
          </div>
          <transition name="fade">
            <div v-if="requiereFinca" class="mb-3">
              <label for="fincaSelect" class="form-label">Finca</label>
              <select class="form-select" v-model="fincaSeleccionada" :disabled="cargando">
                <option value="1">Prueba 1</option>
                <option value="2">Prueba 2</option>
              </select>
            </div>
          </transition>
          <button class="btn btn-primary w-100" :disabled="cargando" @click="doLogin">
            <span v-if="cargando" class="spinner-border spinner-border-sm me-2" role="status"></span>
            <span v-if="!requiereFinca">Continuar</span>
            <span v-else>Ingresar</span>
          </button>
        </form>
      </div>
    </div>
  </div>
  <Toast ref="toastRef" />
</template>
<script setup lang="ts">
import { computed, reactive, ref, type Reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/ui/stores/auth'
import { Constantes } from '@/ui/utils'

import Toast from '@/ui/components/shared/Toast.vue'

const user = ref('')
const contrasena = ref('')
const requiereFinca = ref(false)
const cargando = ref(false)
const showPass = ref(false)
const fincaSeleccionada = ref(null)
const toastRef = ref()
const router = useRouter()
const authStore = useAuthStore()
const errores: Reactive<{
  usuario?: string;
  contrasena?: string;
}> = reactive({});

const deshabilitarUsuarioYContrasena = computed(() => {
  return (
    requiereFinca.value || cargando.value);
});
const mostrarContrasena = () => {
  showPass.value = !showPass.value
}
const validarFormulario = () => {
  let esValidoElFormulario: boolean = true
  if (!user.value) {
    errores.usuario = `El campo ${Constantes.LABEL_USUARIO} es requerido`;
    esValidoElFormulario = false;
  } else {
    errores.usuario = undefined;
  }
  if (!contrasena.value) {
    errores.contrasena = `El campo ${Constantes.LABEL_CONTRASENA} es requerido`;
    esValidoElFormulario = false;
  } else {
    errores.contrasena = undefined;
  }
  return esValidoElFormulario
}

const doLogin = async () => {
  if (requiereFinca.value) {
    if (!fincaSeleccionada.value) {
      toastRef.value?.show('Debe seleccionar una finca', 'warning')
      return
    }
    // authStore.seleccionarFinca(fincaSeleccionada.value)
    localStorage.setItem('selectedFinca', JSON.stringify(fincaSeleccionada.value))
    router.push('/')
    return
  }
  if (!validarFormulario()) {
    return
  }
  cargando.value = true

  try {
    const { success, requiereSeleccionFinca } = await authStore.login(user.value, contrasena.value)

    if (success) {
      if (requiereSeleccionFinca) {
        requiereFinca.value = true
      } else {
        router.push('/')
      }
    } else {
      toastRef.value?.show(Constantes.ERROR_CREDENCIALES_INVALIDOS, 'danger')
    }
  } catch (error) {
    toastRef.value?.show(Constantes.ERROR_GENERAL, 'danger')
  } finally {
    cargando.value = false
  }
}

</script>
