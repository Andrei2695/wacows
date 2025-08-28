import type { ICategoria } from '../Entities'

export interface ICategoriaRepository {
  GetAll(): Promise<ICategoria[]>
}
