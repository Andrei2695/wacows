import type { IRaza } from '@/domain/Entities/IRaza'

export interface IRazaService {
  GetAll(): Promise<IRaza[]>
}
