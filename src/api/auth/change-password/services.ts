/* eslint-disable @typescript-eslint/no-explicit-any */

import validator from 'validator';
import _ from 'lodash';
import bcrypt from 'bcrypt';

import changePasswordRepositories from './repositories';

import type { ChangePasswordType } from './types';

const changePasswordServices = async (
  payload: ChangePasswordType
): Promise<string> => {
  const { email, oldPassword, newPassword } = payload;

  if (!email) {
    throw new Error('The email field is blank.');
  }

  if (!validator.isEmail(email)) {
    throw new Error('The email field is invalid.');
  }

  if (!oldPassword) {
    throw new Error('The old password field is blank.');
  }

  if (!validator.isLength(oldPassword, { min: 8 })) {
    throw new Error('The old password field has at least 8 characters.');
  }

  if (!newPassword) {
    throw new Error('The confirm password field is blank.');
  }

  if (!validator.isLength(newPassword, { min: 8 })) {
    throw new Error('The confirm password field has at least 8 characters.');
  }

  if (validator.equals(oldPassword, newPassword)) {
    throw new Error('Please do not using new password same old password.');
  }

  const user = await changePasswordRepositories.findUser(payload);

  if (_.isEmpty(user)) {
    throw new Error('The email not exist.');
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordMatch) {
    throw new Error('The old password incorrect.');
  }

  await changePasswordRepositories.changePassword(payload);

  return 'The password changed.';
};

export default changePasswordServices;
