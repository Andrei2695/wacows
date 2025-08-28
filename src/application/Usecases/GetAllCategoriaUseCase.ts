import type { ICategoria } from '@/domain/Entities'
import type { ICategoriaRepository } from '@/domain/Repositories/ICategoriaRepository'

export class GetAllCategoriaUseCase {
  constructor(private repository: ICategoriaRepository) {}

  async ExecuteAsync(): Promise<ICategoria[]> {
    return await this.repository.GetAll()
  }
}
