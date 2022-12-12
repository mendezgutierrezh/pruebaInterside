import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from 'src/cuenta/entities/cuenta.entity';
import { Repository } from 'typeorm';
import { CreateCompraDto } from './dto/create-compra.dto';
import { Compra } from './entities/compra.entity';

@Injectable()
export class CompraService {
  constructor(
    @InjectRepository(Compra) private compraRepository: Repository<Compra>,
    @InjectRepository(Cuenta) private cuentaRepository: Repository<Cuenta>,
  ) {}
  async compraProducto(createCompraDto: CreateCompraDto) {
    const cuenta = await this.cuentaRepository.findOne({
      where: { id: createCompraDto.cuentaId },
      relations: ['saldo'],
    });

    if (!cuenta) {
      return new HttpException('Cuenta no existe', HttpStatus.NOT_FOUND);
    }
    const { saldo, estado } = cuenta;
    if (estado === false) {
      return new HttpException('Cuenta no activa', HttpStatus.NOT_FOUND);
    }
    saldo.map((cuenta) => {
      const saldoCuenta = cuenta.saldo;
      if (saldoCuenta !== 0) {
        const producto = this.compraRepository.create(createCompraDto);
        if (saldoCuenta < producto.precio) {
          return 'sin saldo';
        }
        this.compraRepository.save(producto);
        return producto;
      }
      return new HttpException('Sin saldo', HttpStatus.NOT_FOUND);
    });
  }

  findAll() {
    return this.compraRepository.find();
  }
}
