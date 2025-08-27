<template>
  <div class="d-flex vh-100">
    <!-- Columna izquierda -->
    <div
      class="col-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white bg-custom-primary p-5">
      <img src="@/ui/assets/logo.png" alt="Logo" class="mb-4" style="width: 120px;" />
      <h1 class="display-5 fw-bold">{{ Constantes.LABEL_BIENVENIDO }}</h1>
      <p class="lead text-light text-center w-75 mt-3">
        {{ Constantes.LABEL_BIENVENIDO_DETALLE }}
      </p>
    </div>
    <div class="col-12 col-md-6 d-flex align-items-center justify-content-center bg-white">
      <div class="card border-0 shadow-lg py-5 px-4 " style="width: 100%; max-width: 400px;">
        <h2 class="text-center mb-4 text-primary">{{ Constantes.LABEL_INICIAR_SESION }}</h2>
        <form @submit.prevent="login" autocomplete="off" novalidate>
          <div class="form-floating mb-3">
            <input type="text" :class="['form-control', errores.nombre && 'is-invalid']" id="txtUsuario"
              v-model="nombre" :disabled="deshabilitarUsuarioYContrasena" />
            <label for="txtUsuario">{{ Constantes.LABEL_USUARIO }}</label>
            <div class="invalid-feedback" v-if="errores.nombre">
              {{ errores.nombre }}
            </div>
          </div>
          <div class="form-floating mb-3 position-relative">
            <input :type="showPassword ? 'text' : 'password'"
              :class="['form-control', errores.contrasena && 'is-invalid']" id="txtContrasena" v-model="contrasena"
              :disabled="deshabilitarUsuarioYContrasena" />
            <label for="txtContrasena"> {{ Constantes.LABEL_CONTRASENA
            }}</label>
            <div class="invalid-feedback" v-if="errores.contrasena">
              {{ errores.contrasena }}
            </div>
            <button type="button"
              class="btn btn-sm btn-outline-secondary position-absolute top-50 end-0 translate-middle-y me-2"
              @click="showContrasena" :disabled="deshabilitarUsuarioYContrasena">
              <IconEyeOff v-if="showPassword" :size="20" />
              <IconEye v-else :size="20" />
            </button>
          </div>
          <transition name="fade">
            <div v-if="showSeccionFinca" class="mb-3">
              <label for="fincaSelect" class="form-label">Finca</label>
              <select class="form-select" v-model="selectedFinca">
                <option value="1">Finca 1</option>
                <option value="2">Finca 2</option>
              </select>
            </div>
          </transition>
          <button class="btn btn-primary w-100" :disabled="disable" type="submit">
            <span v-if="disable" class="spinner-border spinner-border-sm me-2" role="status"></span>
            <span v-if="!showSeccionFinca">Continuar</span>
            <span v-else>Ingresar</span>
          </button>
        </form>
      </div>
    </div>
  </div>
  <Toast ref="refToast" />
</template>
<script setup lang="ts">
import { computed, reactive, ref, type Reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useSessionStore } from '@/ui/stores'
import { Constantes } from '@/ui/utils'

import Toast from '@/ui/components/shared/Toast.vue'

import { LoginUserUseCase } from '@/application/Usecases/LoginUserUseCase'
import { SessionRepository } from '@/infrastructure/Repositories/SessionRepository'
import { SessionService } from '@/infrastructure/Services/SessionService'




const nombre = ref('')
const contrasena = ref('')
const disable = ref(false)
const showPassword = ref(false)
const showSeccionFinca = ref(false)
const selectedFinca = ref(null)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const refToast = ref()
const router = useRouter()
const sessionStore = useSessionStore()
const errores: Reactive<{
  nombre?: string;
  contrasena?: string;
}> = reactive({});

const deshabilitarUsuarioYContrasena = computed(() => {
  return (
    showSeccionFinca.value || disable.value);
});
const showContrasena = () => {
  showPassword.value = !showPassword.value
}
const validarFormulario = () => {
  let esValidoElFormulario: boolean = true
  if (!nombre.value) {
    errores.nombre = `El campo ${Constantes.LABEL_USUARIO} es requerido`;
    esValidoElFormulario = false;
  } else {
    errores.nombre = undefined;
  }
  if (!contrasena.value) {
    errores.contrasena = `El campo ${Constantes.LABEL_CONTRASENA} es requerido`;
    esValidoElFormulario = false;
  } else {
    errores.contrasena = undefined;
  }
  return esValidoElFormulario
}
const login = async () => {
  try {
    if (!validarFormulario()) return


    if (showSeccionFinca.value) {
      if (!selectedFinca.value) {
        refToast.value?.show(Constantes.FINCA_REQUERIDA, 'warning')
        return
      }

      const loginUseCase = new LoginUserUseCase(
        new SessionRepository(new SessionService())
      )
      const response = await loginUseCase.ExecuteAsync(nombre.value, contrasena.value)

      if (response) {
        sessionStore.setSession(
          response,
          response.fincas.find(s => s.id == selectedFinca.value)?.nombre
        )
        router.push('/')
      } else {
        refToast.value?.show(Constantes.ERROR_CREDENCIALES_INVALIDOS, 'danger')
      }
      return
    }
    const loginUseCase = new LoginUserUseCase(
      new SessionRepository(new SessionService())
    )
    const response = await loginUseCase.ExecuteAsync(nombre.value, contrasena.value)

    if (response !== null) {
      if (response.fincas.length > 1) {
        disable.value = true
        await delay(1000);
        showSeccionFinca.value = true
      } else {
        showSeccionFinca.value = false
        sessionStore.setSession(
          response, response.fincas[0].nombre)
        router.push('/')
      }
    } else {
      refToast.value?.show(Constantes.ERROR_CREDENCIALES_INVALIDOS, 'danger')
    }
  } catch (error) {
    console.error('Error durante el login:', error)
    refToast.value?.show(Constantes.ERROR_GENERAL, 'danger')
  } finally {
    disable.value = false
  }
}


</script>
