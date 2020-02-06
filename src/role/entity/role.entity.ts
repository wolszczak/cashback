import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";
import { type } from "os";
import { Usuario } from "src/usuario/entity/usuario.entity";

@Entity()
export class Role{
    constructor(private roleEntity: Role){}

    // @ManyToOne(type=> Usuario, usuario => usuario.roles)
    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn({unique:true})
    role: string

}