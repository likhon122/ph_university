import { Model } from 'mongoose';
import { User_Roles } from './user.constant';

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: string;
  role: string;
  status: string;
  isDeleted: boolean;
};

export interface TCreateUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModelType extends Model<TCreateUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
}

export type TUserRoles = keyof typeof User_Roles;
