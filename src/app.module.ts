import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RevendedorModule } from './revendedor/revendedor.module';
import { VendaModule } from './venda/venda.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot(), RevendedorModule, VendaModule, AuthModule, HttpModule],
})

export class AppModule { }
