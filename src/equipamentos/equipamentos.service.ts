import { EntityManager, SqlEntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateEquipamentoDto } from './dto/create-equipamento.dto';
import { UpdateEquipamentoDto } from './dto/update-equipamento.dto';
import { Equipamento } from './entities/equipamento.entity';

@Injectable()
export class EquipamentoService {
  constructor(
    @InjectRepository(Equipamento)
    private readonly equipamentoRepository: SqlEntityRepository<Equipamento>,
    private readonly em: EntityManager,
  ) {}

  async create(createEquipamentoDto: CreateEquipamentoDto) {
    const equipamento = this.equipamentoRepository.create(createEquipamentoDto);
    await this.em.persistAndFlush(equipamento);
    return equipamento;
  }

  findAll() {
    return this.equipamentoRepository.findAll({ populate: ['viagens'] });
  }

  findOne(id: string) {
    return this.equipamentoRepository.findOne({ id }, { populate: ['viagens'] });
  }

  async update(id: string, updateEquipamentoDto: UpdateEquipamentoDto) {
    await this.equipamentoRepository.nativeUpdate({ id }, updateEquipamentoDto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.equipamentoRepository.nativeDelete(id);
  }
}