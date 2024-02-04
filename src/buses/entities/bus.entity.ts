import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'buses',
  timestamps: true,
})
export class Bus extends Model {
  @AllowNull(false)
  @Column({ type: DataType.STRING(15) })
  busNumber: string;
}
