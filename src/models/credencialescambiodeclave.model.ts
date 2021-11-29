import {Model, model, property} from '@loopback/repository';

@model()
export class Credencialescambiodeclave extends Model {
  @property({
    type: 'string',
    required: true,
  })
  idusuario: string;

  @property({
    type: 'string',
    required: true,
  })
  claveactual: string;

  @property({
    type: 'string',
    required: true,
  })
  nuevaclave: string;


  constructor(data?: Partial<Credencialescambiodeclave>) {
    super(data);
  }
}

export interface CredencialescambiodeclaveRelations {
  // describe navigational properties here
}

export type CredencialescambiodeclaveWithRelations = Credencialescambiodeclave & CredencialescambiodeclaveRelations;
