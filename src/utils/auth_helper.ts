import { sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { User } from 'src/users/user.entity';
import dayjs from 'dayjs';
dotenv.config();

export function createToken(user: User): string {
  const token = sign({ user }, process.env.JWT_SECRET_KEY);
  return token;
}

export async function verifyToken(authorizationHeader: string): Promise<any> {
  const token = getToken(authorizationHeader);
  if (!token) return false;
  const decoded = await verify(token, process.env.JWT_SECRET_KEY);
  return decoded;
}

export function getToken(authorizationHeader: string) {
  if (!authorizationHeader.startsWith('Bearer ')) {
    return false;
  }
  return authorizationHeader.split(' ')[1];
}
export async function getUserFromToken(authorizationHeader: string) {
  return await verifyToken(authorizationHeader);
}

export const domainFrontend =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:5173'
    : process.env.NODE_ENV == 'staging'
    ? 'https://lokhandwalabusservice.online'
    : null;

export const domainBackend =
  process.env.NODE_ENV == 'development'
    ? 'http://localhost:3010'
    : process.env.NODE_ENV == 'staging'
    ? 'https://core-apis.lokhandwalabusservice.online'
    : null;
