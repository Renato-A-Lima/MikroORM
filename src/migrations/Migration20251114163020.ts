import { Migration } from '@mikro-orm/migrations';

export class Migration20251114163020 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "username" varchar(255) not null);`);

    this.addSql(`drop table if exists "user" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "username" varchar(255) not null);`);

    this.addSql(`drop table if exists "users" cascade;`);
  }

}
