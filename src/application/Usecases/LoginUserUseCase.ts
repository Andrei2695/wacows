import type { IAuthRepository } from '@/domain/Interfaces/IAuthRepository'

export class LoginUserUseCase {
  constructor(private repository: IAuthRepository) {}

  async ExecuteAsync(user: string, password: string) {
    return await this.repository.login(user, password)
  }
}
