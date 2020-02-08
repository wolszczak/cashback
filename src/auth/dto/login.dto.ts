import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsEmail({}, { message: 'E-mail inválido.' })
    @IsNotEmpty({ message: 'É necessário preencher o EMAIL.' })
    email: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'É necessário preencher a SENHA.' })
    password: string;
  }