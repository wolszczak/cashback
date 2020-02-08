import { RevendedorController } from "./revendedor.controller";
import { RevendedorService } from "./revendedor.service";
import { Test } from "@nestjs/testing";
import * as request from "supertest"
import axios from "axios"
import supertest = require("supertest");

describe('RevendedorController', () => {
    let revendedorController: RevendedorController;
    let revendedorService: RevendedorService;
    const app = 'http://localhost:3000'

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RevendedorController],
            providers: [RevendedorService],
        }).compile();

        revendedorService = moduleRef.get<RevendedorService>(RevendedorService);
        revendedorController = moduleRef.get<RevendedorController>(RevendedorController);
    });

    describe('REVENDEDOR', () => {
        it('deve cadastrar um novo revendedor', async () => {
            return request(app)
            .post('/cadastrarRevendedor')
            .expect(200)
        });

    });
});