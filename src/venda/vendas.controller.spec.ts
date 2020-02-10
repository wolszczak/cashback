import * as request from 'supertest'
import { RevendedorController } from "../revendedor/revendedor.controller";
import { Revendedor } from "../revendedor/entity/revendedor.entity";
import { RevendedorService } from "../revendedor/revendedor.service";
import { VendaDto } from './dto/venda.dto';
import { HttpStatus } from '@nestjs/common';
import { createConnections, getConnection } from 'typeorm';


const app = "http://localhost:3000"

describe('test2', () => {


    beforeAll(async () => {
        await createConnections()
        await getConnection('test')
        const vendaDto: VendaDto = new VendaDto
        let codigo = Math.floor(Math.random() * 6) + 1
        let valor = Math.floor(Math.random() * 10) + 1
        vendaDto.codigo = codigo.toString()
        vendaDto.valor = valor
        vendaDto.data = new Date("2020-02-10T03:10:10")
        vendaDto.cpf = '15350946056'
    });

    it('deve cadastrar uma nova venda', () => {
        return request(app)
            .post("/venda/createVenda")
            .send(this.vendaDto)
            .expect(201)

    })

    it('deve buscar todas as vendas', () => {
        return request(app)
            .get("/venda/listAllVendas")
            .expect(200)

    })

});