import { defineStore } from 'pinia'

import { AuthRepository } from '@/infrastructure/Repositories/AuthRepository'

import { LoginUserUseCase } from '@/application/Usecases/LoginUserUseCase'
import { CheckAuthUseCase } from '@/application/Usecases/CheckAuthUseCase'

import type { IUser } from '@/domain/Entities/IUser'
import { Constantes } from '@/ui/utils'
import { LogoutUserUseCase } from '@/application/Usecases/LogoutUserUseCase'

const authRepo = new AuthRepository()

export const useAuthStore = defineStore(Constantes.STORE_AUTH, {
  state: () => ({
    user: null as IUser | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(usere: string, password: string) {
      const loginUserUseCase = new LoginUserUseCase(authRepo)
      const { user, token } = await loginUserUseCase.ExecuteAsync(usere, password)
      this.user = user
      this.token = token
    },
    async logout() {
      const logoutUser = new LogoutUserUseCase(authRepo)
      await logoutUser.ExecuteAsync()
      this.user = null
      this.token = null
    },
    async restoreSession() {
      const checkAuthUseCase = new CheckAuthUseCase(authRepo)
      const { user, token } = await checkAuthUseCase.ExecuteAsync()
      this.user = user
      this.token = token
    },
  },
})
