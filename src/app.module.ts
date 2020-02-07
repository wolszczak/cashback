import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RevendedorModule } from './revendedor/revendedor.module';
import { VendaModule } from './venda/venda.module';


@Module({
  imports: [ TypeOrmModule.forRoot(),RevendedorModule,VendaModule]
})

export class AppModule {}
