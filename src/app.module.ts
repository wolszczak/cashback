import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleModule } from './role/role.module';

@Module({
  imports: [ TypeOrmModule.forRoot(),RoleModule]
})

export class AppModule {}
