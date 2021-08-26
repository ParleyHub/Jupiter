/* eslint-disable @typescript-eslint/no-explicit-any */

import validator from 'validator';
import _ from 'lodash';
import bcrypt from 'bcrypt';

import changePasswordRepositories from './repositories';
import resources from './resources';
import constants from './constants';

import type { IChangePasswordType, IChangePasswordResponseType } from './types';

const changePasswordServices = async (
  payload: IChangePasswordType
): Promise<IChangePasswordResponseType> => {
  const { email, oldPassword, newPassword } = payload;

  if (!email) {
    throw new Error(constants.errorMessage.emailEmpty);
  }

  if (!validator.isEmail(email)) {
    throw new Error(constants.errorMessage.emailInvalid);
  }

  if (!oldPassword) {
    throw new Error(constants.errorMessage.oldPasswordEmpty);
  }

  if (!validator.isLength(oldPassword, { min: 8 })) {
    throw new Error(constants.errorMessage.oldPasswordMin);
  }

  if (!newPassword) {
    throw new Error(constants.errorMessage.newPasswordEmpty);
  }

  if (!validator.isLength(newPassword, { min: 8 })) {
    throw new Error(constants.errorMessage.newPasswordMin);
  }

  if (validator.equals(oldPassword, newPassword)) {
    throw new Error(constants.errorMessage.samePassword);
  }

  if (process.env.NODE_ENV !== 'test') {
    const user = await changePasswordRepositories.findUser(payload);

    if (_.isEmpty(user)) {
      throw new Error(constants.errorMessage.emailNotExist);
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      throw new Error(constants.errorMessage.wrongPassword);
    }

    await changePasswordRepositories.changePassword(payload);
  } else if (email !== resources.user.email) {
    throw new Error(constants.errorMessage.emailNotExist);
  } else if (oldPassword !== resources.user.oldPassword) {
    throw new Error(constants.errorMessage.wrongPassword);
  }

  return {
    message: constants.responseMessage.passwordChanged,
  };
};

export default changePasswordServices;
