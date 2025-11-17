import { Migration } from '@mikro-orm/migrations';

export class Migration20251117141124 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "clientes_viagens" drop constraint "clientes_viagens_cliente_id_fkey";`);

    this.addSql(`alter table "viagens" drop constraint "viagens_cliente_id_fkey";`);

    this.addSql(`alter table "equipamentos_viagens" drop constraint "equipamentos_viagens_equipemanto_id_fkey";`);

    this.addSql(`alter table "viagens" drop constraint "viagens_usuario_id_fkey";`);

    this.addSql(`alter table "clientes_viagens" drop constraint "clientes_viagens_viagen_id_fkey";`);

    this.addSql(`alter table "equipamentos_viagens" drop constraint "equipamentos_viagens_viagem_id_fkey";`);

    this.addSql(`create table "users" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "nivel_acesso" varchar(255) not null);`);

    this.addSql(`drop table if exists "clientes" cascade;`);

    this.addSql(`drop table if exists "clientes_viagens" cascade;`);

    this.addSql(`drop table if exists "equipamentos" cascade;`);

    this.addSql(`drop table if exists "equipamentos_viagens" cascade;`);

    this.addSql(`drop table if exists "usuarios" cascade;`);

    this.addSql(`drop table if exists "veiculos" cascade;`);

    this.addSql(`drop table if exists "viagens" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "clientes" ("id" serial primary key, "nome" text not null, "rua" text not null, "bairro" text not null, "numero" text not null, "cep" text not null, "cidade" text not null, "data_criacao" timestamp(6) null default CURRENT_TIMESTAMP);`);

    this.addSql(`create table "clientes_viagens" ("id" serial primary key, "cliente_id" int4 null, "viagem_id" int4 null, "data_criacao" timestamp(6) null default CURRENT_TIMESTAMP);`);

    this.addSql(`create table "equipamentos" ("id" serial primary key, "nome" text not null, "data_criacao" timestamp(6) null default CURRENT_TIMESTAMP, "observacao" text null, "versao_sw" text null);`);

    this.addSql(`create table "equipamentos_viagens" ("id" serial primary key, "viagem_id" int4 null, "equipamento_id" int4 null);`);

    this.addSql(`create table "usuarios" ("id" serial primary key, "nome" text not null, "email" varchar(100) not null, "data_criacao" timestamp(6) null default CURRENT_TIMESTAMP, "nivel_acesso" text not null);`);
    this.addSql(`alter table "usuarios" add constraint "usuarios_email_key" unique ("email");`);

    this.addSql(`create table "veiculos" ("id" serial primary key, "nome" text not null, "data_criacao" timestamp(6) null default CURRENT_TIMESTAMP, "km_atual" text null, "km_prox_manutencao" text null, "km_ultima_manutencao" text null, "dia_rodizio" text null, "observacao" varchar(100) null);`);

    this.addSql(`create table "viagens" ("id" serial primary key, "usuario_id" int4 null, "acompanhante" text null, "cliente_id" int4 null, "veiculo" text not null, "data_inicio" timestamp(6) null default CURRENT_TIMESTAMP, "data_fim" timestamp(6) null default CURRENT_TIMESTAMP, "data_criacao" timestamp(6) null default CURRENT_TIMESTAMP, "odometro_inicio" int4 not null, "odometro_fim" int4 not null, "status" bool null default false, "observacoes" varchar(100) null);`);

    this.addSql(`alter table "clientes_viagens" add constraint "clientes_viagens_cliente_id_fkey" foreign key ("cliente_id") references "clientes" ("id") on update no action on delete no action;`);
    this.addSql(`alter table "clientes_viagens" add constraint "clientes_viagens_viagen_id_fkey" foreign key ("viagem_id") references "viagens" ("id") on update no action on delete no action;`);

    this.addSql(`alter table "equipamentos_viagens" add constraint "equipamentos_viagens_equipemanto_id_fkey" foreign key ("equipamento_id") references "equipamentos" ("id") on update no action on delete no action;`);
    this.addSql(`alter table "equipamentos_viagens" add constraint "equipamentos_viagens_viagem_id_fkey" foreign key ("viagem_id") references "viagens" ("id") on update no action on delete no action;`);

    this.addSql(`alter table "viagens" add constraint "viagens_cliente_id_fkey" foreign key ("cliente_id") references "clientes" ("id") on update no action on delete no action;`);
    this.addSql(`alter table "viagens" add constraint "viagens_usuario_id_fkey" foreign key ("usuario_id") references "usuarios" ("id") on update no action on delete no action;`);

    this.addSql(`drop table if exists "users" cascade;`);
  }

}
