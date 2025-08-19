import type { IUser } from '@/domain/Entities/IUser'
import type { IAuthRepository } from '@/domain/Interfaces/IAuthRepository'

export class CheckAuthUseCase {
  constructor(private repository: IAuthRepository) {}

  async ExecuteAsync(): Promise<{ user: IUser | null; token: string | null }> {
    return await this.repository.getSession()
  }
}
