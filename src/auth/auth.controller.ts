import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    let result = await this.authService.login(loginDto);
    return result;
  }

}