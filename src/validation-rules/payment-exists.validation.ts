import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Payment } from 'src/buses/entities';

@ValidatorConstraint({ name: 'PaymentExists', async: true })
@Injectable()
export class PaymentExistsRule implements ValidatorConstraintInterface {
  async validate(id: number) {
    try {
      const payment = await Payment.findByPk(id);

      if (payment) return true;
      return false;
    } catch (e) {
      console.log('error', e.message);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Payment doesn't exist`;
  }
}
