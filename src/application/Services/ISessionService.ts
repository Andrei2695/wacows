import type { ISession } from '@/domain/Entities'

export interface ISessionService {
  login(nombre: string, contrasena: string): Promise<ISession>
}
