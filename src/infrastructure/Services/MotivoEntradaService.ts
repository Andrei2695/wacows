import type { IMotivoEntradaService } from '@/application/Services'
import type { IMotivoEntrada } from '@/domain/Entities'

export class MotivoEntradaService implements IMotivoEntradaService {
  async GetAll(): Promise<IMotivoEntrada[]> {
    const categorias: IMotivoEntrada[] = [
      { id: 1, descripcion: 'Nacimiento' },
      { id: 2, descripcion: 'Subasta' },
    ]
    return categorias as IMotivoEntrada[]
  }
}
