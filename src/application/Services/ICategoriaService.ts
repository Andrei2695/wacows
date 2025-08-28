import type { ICategoria } from '@/domain/Entities/ICategoria'

export interface ICategoriaService {
  GetAll(): Promise<ICategoria[]>
}
