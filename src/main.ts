/*   Garante que banco esteja sincronizado antes do servidor aceitar requisições*/


import { NestFactory } from '@nestjs/core'; // Cria instância do Nest
import { AppModule } from './app.module';   // Importa o módulo raiz
import { MikroORM } from '@mikro-orm/core'; // Importa a classe do MikroORM

async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);

  const mikroOrm = app.get(MikroORM);
  await mikroOrm.getMigrator().up();  // Chama o migrator para aplicar os migrations pendentes

  await app.listen(process.env.PORT ?? 3000); // Inicia o servidor HTTP
}
bootstrap();
