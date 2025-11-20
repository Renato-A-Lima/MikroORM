import { Migration } from '@mikro-orm/migrations';

export class Migration20251120195517 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "nome" varchar(255) not null, "email" varchar(255) not null, "senha" varchar(255) not null, "nivel_acesso" varchar(255) not null);`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);
  }

}
