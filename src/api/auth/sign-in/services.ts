/* eslint-disable @typescript-eslint/no-explicit-any */

import validator from 'validator';
import _ from 'lodash';
import bcrypt from 'bcrypt';

import signInRepository from './repositories';
import auth from '../../../auth';

import type { SignInDataType } from './types';

const signInService = async (payload: SignInDataType): Promise<string> => {
  const { email, password } = payload;

  if (validator.isEmpty(email)) {
    throw new Error('The email field is blank.');
  }

  if (!validator.isEmail(email)) {
    throw new Error('The email field is invalid.');
  }

  if (validator.isEmpty(password)) {
    throw new Error('The password field is blank.');
  }

  if (!validator.isLength(password, { min: 8 })) {
    throw new Error('The password field has at least 8 characters.');
  }

  const user = await signInRepository.findUser(payload);

  if (_.isEmpty(user)) {
    throw new Error('The email not exist.');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('The password incorrect.');
  }

  const token: string = auth.jwt.signToken(user.name);

  return token;
};

export default signInService;
