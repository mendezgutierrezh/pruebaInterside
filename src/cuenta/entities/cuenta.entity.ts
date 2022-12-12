import { Compra } from 'src/compra/entities/compra.entity';
import { Saldo } from 'src/saldo/entities/saldo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cuentas' })
export class Cuenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  numcuenta: string;

  @Column()
  nombre: string;

  @Column()
  estado: boolean;

  //Relacion uno a Muchos bidirecional con la Entidad de Saldo(recarga)
  @OneToMany(() => Saldo, (saldo) => saldo.cuenta)
  saldo: Saldo[];

  //Ralacion uno a Muchos con entidad Compra
  @OneToMany(() => Compra, (compra) => compra.cuenta)
  compra: Compra[];
}
