import type { ILoteService } from '@/application/Services'
import type { ILote } from '@/domain/Entities'

export class LoteService implements ILoteService {
  async GetAll(): Promise<ILote[]> {
    const lotes: ILote[] = [
      { codigo: 1, nombre: 'Lote Medianos', estado: 'Activo' },
      { codigo: 2, nombre: 'Lote Grandes', estado: 'Activo' },
      { codigo: 3, nombre: 'Otro', estado: 'Activo' },
      { codigo: 4, nombre: 'LOT-Candelaria', estado: 'Activo' },
      { codigo: 5, nombre: 'LOT-San Rafael', estado: 'Activo' },
    ]
    return lotes as ILote[]
  }
}
