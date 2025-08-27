import type { ILote } from '@/domain/Entities'
import type { ILoteRepository } from '@/domain/Repositories/ILoteRepository'

export class GetAllLoteUseCase {
  constructor(private repository: ILoteRepository) {}

  async ExecuteAsync(): Promise<ILote[]> {
    return await this.repository.GetAll()
  }
}
