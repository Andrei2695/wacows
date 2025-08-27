import type { ILote } from '../Entities'

export interface ILoteRepository {
  GetAll(): Promise<ILote[]>
}
