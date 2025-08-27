import type { ILoteService } from '@/application/Services/ILoteService'
import type { ILote } from '@/domain/Entities'
import type { ILoteRepository } from '@/domain/Repositories/ILoteRepository'

export class LoteRepository implements ILoteRepository {
  constructor(private service: ILoteService) {}
  GetAll(): Promise<ILote[]> {
    return this.service.GetAll()
  }
}
