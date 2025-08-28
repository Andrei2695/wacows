import type { ICategoriaService } from '@/application/Services'
import type { ICategoria } from '@/domain/Entities'

export class CategoriaService implements ICategoriaService {
  async GetAll(): Promise<ICategoria[]> {
    const categorias: ICategoria[] = [
      { id: 1, descripcion: 'Macho' },
      { id: 2, descripcion: 'Hembra' },
    ]
    return categorias as ICategoria[]
  }
}
