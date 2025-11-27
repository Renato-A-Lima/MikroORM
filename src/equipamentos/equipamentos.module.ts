import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EquipamentoService } from './equipamentos.service';
import { EquipamentoController } from './equipamentos.controller';
import { Equipamento } from './entities/equipamento.entity';
import { AssociacaoViagens } from './entities/associacao-viagens.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Equipamento, AssociacaoViagens])],
  controllers: [EquipamentoController],
  providers: [EquipamentoService],
})
export class EquipamentosModule {}