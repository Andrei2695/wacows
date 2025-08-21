import type { ISession } from '@/domain/Entities'

export interface ISessionRepository {
  login(nombre: string, contrasena: string): Promise<ISession | null>
}
