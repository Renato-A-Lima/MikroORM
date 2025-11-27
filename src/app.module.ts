// src/app.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../mikro-orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { EquipamentosModule } from './equipamentos/equipamentos.module';
import { ViagensModule } from './viagens/viagens.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),  // importa a configuração do banco
    UserModule, EquipamentosModule, ViagensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
