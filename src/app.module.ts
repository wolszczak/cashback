import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from './role/role.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [ TypeOrmModule.forRoot(),RoleModule,UsuarioModule]
})

export class AppModule {}
