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
        raza: 'Brahman Cruza',
        genero: 'Macho',
        edad: '30',
        color: 'red',
        caracteristicas: '',
        ubicacion: 'LOT-Candelaria',
        estado: 'Activo',
      },
      {
        id: 2,
        foto: 'https://picsum.photos/200/300?2',
        codigo: 6430,
        nombre: 'Luna',
        raza: 'Holstein',
        genero: 'Hembra',
        edad: '24',
        color: 'blue',
        caracteristicas: 'Muy dócil',
        ubicacion: 'LOT-San Rafael',
        estado: 'Activo',
      },
      {
        id: 3,
        foto: 'https://picsum.photos/200/300?3',
        codigo: 6431,
        nombre: 'Toro Bravo',
        raza: 'Brahman',
        genero: 'Macho',
        edad: '36',
        color: 'yellow',
        caracteristicas: 'Agresivo',
        ubicacion: 'LOT-Candelaria',
        estado: 'Vendido',
      },
      {
        id: 4,
        foto: 'https://picsum.photos/200/300?4',
        codigo: 6432,
        nombre: 'Manchita',
        raza: 'Jersey',
        genero: 'Hembra',
        edad: '18',
        color: 'gray',
        caracteristicas: 'Pequeña y amigable',
        ubicacion: 'LOT-San Rafael',
        estado: 'Muerto',
      },
      {
        id: 5,
        foto: 'https://picsum.photos/200/300?5',
        codigo: 6433,
        nombre: 'Pancho',
        raza: 'Angus',
        genero: 'Macho',
        edad: '28',
        color: '#133355a',
        caracteristicas: 'Fuerte y robusto',
        ubicacion: 'LOT-Candelaria',
        estado: 'Activo',
      },
      {
        id: 6,
        foto: 'https://picsum.photos/200/300?6',
        codigo: 6434,
        nombre: 'Clarita',
        raza: 'Simmental',
        genero: 'Hembra',
        edad: '22',
        color: '#44455a',
        caracteristicas: 'Buen temperamento',
        ubicacion: 'LOT-San Rafael',
        estado: 'Activo',
      },
    ]
    return animales as IAnimal[]
  }
}
