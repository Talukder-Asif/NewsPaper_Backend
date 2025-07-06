/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from '../../constants/userRoles';

export interface TUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMethods extends Model<TUser> {
  checkIsUserExistByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
