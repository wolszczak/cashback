import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, BeforeInsert } from "typeorm";
import { Venda } from "../../venda/entity/venda.entity";
import * as crypto from 'crypto';


@Entity()
export class Revendedor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    nome: string

    @Column({ unique: true })
    cpf: string

    @Column({ length: 255 })
    email: string

    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
    @Column()
    password: string

    @Column()
    status: boolean

    @OneToMany(type => Venda, venda => venda.revendedor)
    vendas: Venda[]
}