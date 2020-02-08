import { JwtService } from "@nestjs/jwt";
import { RevendedorService } from "../revendedor/revendedor.service";
import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Revendedor } from "../revendedor/entity/revendedor.entity";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private revendedorService: RevendedorService,
        private jwtService: JwtService,
    ) { }


    async login(login: LoginDto) {
        let revendedorData = await this.revendedorService.findByEmail(login.email);
        if(!revendedorData) {
          throw new BadRequestException('Usuário inexistente.')
        }
        return new Promise((resolve, reject) => {
          this.revendedorService.checkPassword(revendedorData,login.password, (err, isMatch) => {
            if (err) {
                reject(new UnauthorizedException('Dado(s) de login incorreto(s).'));
            }else if (isMatch) {
              resolve(this.createJwtPayload(revendedorData));
            } else {
              reject(new UnauthorizedException('Dado(s) de login incorreto(s).'));
            }
          });
        });
      }

      createJwtPayload(revendedor: Revendedor) {
        const data = {
          email: revendedor.email,
        };
        let jwt = this.jwtService.sign(data,);
        return {
          expiresIn: 3600,
          accessToken: `Bearer ${jwt}`,
          revendedor: revendedor,
        };
      }


}