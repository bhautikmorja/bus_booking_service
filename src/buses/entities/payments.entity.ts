import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'payments',
  timestamps: true,
})
export class Payment extends Model {
  @AllowNull(false)
  @Column({ type: DataType.STRING })
  mode: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  paymentId: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  orderId: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  signature: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  amount: number;
}
