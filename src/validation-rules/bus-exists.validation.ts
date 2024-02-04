import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Bus } from 'src/buses/entities';

@ValidatorConstraint({ name: 'BusExists', async: true })
@Injectable()
export class BusExistsRule implements ValidatorConstraintInterface {
  async validate(id: number) {
    try {
      const bus = await Bus.findByPk(id);

      if (bus) return true;
      return false;
    } catch (e) {
      console.log('error', e.message);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Bus doesn't exist`;
  }
}
