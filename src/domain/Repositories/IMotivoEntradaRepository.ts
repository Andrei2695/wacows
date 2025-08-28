import type { IMotivoEntrada } from '../Entities'

export interface IMotivoEntradaRepository {
  GetAll(): Promise<IMotivoEntrada[]>
}
