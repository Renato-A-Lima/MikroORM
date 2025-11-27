import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Equipamento } from './equipamento.entity';

@Entity({ tableName: 'associacao_viagens' })
export class AssociacaoViagens {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => Equipamento)
  equipamento!: Equipamento;
}