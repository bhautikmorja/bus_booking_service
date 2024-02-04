import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { User } from 'src/users/user.entity';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  async validate(id: number) {
    try {
      const user = await User.findByPk(id);

      if (user) return true;
      return false;
    } catch (e) {
      console.log('error', e.message);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist`;
  }
}
