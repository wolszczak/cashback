import { Revendedor } from "src/revendedor/entity/revendedor.entity";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VendaDto {
    // @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'É necessário fornecer o CODIGO.' })
    codigo: string;
  
    // @ApiProperty({ type: Number })
    @IsNumber()
    @IsNotEmpty({ message: 'É necessário fornecer o VALOR.' })
    valor: number;
  
    // @ApiProperty()
    @IsDateString({
      message:
        'É necessário fornecer a data com o formato "yyyy-MM-dd HH:mm:ss"',
    })
    @IsNotEmpty({ message: 'É necessário fornecer a DATA.' })
    data: Date;

    // @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'É necessário preencher o CPF.' })
    cpf: string;
  
}