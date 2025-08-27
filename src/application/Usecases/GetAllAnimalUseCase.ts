import type { IAnimal } from '@/domain/Entities'
import type { IAnimalRepository } from '@/domain/Repositories/IAnimalRepository'

export class GetAllAnimalUseCase {
  constructor(private repository: IAnimalRepository) {}

  async ExecuteAsync(): Promise<IAnimal[]> {
    return await this.repository.GetAll()
  }
}
