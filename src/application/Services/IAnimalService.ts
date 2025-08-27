import type { IAnimal } from '@/domain/Entities'

export interface IAnimalService {
  GetAll(): Promise<IAnimal[]>
  GetById(id: number): Promise<IAnimal | undefined>
}
