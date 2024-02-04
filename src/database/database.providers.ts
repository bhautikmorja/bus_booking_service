import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Bus, BusBooking, BusSchedules, Payment } from '../buses/entities';
import { User } from 'src/users/user.entity';

dotenv.config();

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        dialectOptions: {
          // useUTC: false, //for reading from database
          dateStrings: true,
          typeCast: true,
          // timezone: '-5:00',
        }, //for writing to database
        host: MYSQL_HOST,
        port: +MYSQL_PORT,
        username: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
      });
      sequelize.addModels([Bus, BusSchedules, BusBooking, Payment, User]);
      return sequelize;
    },
  },
];
