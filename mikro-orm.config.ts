import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import * as path from 'path';

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,

  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'PostScan',
  dbName: 'postgres',

  // entidades em JS (build)
  entities: ['./dist/**/*.entity.js'],

  entitiesTs: ['./src/**/*.entity.ts'],

  // habilita migrations
  extensions: [Migrator],

  migrations: {
    path: path.resolve(__dirname, 'dist/migrations'),
    pathTs: path.resolve(__dirname, 'src/migrations'),
    // sem pattern aqui!
    // se quisesse customizar: glob: '*.{js,ts}'
  },
};

export default mikroOrmConfig;
