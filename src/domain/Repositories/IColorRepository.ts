import type { IColor } from '../Entities'

export interface IColorRepository {
  GetAll(): Promise<IColor[]>
}
