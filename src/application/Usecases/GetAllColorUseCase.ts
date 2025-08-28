import type { IColor } from '@/domain/Entities'
import type { IColorRepository } from '@/domain/Repositories/IColorRepository'

export class GetAllColorUseCase {
  constructor(private repository: IColorRepository) {}

  async ExecuteAsync(): Promise<IColor[]> {
    return await this.repository.GetAll()
  }
}
