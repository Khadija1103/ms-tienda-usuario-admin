import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Rol} from './rol.model';

@model()
export class Usuarioadmin extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;
  
  @property({
    type: 'string',
      required: false,
  })
  clave: string;

  @belongsTo(() => Rol, {name: 'tiene'})
  idrol: string;

  constructor(data?: Partial<Usuarioadmin>) {
    super(data);
  }
}

export interface UsuarioadminRelations {
  // describe navigational properties here
}

export type UsuarioadminWithRelations = Usuarioadmin & UsuarioadminRelations;
