import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Bus } from './bus.entity';
import { BusBooking } from './bus-booking.entity';

@Table({
  tableName: 'bus-schedules',
  timestamps: true,
})
export class BusSchedules extends Model {
  @ForeignKey(() => Bus)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  busId: number;

  @BelongsTo(() => Bus)
  bus: Bus;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  totalSeats: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  ticketPrice: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  startDestination: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  endDestination: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  startTime: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING })
  endTime: string;

  @HasMany(() => BusBooking)
  busBooking: BusBooking[];
}
