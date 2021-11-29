import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuarioadmin,
  Rol,
} from '../models';
import {UsuarioadminRepository} from '../repositories';

export class UsuarioadminRolController {
  constructor(
    @repository(UsuarioadminRepository)
    public usuarioadminRepository: UsuarioadminRepository,
  ) { }

  @get('/usuarioadmins/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Usuarioadmin',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.string('id') id: typeof Usuarioadmin.prototype.id,
  ): Promise<Rol> {
    return this.usuarioadminRepository.tiene(id);
  }
}
