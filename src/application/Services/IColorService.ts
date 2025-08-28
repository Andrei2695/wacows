import type { IColor } from '@/domain/Entities/IColor'

export interface IColorService {
  GetAll(): Promise<IColor[]>
}
