import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Usuario } from "./entity/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioDto } from "./dto/user.dto";

@Injectable()
export class UsuarioService {    

	async getAllUsers(): Promise<Usuario[]> {
		return await Usuario.find();
	  }

	  async insert(userDetails: UsuarioDto): Promise<Usuario> {
		const novoUsuario: Usuario = Usuario.create();
		novoUsuario.nome = userDetails.nome;
		novoUsuario.cpf = userDetails.cpf;
		novoUsuario.email = userDetails.email;
		novoUsuario.password = userDetails.password;
		novoUsuario.status = userDetails.status;
		await Usuario.save(novoUsuario);
		return novoUsuario;
	  }

}
