import type { IRaza } from '@/domain/Entities'
import type { IRazaRepository } from '@/domain/Repositories/IRazaRepository'

export class GetAllRazaUseCase {
  constructor(private repository: IRazaRepository) {}

  async ExecuteAsync(): Promise<IRaza[]> {
    return await this.repository.GetAll()
  }
}
