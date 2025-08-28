import type { IMotivoEntradaService } from '@/application/Services/IMotivoEntradaService'
import type { IMotivoEntrada } from '@/domain/Entities'
import type { IMotivoEntradaRepository } from '@/domain/Repositories/IMotivoEntradaRepository'

export class MotivoEntradaRepository implements IMotivoEntradaRepository {
  constructor(private service: IMotivoEntradaService) {}
  GetAll(): Promise<IMotivoEntrada[]> {
    return this.service.GetAll()
  }
}
