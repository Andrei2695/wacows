import type { ISession } from '@/domain/Entities'
import type { ISessionRepository } from '@/domain/Repositories/ISessionRepository'

export class LoginUserUseCase {
  constructor(private repository: ISessionRepository) {}

  async ExecuteAsync(nombre: string, contrasena: string): Promise<ISession | null> {
    return await this.repository.login(nombre, contrasena)
  }
}
