import type { ILote } from '@/domain/Entities'

export interface ILoteService {
  GetAll(): Promise<ILote[]>
}
