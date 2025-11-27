import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { AssociacaoViagens } from './associacao-viagens.entity';

@Entity({ tableName: 'equipamentos' })
export class Equipamento {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ autoincrement: true, fieldName: 'id_serial' })
  idSerial!: number;

  @Property({ unique: true })
  nome!: string;

  @Property()
  categoria!: string;

  @OneToMany(() => AssociacaoViagens, (assoc) => assoc.equipamento)
  viagens = new Collection<AssociacaoViagens>(this);
}