import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from "typeorm";

@Entity()
export class Role{
    constructor(private roleEntity: Role){}

    @PrimaryGeneratedColumn('uuid')
    id: number

    @PrimaryColumn({unique:true})
    role: string

}