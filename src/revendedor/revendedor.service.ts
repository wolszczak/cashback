import { Injectable, Inject } from "@nestjs/common";
import { Revendedor } from "./entity/revendedor.entity";
import { Util } from "..//common/util/util/util";
import { RevendedorDto } from "./dto/revendedor.dto";
import * as bcrypt from 'bcrypt';

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


	async findByEmail(email) {
		return await Revendedor.findOne({ email: email, status: true });
	}

	async findById(id: number): Promise<Revendedor> {
		return await Revendedor.findOne({id: id	});
	}

	checkPassword = function(revendedor : Revendedor,attempt, callback) {
		bcrypt.compare(attempt, revendedor.password, (err, isMatch) => {
		  if (err) return callback(err);
		  callback(null, isMatch);
		});
	  };

}
