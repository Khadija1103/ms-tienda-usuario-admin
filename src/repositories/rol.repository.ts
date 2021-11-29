import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Usuarioadmin} from '../models';
import {UsuarioadminRepository} from './usuarioadmin.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly taasociado: HasManyRepositoryFactory<Usuarioadmin, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioadminRepository') protected usuarioadminRepositoryGetter: Getter<UsuarioadminRepository>,
  ) {
    super(Rol, dataSource);
    this.taasociado = this.createHasManyRepositoryFactoryFor('taasociado', usuarioadminRepositoryGetter,);
    this.registerInclusionResolver('taasociado', this.taasociado.inclusionResolver);
  }
}
