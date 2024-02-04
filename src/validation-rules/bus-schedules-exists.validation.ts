import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { BusSchedules } from 'src/buses/entities';

@ValidatorConstraint({ name: 'BusSchedulesExists', async: true })
@Injectable()
export class BusSchedulesExistsRule implements ValidatorConstraintInterface {
  async validate(id: number) {
    try {
      const busSchedules = await BusSchedules.findByPk(id);

      if (busSchedules) return true;
      return false;
    } catch (e) {
      console.log('error', e.message);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `BusSchedules doesn't exist`;
  }
}
