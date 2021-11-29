import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuarioadmin, UsuarioadminRelations, Rol} from '../models';
import {RolRepository} from './rol.repository';

export class UsuarioadminRepository extends DefaultCrudRepository<
  Usuarioadmin,
  typeof Usuarioadmin.prototype.id,
  UsuarioadminRelations
> {

  public readonly tiene: BelongsToAccessor<Rol, typeof Usuarioadmin.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuarioadmin, dataSource);
    this.tiene = this.createBelongsToAccessorFor('tiene', rolRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
