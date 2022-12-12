import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from 'src/cuenta/entities/cuenta.entity';
import { Repository } from 'typeorm';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { Saldo } from './entities/saldo.entity';

@Injectable()
export class SaldoService {
  constructor(
    @InjectRepository(Saldo) private saldoRepository: Repository<Saldo>,
    @InjectRepository(Cuenta) private cuentaRepository: Repository<Cuenta>,
  ) {}
  async recarga(createSaldoDto: CreateSaldoDto) {
    const cuenta = await this.cuentaRepository.findOne({
      where: { id: createSaldoDto.cuentaId },
      relations: ['saldo'],
    });
    if (!cuenta) {
      return new HttpException('Cuenta no existe', HttpStatus.NOT_FOUND);
    }
    if (cuenta.estado === false) {
      return new HttpException('Cuenta no activa', HttpStatus.NOT_FOUND);
    }
    console.log(cuenta)
    
    const { saldo } = cuenta;    
    let recarga = this.saldoRepository.create(createSaldoDto);
    saldo.map((saldoCuenta) => {
      const saldoActual = saldoCuenta.saldo;
      const recargaSaldo = this.saldoRepository.create(createSaldoDto);
      const { recarga, cuentaId } = recargaSaldo;
      const newSaldo = recarga + saldoActual;
      console.log(newSaldo);
      const newObj = { cuentaId: cuentaId, recarga: recarga, saldo: newSaldo };
      console.log(newObj);
      return this.saldoRepository.save(newObj);
    });
    return this.saldoRepository.save(recarga);
  }

  findAll() {
    return this.saldoRepository.find();
  }
}
