import { Test } from "@nestjs/testing";
import * as request from "supertest"
import axios from "axios"
import { VendaController } from "./venda. controller";
import { VendaService } from "./venda.service";
import supertest = require("supertest");

describe('VendaController', () => {
    let vendaController: VendaController;
    let vendaService: VendaService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [VendaController],
            providers: [VendaService],
        }).compile();

        vendaService = moduleRef.get<VendaService>(VendaService);
        vendaController = moduleRef.get<VendaController>(VendaController);
    });

    describe('VENDA', () => {
        it('deve listar todas as vendas da base', async () => {

        });

    });
});