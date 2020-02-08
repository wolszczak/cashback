import { Revendedor } from "../../revendedor/entity/revendedor.entity";
import { VendaUtil } from "../util/venda.util";

export class VendaResponse {
    private id: string

    private codigo: string;

    private valor: number;

    private data: Date;

    private status: string;

    private revendedor: Revendedor;

    private percentCashback: number;

    private valorCashback: number;

    constructor(id: string, codigo: string, valor: number, data: Date, status: string, revendedor: Revendedor) { 
        this.id = id
        this.codigo = codigo;
        this.valor = valor;
        this.data = data;
        this.status = VendaUtil.getStatus(status);
        this.revendedor = revendedor;
        this.percentCashback = VendaUtil.calcularPercentCashback(valor)
        this.valorCashback = VendaUtil.calcularValorCashback(valor)
    }
}