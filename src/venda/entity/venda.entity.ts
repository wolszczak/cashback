import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, Timestamp } from "typeorm";
import { Revendedor } from "../../revendedor/entity/revendedor.entity";

@Entity()
export class Venda extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({length : 255})
    codigo: string

    @Column()
    valor: number

    @Column()
    data: Date

    @ManyToOne(type => Revendedor, revendedor => revendedor.vendas)
    revendedor: Revendedor

    @Column()
    status: string

}