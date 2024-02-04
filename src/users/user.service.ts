import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import qs from 'qs';

import { User } from './user.entity';
import { AddUserDto } from './dtos/create_user_dto';
import axios from 'axios';
import {
  createToken,
  domainBackend,
  domainFrontend,
} from 'src/utils/auth_helper';

interface GoogleOauthToken {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  async create(addUserDto: AddUserDto) {
    try {
      const findUserByEmail = await this.userRepository.findOne({
        where: { email: addUserDto.email },
      });

      if (findUserByEmail) {
        return {
          status: 'failed',
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Email is already taken',
        };
      }

      const hashedPassword = this._hashPassword(addUserDto.password);

      const user = await this.userRepository.create({
        ...addUserDto,
        password: hashedPassword,
      });

      const token = await createToken(user.id);

      return { status: 'success', data: { user, token } };
    } catch (error) {
      console.log('user create failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong .. please try again later.',
      };
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        return {
          status: 'failed',
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Please Check your email and password',
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return {
          status: 'failed',
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid password',
        };
      }

      const token = await createToken(user.id);

      return { status: 'success', data: { user, token } };
    } catch (error) {
      console.log('user login failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong .. please try again later.',
      };
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.findAll();

      return { status: 'success', data: users };
    } catch (error) {
      console.log('users find all failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong .. please try again later.',
      };
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      if (!user) {
        return {
          status: 'failed',
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        };
      }

      return { status: 'success', data: user };
    } catch (error) {
      console.log('user find one failed due to: ', error.message);

      return {
        status: 'failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong .. please try again later.',
      };
    }
  }

  async handleGoogleOauth(code: string): Promise<{ redirectUrl: string }> {
    // Use the code to get the id and access tokens
    const { id_token, access_token } = await this.getGoogleOauthToken({ code });

    // Use the token to get the User
    const { email, family_name, given_name } = await this.getGoogleUser({
      id_token,
      access_token,
    });

    const user = {
      email,
      firstName: given_name,
      lastName: family_name,
      password: `${given_name} ${family_name}`,
      phoneNumber: '',
    };

    const response = await this.create(user);

    if (response.status === 'success') {
      const { data } = response;

      const token = createToken(data.user.id);

      const redirectUrl = `${domainFrontend}?token=${token}`;

      return { redirectUrl };
    } else {
      return { redirectUrl: `${domainFrontend}/login` };
    }
  }

  _hashPassword(password: string): string {
    try {
      console.log(password);
      const salt = bcrypt.genSaltSync(10);

      return bcrypt.hashSync(password, salt);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getGoogleOauthToken({ code }): Promise<GoogleOauthToken> {
    const rootURL = 'https://oauth2.googleapis.com/token';

    const options = {
      code,
      client_id:
        '129072526083-3q502r7cvrobcvp9t357qov8nl8dnlmn.apps.googleusercontent.com',
      client_secret: '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',
      redirect_uri: `${domainBackend}/api/users/sessions/oauth/google`,
      grant_type: 'authorization_code',
    };

    try {
      const { data } = await axios.post<GoogleOauthToken>(rootURL, options, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return data;
    } catch (err: any) {
      console.log('Failed to fetch Google OAuth Tokens');
      throw new Error(err);
    }
  }

  async getGoogleUser({ id_token, access_token }): Promise<GoogleUserResult> {
    try {
      const { data } = await axios.get<GoogleUserResult>(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${id_token}`,
          },
        },
      );

      return data;
    } catch (err: any) {
      console.log(err);
      throw Error(err);
    }
  }
}
