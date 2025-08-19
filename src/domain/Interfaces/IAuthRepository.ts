import type { IUser } from '@/domain/Entities/IUser'

export interface IAuthRepository {
  login(email: string, password: string): Promise<{ user: IUser; token: string }>
  getSession(): Promise<{ user: IUser | null; token: string | null }>
  logout(): Promise<void>
}
