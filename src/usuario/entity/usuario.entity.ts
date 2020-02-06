import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Role } from "src/role/entity/role.entity";

@Entity()
export class Usuario extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({length : 255})
    nome: string

    @Column({unique:true})
    cpf: string

    @Column({length : 255})
    email: string

    @Column()
    password: string

    @Column()
    status: boolean

    // @OneToMany(type => Role, role => role.role)
    // @Column()
    // roles: Role[]

}