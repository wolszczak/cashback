import { Injectable,  BadRequestException, NotFoundException, HttpService, NotAcceptableException } from "@nestjs/common";
import { VendaDto } from "./dto/venda.dto";
import { Revendedor } from "../revendedor/entity/revendedor.entity";
import { VendaUtil } from "./util/venda.util";
import { StatusVenda } from "./enum/statusvenda.enum";
import { Venda } from "./entity/venda.entity";
import { RevendedorService } from "src/revendedor/revendedor.service";
import { Util } from "../common/util/util/util";
import { VendaResponse } from "./response/venda.response";

@Injectable()
export class VendaService {
    constructor(
      private revendedorService: RevendedorService,
      private httpService: HttpService
    ) {}

    async createVenda(vendaDto: VendaDto) {
        if (await this.verificaCodigoVendaExistente(vendaDto.codigo)) {
          let revendedor = await this.verificaRevendedor(Util.removeCpfMask(vendaDto.cpf));
          let novaVenda: Venda = Venda.create();
          novaVenda.codigo = vendaDto.codigo
          novaVenda.valor = vendaDto.valor
          novaVenda.data = vendaDto.data
          novaVenda.revendedor = revendedor;
          if (revendedor.cpf === VendaUtil.cpfMaster) {
            novaVenda.status = StatusVenda.aprovado;
          } else {
            novaVenda.status = StatusVenda.validacao;
          }
          return await novaVenda.save();
        }
      }

      async verificaRevendedor(cpf): Promise<Revendedor> {
        let revendedor = await this.revendedorService.buscarRevendedorCpf(cpf);
        if (!revendedor) {
          throw new NotFoundException('REVENDEDOR não encontrado.');
        }
        return revendedor;
      }

      async verificaCodigoVendaExistente(codigo) {
        let venda = await this.findByCodigo(codigo);
        if (venda) {
          throw new BadRequestException(
            `Venda com o código ${codigo} já existe.`,
          );
        }
        return true;
      }

      async findByCodigo(codigo): Promise<Venda> {
        return await Venda.findOne({ codigo: codigo })
      }


      async deleteVenda(id: number) {
        if (await this.checkDeleteVenda(id)) {
          return await Venda.delete(id);
        }
      }

      async checkDeleteVenda(id) {
        let venda = await this.findVendaById(id);
        if (!venda) {
          throw new NotFoundException('ID de VENDA não encontrado.');
        } else if (venda.status === StatusVenda.aprovado) {
          throw new NotAcceptableException('Não é possível excluir a VENDA devido ao status "APROVADO".');
        }
        return true;
      }


      async updateVenda(id: number, vendaDto: VendaDto) {
        if (await this.buscarVenda(id)) {
          let revendedor = await this.checkRevendedor(vendaDto.cpf);
          let novaVenda: Venda = Venda.create();
          novaVenda.codigo = vendaDto.codigo
          novaVenda.valor = vendaDto.valor
          novaVenda.data = vendaDto.data
          novaVenda.revendedor = revendedor;
          if (revendedor.cpf === VendaUtil.cpfMaster) {
            novaVenda.status = StatusVenda.aprovado;
          } else {
            novaVenda.status = StatusVenda.validacao;
          }
          return await Venda.update(id,novaVenda)
        }
      }

      async buscarVenda(id) {
        let venda = await this.findVendaById(id);
        if (!venda) {
          throw new NotFoundException('ID de VENDA não encontrado.');
        } else if (this.checkStatusVenda(venda.status)) {
          throw new NotAcceptableException('STATUS da venda inválido.');
        } else if (venda.status !== StatusVenda.validacao) {
          throw new BadRequestException('Não é possível editar essa VENDA devido ao status "APROVADO".');
        }
        return true;
      }

      async findVendaById(id): Promise<Venda> {
        return await Venda.findOne({id:id})
      }

      checkStatusVenda(statusVenda) {
        for (let status in StatusVenda) {
          if (StatusVenda[status] == statusVenda) {
            return false;
          }
        }
        return true;
      }

      async checkRevendedor(cpf): Promise<Revendedor> {
        let revendedor = await this.revendedorService.buscarRevendedorCpf(cpf);
        if (!revendedor) {
          throw new NotFoundException('Nenhum REVENDEDOR encontrado com esse CPF.');
        }
        return revendedor;
      }

      async findAllForResponse() {
        let vendas = await this.getAllVendas();
        return this.modelToResponse(vendas);
      }

      async getAllVendas(): Promise<Venda[]> {
        return await Venda
          .find({relations : ["revendedor"]})          
      }

      modelToResponse(vendas) {
        return vendas.map(
          x =>
            new VendaResponse(x.id, x.codigo, x.valor, x.data, x.status, x.revendedor),
        );
      }

      async getCashbackAcumulado(cpf) {
        let header = { Authorization: VendaUtil.ApiToken };
        let response = await this.httpService
          .get(VendaUtil.ApiUrl + cpf, { headers: header })
          .toPromise();
        let valor = response.data.body.credit;
        return {
          codigo: Math.trunc(Math.random()),
          valor: valor,
          data: new Date(),
          status: 'Consulta API Boticario',
          cpf: cpf,
          percentCashback: VendaUtil.calcularPercentCashback(valor),
          valorCashback: VendaUtil.calcularValorCashback(valor),
        };
      }

}