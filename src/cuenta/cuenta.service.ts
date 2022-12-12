import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { Cuenta } from './entities/cuenta.entity';

@Injectable()
export class CuentaService {
  constructor(
    @InjectRepository(Cuenta) private cuentaRepository: Repository<Cuenta>,
  ) {}
  async create(createCuentaDto: CreateCuentaDto) {
    const cuenta = await this.cuentaRepository.findOne({
      where: {
        numcuenta: createCuentaDto.numcuenta,
      },
    });
    if (cuenta) {
      return new HttpException(
        'Cuenta ya esta registrada',
        HttpStatus.CONFLICT,
      );
    }
    const newCuenta = this.cuentaRepository.create(createCuentaDto);
    await this.cuentaRepository.save(newCuenta);
    return newCuenta;
  }

  async findAll() {
    const list = await this.cuentaRepository.find({
      relations: ['saldo', 'compra'],
    });
    return list;
  }

  async findOne(id: number) {
    const listById = await this.cuentaRepository.findOne({
      where: { id },
      relations: ['saldo', 'compra'],
    });
    if (!listById) {
      return new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
    }
    return listById;
  }

  async update(id: number, updateCuentaDto: UpdateCuentaDto) {
    const result = await this.cuentaRepository.update({ id }, updateCuentaDto);
    if (result.affected === 0) {
      return new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async remove(id: number) {
    const result = await this.cuentaRepository.delete({ id });
    if (result.affected === 0) {
      return new HttpException('Cuenta no encontrada', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
