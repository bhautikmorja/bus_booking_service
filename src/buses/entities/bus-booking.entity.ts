import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { BusSchedules } from './bus-schedules.entity';
import { User } from 'src/users/user.entity';
import { Payment } from './payments.entity';

@Table({
  tableName: 'bus-bookings',
  timestamps: true,
})
export class BusBooking extends Model {
  @ForeignKey(() => BusSchedules)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  busScheduleId: number;

  @BelongsTo(() => BusSchedules)
  busSchedule: BusSchedules;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  totalSeatsBooked: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Payment)
  @AllowNull(true)
  @Column({ type: DataType.INTEGER })
  paymentId: number;

  @BelongsTo(() => Payment)
  payment: Payment;

  @AllowNull(true)
  @Column({ type: DataType.DATE })
  expireAt: Date;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  status: string;
}
