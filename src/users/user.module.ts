import { Module } from '@nestjs/common';
import { userProviders } from './user.provider';
import { UserService } from './user.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
