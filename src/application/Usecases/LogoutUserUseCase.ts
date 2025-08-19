import type { IAuthRepository } from '@/domain/Interfaces/IAuthRepository'

export class LogoutUserUseCase {
  constructor(private repository: IAuthRepository) {}

  async ExecuteAsync() {
    await this.repository.logout()
  }
}
