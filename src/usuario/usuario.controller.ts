import { Controller, Param, Get, Body, Post } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioDto } from "./dto/user.dto";


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}
  
  @Post('cadastrarUsuario')
  async insertuser( @Body() user: UsuarioDto) {
    return this.userService.insert(user);
  }


	@Get('getAllUsers')
  getAll() {
    return this.userService.getAllUsers();
  }
  
}