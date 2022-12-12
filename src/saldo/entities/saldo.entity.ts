import { Cuenta } from 'src/cuenta/entities/cuenta.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'saldo' })
export class Saldo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  saldo: number;

  @Column({ nullable: true })
  recarga: number;

  @Column()
  cuentaId: number;

  //Ralacion de muchos a uno bidirecional entidad Cuenta
  @ManyToOne(() => Cuenta, (cuenta) => cuenta.saldo)
  cuenta: Cuenta;
}
