import { Cuenta } from 'src/cuenta/entities/cuenta.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'compras' })
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productos: string;

  @Column()
  precio: number;

  @Column()
  cuentaId: number;

  //Relacion de muchos a uno bidirecional entidad Cuenta
  @ManyToOne(() => Cuenta, (cuenta) => cuenta.compra)
  cuenta: Cuenta;
}
