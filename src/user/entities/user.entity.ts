import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity({tableName : 'users'})
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    nome!: string;

    @Property({unique: true})
    email!: string;

    @Property({ hidden: true })
    senha!: string;

    @Property()
    nivel_acesso!:string;

}

