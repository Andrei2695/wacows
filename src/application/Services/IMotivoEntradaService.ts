import type { IMotivoEntrada } from '@/domain/Entities/IMotivoEntrada'

export interface IMotivoEntradaService {
  GetAll(): Promise<IMotivoEntrada[]>
}
