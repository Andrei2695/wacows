import type { IMotivoEntrada } from '@/domain/Entities'
import type { IMotivoEntradaRepository } from '@/domain/Repositories/IMotivoEntradaRepository'

export class GetMotivoEntradaUseCase {
  constructor(private repository: IMotivoEntradaRepository) {}

  async ExecuteAsync(): Promise<IMotivoEntrada[]> {
    return await this.repository.GetAll()
  }
}
