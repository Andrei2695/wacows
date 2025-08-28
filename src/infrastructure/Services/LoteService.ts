import type { ILoteService } from '@/application/Services'
import type { ILote } from '@/domain/Entities'

export class LoteService implements ILoteService {
  async GetAll(): Promise<ILote[]> {
    const lotes: ILote[] = [
      { id: 1, nombre: 'Lote Medianos', estado: 'Activo' },
      { id: 2, nombre: 'Lote Grandes', estado: 'Activo' },
      { id: 3, nombre: 'Otro', estado: 'Activo' },
      { id: 4, nombre: 'LOT-Candelaria', estado: 'Activo' },
      { id: 5, nombre: 'LOT-San Rafael', estado: 'Activo' },
    ]
    return lotes as ILote[]
  }
}
