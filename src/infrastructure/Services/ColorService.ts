import type { IColorService } from '@/application/Services'
import type { IColor } from '@/domain/Entities'

export class ColorService implements IColorService {
  async GetAll(): Promise<IColor[]> {
    const colores: IColor[] = [
      { id: 1, descripcion: 'Rojo', valor: 'red' },
      { id: 2, descripcion: 'Gris', valor: 'gray' },
      { id: 3, descripcion: 'Negro', valor: 'black' },
    ]
    return colores as IColor[]
  }
}
