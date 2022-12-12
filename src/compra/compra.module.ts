import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Cuenta } from 'src/cuenta/entities/cuenta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, Cuenta])],
  controllers: [CompraController],
  providers: [CompraService],
})
export class CompraModule {}
