import { Controller, Param, Get, Body, Post } from "@nestjs/common";
import { RevendedorService } from "./revendedor.service";
import { RevendedorDto } from "./dto/revendedor.dto";


@Controller('revendedor')
export class RevendedorController {
  constructor(private readonly revendedorService: RevendedorService) {}
  
  @Post('cadastrarRevendedor')
  async insert( @Body() user: RevendedorDto) {
    return this.revendedorService.createRevendedor(user);
  }


	@Get('buscarRevendedores')
  getAll() {
    return this.revendedorService.buscarRevendedores();
  }

}