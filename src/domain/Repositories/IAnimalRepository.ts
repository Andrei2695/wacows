import type { IAnimal } from '../Entities'

export interface IAnimalRepository {
  GetAll(): Promise<IAnimal[]>
  GetById(id: number): Promise<IAnimal | undefined>
}
