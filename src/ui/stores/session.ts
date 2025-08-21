import { defineStore } from 'pinia'

import type { ISession } from '@/domain/Entities'
import { Constantes } from '@/ui/utils'
import { LocalStorageService } from '@/infrastructure/Services/LocalStorageService'

export const useSessionStore = defineStore(Constantes.STORE_SESSION, {
  state: () => ({
    session: null as ISession | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.session?.token,
  },
  actions: {
    setSession(session: ISession, fincaSeleccionada?: string) {
      this.session = session
      LocalStorageService.save('token', session.token)
      LocalStorageService.save('user', JSON.stringify(session.user))
      if (fincaSeleccionada) {
        LocalStorageService.save('fincaSeleccionada', fincaSeleccionada)
      }
    },
    cleanSession() {
      this.session = null
      LocalStorageService.remove('token')
      LocalStorageService.remove('user')
      LocalStorageService.remove('fincaSeleccionada')
    },
    getSession(): ISession | null {
      return this.session
    },
  },
})
