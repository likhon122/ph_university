import { Model } from 'mongoose';
import { User_Roles } from './user.constant';

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: string;
  role: string;
  status: string;
  isDeleted: boolean;
  passwordChangeAt: Date;
  passwordChangeIp: string;
};

export interface TCreateUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  passwordChangeAt?: Date | null;
  passwordChangeIp?: string | null;
}

export interface UserModelType extends Model<TCreateUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  hashPassword(password: string): Promise<string>;
  isJwtIssuedBeforePasswordChange(
    passwordChangedAt: Date,
    jwtIssuedAt: number,
  ): boolean;
}

export type TUserRoles = keyof typeof User_Roles;
