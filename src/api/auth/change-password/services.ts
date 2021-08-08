/* eslint-disable @typescript-eslint/no-explicit-any */

import validator from 'validator';
import _ from 'lodash';

import changePasswordRepository from './repositories';

import type { ChangePasswordType } from './types';

const changePasswordService = async (
  payload: ChangePasswordType
): Promise<string> => {
  const { email, password, confirmPassword } = payload;

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

  if (validator.isEmpty(confirmPassword)) {
    throw new Error('The confirm password field is blank.');
  }

  if (!validator.isLength(confirmPassword, { min: 8 })) {
    throw new Error('The confirm password field has at least 8 characters.');
  }

  if (!validator.equals(password, confirmPassword)) {
    throw new Error('The password field not match.');
  }

  const user = await changePasswordRepository.findUser(payload);

  if (_.isEmpty(user)) {
    throw new Error('The email not exist.');
  }

  await changePasswordRepository.changePassword(payload);

  return 'The password changed.';
};

export default changePasswordService;
