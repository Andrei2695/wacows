import type { IColorService } from '@/application/Services/IColorService'
import type { IColor } from '@/domain/Entities'
import type { IColorRepository } from '@/domain/Repositories/IColorRepository'

export class ColorRepository implements IColorRepository {
  constructor(private service: IColorService) {}
  GetAll(): Promise<IColor[]> {
    return this.service.GetAll()
  }
}
