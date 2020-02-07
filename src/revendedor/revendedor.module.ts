import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Revendedor } from "./entity/revendedor.entity";
import { RevendedorController } from "./revendedor.controller";
import { RevendedorService } from "./revendedor.service";

@Module({
    imports: [TypeOrmModule.forFeature([ Revendedor ])],
    controllers:[RevendedorController],
    providers: [RevendedorService],
    exports: [RevendedorService]
  })
  export class RevendedorModule {}