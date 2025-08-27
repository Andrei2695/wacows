import type { IAnimal } from '@/domain/Entities'
import type { IAnimalRepository } from '@/domain/Repositories/IAnimalRepository'

export class GetAnimalByIdUseCase {
  constructor(private repository: IAnimalRepository) {}

  async ExecuteAsync(id: number): Promise<IAnimal | undefined> {
    return await this.repository.GetById(id)
  }
}
