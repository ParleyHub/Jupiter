/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../database/models';

import type { SignUpDataType } from './types';

const DB: any = db;
const { User } = DB;

const findUser = async (payload: SignUpDataType): Promise<any> => {
  const { email } = payload;

  const isEmailExist = await User.findOne({
    where: { email },
  });

  return isEmailExist;
};

const createUser = async (
  payload: Omit<SignUpDataType, 'confirmPassword'>
): Promise<any> => {
  const { email, name, password } = payload;

  const user = await User.create({
    email,
    name,
    password,
  });

  return user;
};

export default {
  findUser,
  createUser,
};
