import type { IAnimalService } from '@/application/Services'
import type { IAnimal } from '@/domain/Entities'

export class AnimalService implements IAnimalService {
  async GetById(id: number): Promise<IAnimal | undefined> {
    const animales = await this.GetAll()
    return animales.find((a) => a.id === id)
  }
  async GetAll(): Promise<IAnimal[]> {
    const animales: IAnimal[] = [
      {
        id: 1,
        foto: 'https://picsum.photos/200/300?1',
        codigo: 6429,
        nombre: 'Chompolon',
        idRaza: 8,
        idCategoria: 2,
        edad: 30,
        idColor: 3,
        idLote: 2,
        estado: 'Activo',
        fechaEntrada: new Date('2022-07-01'),
        idMotivoEntrada: 2,
      },
      {
        id: 2,
        foto: 'https://picsum.photos/200/300?2',
        codigo: 6430,
        nombre: 'Luna',
        idRaza: 2,
        idCategoria: 2,
        edad: 24,
        idColor: 2,
        idLote: 2,
        estado: 'Activo',
        fechaNacimiento: new Date('2021-12-10'),
        fechaEntrada: new Date('2022-09-10'),
        idMotivoEntrada: 2,
      },
      {
        id: 3,
        foto: 'https://picsum.photos/200/300?3',
        codigo: 6431,
        nombre: 'Toro Bravo',
        idRaza: 3,
        idCategoria: 4,
        edad: 36,
        idColor: 1,
        idLote: 1,
        estado: 'Vendido',
        fechaNacimiento: new Date('2021-12-10'),
        fechaEntrada: new Date('2022-08-05'),
        idMotivoEntrada: 3,
      },
      {
        id: 4,
        foto: 'https://picsum.photos/200/300?4',
        codigo: 6432,
        nombre: 'Manchita',
        idRaza: 4,
        idCategoria: 1,
        edad: 18,
        idColor: 2,
        idLote: 2,
        estado: 'Muerto',
        fechaNacimiento: new Date('2023-01-25'),
        fechaEntrada: new Date('2023-06-15'),
        idMotivoEntrada: 4,
      },
      {
        id: 5,
        foto: 'https://picsum.photos/200/300?5',
        codigo: 6433,
        nombre: 'Pancho',
        idRaza: 5,
        idCategoria: 3,
        edad: 28,
        idColor: 1,
        idLote: 1,
        estado: 'Activo',
        fechaNacimiento: new Date('2022-03-10'),
        fechaEntrada: new Date('2022-10-01'),
        idMotivoEntrada: 1,
      },
      {
        id: 6,
        foto: 'https://picsum.photos/200/300?6',
        codigo: 6434,
        nombre: 'Clarita',
        idRaza: 6,
        idCategoria: 1,
        edad: 22,
        idColor: 2,
        idLote: 2,
        estado: 'Activo',
        fechaNacimiento: new Date('2022-08-12'),
        fechaEntrada: new Date('2023-01-20'),
        idMotivoEntrada: 2,
      },
    ]
    return animales as IAnimal[]
  }
}
