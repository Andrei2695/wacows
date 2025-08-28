import type { ICategoriaService } from '@/application/Services/ICategoriaService'
import type { ICategoria } from '@/domain/Entities'
import type { ICategoriaRepository } from '@/domain/Repositories/ICategoriaRepository'

export class CategoriaRepository implements ICategoriaRepository {
  constructor(private service: ICategoriaService) {}
  GetAll(): Promise<ICategoria[]> {
    return this.service.GetAll()
  }
}
