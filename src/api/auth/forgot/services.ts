/* eslint-disable @typescript-eslint/no-explicit-any */

import validator from 'validator';
import _ from 'lodash';

import forgotPasswordRepositories from './repositories';

import type { IForgotPasswordType, IForgotPasswordResponseType } from './types';

const forgotPasswordServices = async (
  payload: IForgotPasswordType
): Promise<IForgotPasswordResponseType> => {
  const { email } = payload;

  if (!email) {
    throw new Error('The email field is blank.');
  }

  if (!validator.isEmail(email)) {
    throw new Error('The email field is invalid.');
  }

  if (process.env.NODE_ENV !== 'test') {
    const user = await forgotPasswordRepositories.findUser(payload);

    if (_.isEmpty(user)) {
      throw new Error('The email not exist.');
    }
  }

  return {
    message: 'The email to reset password has been sent to your.',
  };
};

export default forgotPasswordServices;
