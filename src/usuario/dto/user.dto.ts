import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UsuarioDto {
    // @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'É necessário preencher o NOME!' })
    nome: string;
  
    // @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'É necessário preencher o CPF!' })
    cpf: string;
  
    // @ApiProperty()
    @IsString()
    @IsEmail({}, { message: 'E-MAIL inválido!' })
    @IsNotEmpty({ message: 'É necessário preencher o E-MAIL!' })
    email: string;
  
    // @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: 'É necessário preencher a SENHA!' })
    password: string;
  
    status: boolean;
  
  }