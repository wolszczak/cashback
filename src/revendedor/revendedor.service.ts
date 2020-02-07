import { Injectable, Inject } from "@nestjs/common";
import { Revendedor } from "./entity/revendedor.entity";
import { Util } from "src/common/util/util";
import { RevendedorDto } from "./dto/revendedor.dto";

@Injectable()
export class RevendedorService {    

	async buscarRevendedores(): Promise<Revendedor[]> {
		return await Revendedor.find();
	  }

	  async createRevendedor(details: RevendedorDto): Promise<Revendedor> {
		let novoRevendedor: Revendedor = Revendedor.create();
		novoRevendedor.nome = details.nome;
		novoRevendedor.cpf = Util.removeCpfMask(details.cpf)
		novoRevendedor.email = details.email;
		novoRevendedor.password = details.password;
		novoRevendedor.status = details.status;
		return await Revendedor.save(novoRevendedor);
	  }

	  async buscarRevendedorCpf(cpf): Promise<Revendedor> {
		return await Revendedor.findOne({ cpf: cpf });
	  }
	  

}
