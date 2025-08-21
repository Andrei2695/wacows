import type { ISessionService } from '@/application/Services/ISessionService'
import type { ISession } from '@/domain/Entities'
import type { ISessionRepository } from '@/domain/Repositories/ISessionRepository'

export class SessionRepository implements ISessionRepository {
  constructor(private sessionService: ISessionService) {}

  login(nombre: string, contrasena: string): Promise<ISession | null> {
    return this.sessionService.login(nombre, contrasena)
  }
}
