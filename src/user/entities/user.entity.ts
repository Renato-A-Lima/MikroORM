import { Entity, PrimaryKey, Property } from "@mikro-orm/core";


@Entity({tableName : 'usuarios'})
export class User {
    @PrimaryKey()
    id!:number;

    @Property()
    nome!:string;

    @Property()
    email!:string;

    @Property()
    nivel_acesso!:string;

}

