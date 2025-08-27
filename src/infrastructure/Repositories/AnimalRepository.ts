import type { IAnimalService } from '@/application/Services'
import type { IAnimal } from '@/domain/Entities'
import type { IAnimalRepository } from '@/domain/Repositories/IAnimalRepository'

export class AnimalRepository implements IAnimalRepository {
  constructor(private service: IAnimalService) {}
  GetAll(): Promise<IAnimal[]> {
    return this.service.GetAll()
  }
  GetById(id: number): Promise<IAnimal | undefined> {
    return this.service.GetById(id)
  }
}
