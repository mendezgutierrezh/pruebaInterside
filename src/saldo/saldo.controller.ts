import { Controller, Get, Post, Body } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('saldo')
@Controller('saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @Post()
  create(@Body() createSaldoDto: CreateSaldoDto) {
    return this.saldoService.recarga(createSaldoDto);
  }

  @Get()
  findAll() {
    return this.saldoService.findAll();
  }
}
