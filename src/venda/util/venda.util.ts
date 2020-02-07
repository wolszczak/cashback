import { StatusVenda } from "../enum/statusvenda.enum";

export class VendaUtil {
    static ApiUrl = 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf='

    static ApiToken = 'Bearer ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'

    static cpfMaster = "15350946056"


    static calcularValorCashback(valor) {
        let perc = this.calcularPercentCashback(valor);
        if (perc > 0) {
            return (valor * perc) / 100;
        } else {
            return 0;
        }
    }

    static calcularPercentCashback(valor) {
        if (valor > 0 && valor < 1000) {
            return 10;
        } else if (valor >= 1000 && valor < 1500) {
            return 15;
        } else if (valor >= 1500) {
            return 20;
        } else {
            return 0;
        }
    }

    static getStatus(statusVenda) {
        for (let status in StatusVenda) {
            if (StatusVenda[status] === statusVenda) {
                return StatusVenda[status]
            }
        }
        return ''
    }
}