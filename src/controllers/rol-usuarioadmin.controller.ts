import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Rol,
  Usuarioadmin,
} from '../models';
import {RolRepository} from '../repositories';

export class RolUsuarioadminController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/usuarioadmins', {
    responses: {
      '200': {
        description: 'Array of Rol has many Usuarioadmin',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarioadmin)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuarioadmin>,
  ): Promise<Usuarioadmin[]> {
    return this.rolRepository.taasociado(id).find(filter);
  }

  @post('/rols/{id}/usuarioadmins', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarioadmin)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioadmin, {
            title: 'NewUsuarioadminInRol',
            exclude: ['id'],
            optional: ['idrol']
          }),
        },
      },
    }) usuarioadmin: Omit<Usuarioadmin, 'id'>,
  ): Promise<Usuarioadmin> {
    return this.rolRepository.taasociado(id).create(usuarioadmin);
  }

  @patch('/rols/{id}/usuarioadmins', {
    responses: {
      '200': {
        description: 'Rol.Usuarioadmin PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarioadmin, {partial: true}),
        },
      },
    })
    usuarioadmin: Partial<Usuarioadmin>,
    @param.query.object('where', getWhereSchemaFor(Usuarioadmin)) where?: Where<Usuarioadmin>,
  ): Promise<Count> {
    return this.rolRepository.taasociado(id).patch(usuarioadmin, where);
  }

  @del('/rols/{id}/usuarioadmins', {
    responses: {
      '200': {
        description: 'Rol.Usuarioadmin DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarioadmin)) where?: Where<Usuarioadmin>,
  ): Promise<Count> {
    return this.rolRepository.taasociado(id).delete(where);
  }
}
