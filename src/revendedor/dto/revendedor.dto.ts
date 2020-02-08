import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RevendedorDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'É necessário preencher o NOME.' })
    nome: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'É necessário preencher o CPF.' })
    cpf: string;
  
    @ApiProperty()
    @IsString()
    @IsEmail({}, { message: 'E-MAIL inválido.' })
    @IsNotEmpty({ message: 'É necessário preencher o E-MAIL.' })
    email: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'É necessário preencher a SENHA.' })
    password: string;
  
    status: boolean;
  
  }