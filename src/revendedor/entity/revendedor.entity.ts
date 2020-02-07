import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Venda } from "src/venda/entity/venda.entity";

@Entity()
export class Revendedor extends BaseEntity{

    @PrimaryGeneratedColumn()
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

    @OneToMany(type => Venda, venda => venda.revendedor)
    vendas : Venda[]
}