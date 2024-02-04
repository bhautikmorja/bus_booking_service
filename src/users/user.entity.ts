import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @AllowNull(false)
  @Column({ type: DataType.STRING(100) })
  firstName: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING(100) })
  lastName: string;

  @AllowNull(true)
  @Unique
  @Column({ type: DataType.STRING(100) })
  email: string;

  @AllowNull(false)
  @Unique
  @Column({ type: DataType.STRING(100) })
  password: string;

  @AllowNull(true)
  @Column({ type: DataType.STRING(12) })
  phoneNumber: string;
}
