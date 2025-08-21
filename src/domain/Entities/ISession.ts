import { type IUser, type IFinca } from './'

export interface ISession {
  token: string
  user: IUser
  fincas: IFinca[]
  licencia: string
}
