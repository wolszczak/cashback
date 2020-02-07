import { Controller, UseFilters, HttpCode, Post, UseGuards, Body, InternalServerErrorException, Put, Param, Delete, Get } from "@nestjs/common";
import { VendaService } from "./venda.service";
import { VendaDto } from "./dto/venda.dto";

// @ApiTags('Venda')
@Controller('venda')
// @UseFilters(HttpExceptionFilter)
export class VendaController {
  constructor(private vendaService: VendaService) {}

  // @ApiBearerAuth()
  @HttpCode(201)
  @Post('/createVenda')
//   @UseGuards(AuthGuard())
  async create(@Body() vendaDto: VendaDto) {
    try {
      return await this.vendaService.createVenda(vendaDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @HttpCode(200)
  @Delete('/deleteVenda/:id')
  async delete(@Param('id') id: number) {
    try {
      this.vendaService.deleteVenda(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // @ApiBearerAuth()
  @HttpCode(200)
  @Put('/updateVenda/:id')
  // @UseGuards(AuthGuard())
  async update(@Param('id') id: number, @Body() vendaDto: VendaDto) {
    try {
      await this.vendaService.updateVenda(id, vendaDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // @ApiBearerAuth()
  @Get('/listAllVendas')
  // @UseGuards(AuthGuard(), RolesGuard)
  async findAll() {
    return await this.vendaService.findAllForResponse();
  }

  @Get('/getCashbackFromApi/:cpf')
  async getCashbackAcumulado(@Param('cpf') cpf: string) {
    return await this.vendaService.getCashbackAcumulado(cpf);
  }

}