import { Module } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { SaldoController } from './saldo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saldo } from './entities/saldo.entity';
import { Cuenta } from 'src/cuenta/entities/cuenta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Saldo, Cuenta])],
  controllers: [SaldoController],
  providers: [SaldoService],
})
export class SaldoModule {}
