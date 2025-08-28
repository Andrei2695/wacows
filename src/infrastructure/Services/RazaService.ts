import type { IRazaService } from '@/application/Services'
import type { IRaza } from '@/domain/Entities'

export class RazaService implements IRazaService {
  async GetAll(): Promise<IRaza[]> {
    const razas: IRaza[] = [
      { id: 1, nombre: 'Brahman' },
      { id: 2, nombre: 'Brahman Cruza' },
      { id: 3, nombre: 'Holstein' },
      { id: 4, nombre: 'Jersey' },
      { id: 5, nombre: 'Angus' },
      { id: 6, nombre: 'Simmental' },
      { id: 7, nombre: 'Gyr' },
      { id: 8, nombre: 'Pardo Suizo' },
      { id: 9, nombre: 'Charolais' },
      { id: 10, nombre: 'Limousin' },
      { id: 11, nombre: 'Santa Gertrudis' },
      { id: 12, nombre: 'Criollo' },
    ]
    return razas as IRaza[]
  }
}
