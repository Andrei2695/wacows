import type { IRazaService } from '@/application/Services/IRazaService'
import type { IRaza } from '@/domain/Entities'
import type { IRazaRepository } from '@/domain/Repositories/IRazaRepository'

export class RazaRepository implements IRazaRepository {
  constructor(private service: IRazaService) {}
  GetAll(): Promise<IRaza[]> {
    return this.service.GetAll()
  }
}
