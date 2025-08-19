import type { IUser } from '@/domain/Entities/IUser'

import type { IAuthRepository } from '@/domain/Interfaces/IAuthRepository'
import { LocalStorageService } from '@/infrastructure/Services/LocalStorageService'

export class AuthRepository implements IAuthRepository {
  async login(user: string, password: string): Promise<{ user: IUser; token: string }> {
    // Aquí iría la llamada al backend, por ahora mock
    const userd: IUser = { id: 1, user: 'Andrei', password: password }
    const token = 'fake-jwt-token'

    LocalStorageService.save('token', token)
    LocalStorageService.save('user', JSON.stringify(user))

    return { user: userd, token }
  }
  async logout(): Promise<void> {
    LocalStorageService.remove('token')
    LocalStorageService.remove('user')
  }
  async getSession(): Promise<{ user: IUser | null; token: string | null }> {
    const token = LocalStorageService.get('token')
    const userStr = LocalStorageService.get('user')
    return {
      token,
      user: userStr ? (JSON.parse(userStr) as IUser) : null,
    }
  }
}
