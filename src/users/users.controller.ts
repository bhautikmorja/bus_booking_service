import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Get,
  Req,
  Param,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserService } from './user.service';
import { AddUserDto } from './dtos/create_user_dto';
import { LoginUserDto } from './dtos/login.dtos';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUsers(@Res() res: Response) {
    const response = await this.userService.findAll();

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() addUserDto: LoginUserDto) {
    const response = await this.userService.login(addUserDto);

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: 'number' })
  async findAllById(@Res() res: Response, @Param() { id }) {
    const response = await this.userService.findOne(id);

    if (response.status === 'success') {
      return res.status(HttpStatus.OK).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Post()
  async create(@Res() res: Response, @Body() addUserDto: AddUserDto) {
    const response = await this.userService.create(addUserDto);

    if (response.status === 'success') {
      return res.status(HttpStatus.CREATED).json({ data: response.data });
    }

    return res.status(response.statusCode).json({ message: response.message });
  }

  @Get('/sessions/oauth/google')
  async googleOauth(@Req() req, @Res() res: Response) {
    try {
      // Check if the required query parameter exists
      const code = req.query.code as string;
      if (!code) {
        throw new Error('Authorization code not provided!');
      }

      const result = await this.userService.handleGoogleOauth(code);

      return res.redirect(result.redirectUrl);
    } catch (err) {
      console.log('Failed to authorize Google User', err);
      return res.json({
        status: 'failed',
        message: 'Failed to authorize Google User',
      });
    }
  }
}
