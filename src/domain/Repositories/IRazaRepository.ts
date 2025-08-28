import type { IRaza } from '../Entities'

export interface IRazaRepository {
  GetAll(): Promise<IRaza[]>
}
