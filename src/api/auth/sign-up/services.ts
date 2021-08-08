import validator from 'validator';
import _ from 'lodash';

import signUpRepository from './repositories';
import auth from '../../../auth';

import type { SignUpDataType } from './types';

const signUpService = async (payload: SignUpDataType): Promise<string> => {
  const { email, name, password, confirmPassword } = payload;

  if (validator.isEmpty(email)) {
    throw new Error('The email field is blank.');
  }

  if (!validator.isEmail(email)) {
    throw new Error('The email field is invalid.');
  }

  if (validator.isEmpty(name)) {
    throw new Error('The name field is blank.');
  }

  if (!validator.isLength(name, { min: 8 })) {
    throw new Error('The name field has at least 8 characters.');
  }

  if (validator.isEmpty(password)) {
    throw new Error('The password field is blank.');
  }

  if (!validator.isLength(password, { min: 8 })) {
    throw new Error('The password field has at least 8 characters.');
  }

  if (validator.isEmpty(confirmPassword)) {
    throw new Error('The confirm password field is blank.');
  }

  if (!validator.isLength(confirmPassword, { min: 8 })) {
    throw new Error('The confirm password field has at least 8 characters.');
  }

  if (!validator.equals(password, confirmPassword)) {
    throw new Error('The password field not match.');
  }

  const isUserExist = await signUpRepository.findUser(payload);

  if (!_.isEmpty(isUserExist)) {
    throw new Error('The email already exist.');
  }

  const user = await signUpRepository.createUser(payload);

  if (!user.name) {
    throw new Error('Something happened.');
  }

  const token: string = auth.jwt.signToken(user.name);

  return token;
};

export default signUpService;
