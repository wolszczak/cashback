import { Controller, UseFilters, HttpCode, Post, UseGuards, Body, InternalServerErrorException, Put, Param, Delete, Get } from "@nestjs/common";
import { VendaService } from "./venda.service";
import { VendaDto } from "./dto/venda.dto";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/common/util/filter/http.filter";

@ApiTags('Venda')
@Controller('venda')
@UseFilters(HttpExceptionFilter)
export class VendaController {
  constructor(private vendaService: VendaService) {}

  @HttpCode(201)
  @Post('createVenda')
  async create(@Body() vendaDto: VendaDto) {
    try {
      console.log(vendaDto.data)
      return await this.vendaService.createVenda(vendaDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Delete('deleteVenda/:id')
  async delete(@Param('id') id: number) {
    try {
      this.vendaService.deleteVenda(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Put('updateVenda/:id')
  async update(@Param('id') id: number, @Body() vendaDto: VendaDto) {
    try {
      await this.vendaService.updateVenda(id, vendaDto);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  @Get('listAllVendas')
  async findAll() {
    return await this.vendaService.findAllForResponse();
  }

  @Get('/getCashbackFromApiExterna/:cpf')
  async getCashbackAcumulado(@Param('cpf') cpf: string) {
    return await this.vendaService.getCashbackAcumulado(cpf);
  }

}