import { Controller, Param, Get, Body, Post, UseFilters } from "@nestjs/common";
import { RevendedorService } from "./revendedor.service";
import { RevendedorDto } from "./dto/revendedor.dto";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "../common/util/filter/http.filter";

@ApiTags('Revendedor')
@UseFilters(HttpExceptionFilter)
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