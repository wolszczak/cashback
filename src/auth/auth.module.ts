import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { JwtConstant } from "./constant/jwt.constant";
import { RevendedorModule } from "../revendedor/revendedor.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
    imports: [
      RevendedorModule,
      JwtModule.register({
        secretOrPrivateKey: JwtConstant.token
    })
    ],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy]
  })
  export class AuthModule {}