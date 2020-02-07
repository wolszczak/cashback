import { Module, HttpModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VendaController } from "./venda. controller";
import { VendaService } from "./venda.service";
import { Venda } from "./entity/venda.entity";
import { RevendedorModule } from "src/revendedor/revendedor.module";

@Module({
    imports: [TypeOrmModule.forFeature([ Venda ]),
    HttpModule,RevendedorModule],
    controllers:[VendaController],
    providers: [VendaService],
    exports: [VendaService]
  })
  export class VendaModule {}