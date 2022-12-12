import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';

@ApiTags('compra')
@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.compraService.compraProducto(createCompraDto);
  }

  @Get()
  findAll() {
    return this.compraService.findAll();
  }
}
