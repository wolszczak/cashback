import { RevendedorController } from "./revendedor.controller";
import { RevendedorService } from "./revendedor.service";
import { Test } from "@nestjs/testing";
import { RevendedorDto } from "./dto/revendedor.dto";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { getConnection, createConnections } from "typeorm";


describe('test1', () => {
    const revendedorController: RevendedorController = new RevendedorController(new RevendedorService());
    const revendedorDto: RevendedorDto = new RevendedorDto()
    revendedorDto.nome = "Admin"
    revendedorDto.cpf = "15350946056"
    revendedorDto.email = "email@gmail.com"
    revendedorDto.password = "senha123"
    revendedorDto.status = true

    beforeAll(async () => {
        await createConnections()
        await getConnection('test')
        const moduleRef = await Test.createTestingModule({
            controllers: [RevendedorController],
            providers: [RevendedorService],
        }).compile();
    });

    it('deve cadastrar um novo revendedor', async () => {
        await revendedorController.insert(revendedorDto)
        expect(HttpStatus.CREATED)
    });

    it('deve cadastrar um revendedor com o mesmos dados e dar erro', async () => {
        try {
            await revendedorController.insert(revendedorDto)
        } catch (err) {
            expect(err)
        }
    });


});