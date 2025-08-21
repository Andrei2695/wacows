import type { ISession } from '@/domain/Entities'
import type { ISessionService } from '@/application/Services/ISessionService'

export class SessionService implements ISessionService {
  async login(nombre: string, contrasena: string): Promise<ISession> {
    const sessionesSimulados: ISession[] = [
      {
        user: { id: 1, nombre: 'admin', contrasena: '1234' },
        token: 'token1',
        fincas: [
          { id: 1, nombre: 'Finca 1' },
          { id: 2, nombre: 'Finca 2' },
        ],
        licencia: '123456',
      },
      {
        user: { id: 2, nombre: 'juan', contrasena: '1234' },
        token: 'token2',
        fincas: [{ id: 3, nombre: 'Finca 3' }],
        licencia: '654321',
      },
    ]
    const session =
      sessionesSimulados.find(
        (s) => s.user.nombre === nombre && s.user.contrasena === contrasena,
      ) || null
    return session as ISession
  }
}
