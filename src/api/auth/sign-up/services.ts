import validator from 'validator';
import _ from 'lodash';

import signUpRepository from './repositories';
import auth from '../../../auth';

import type { SignUpDataType, SignUpResponseType } from './types';

const signUpService = async (
  payload: SignUpDataType
): Promise<SignUpResponseType> => {
  const { email, name, password, confirmPassword } = payload;

  if (!email) {
    throw new Error('The email field is blank.');
  }

  if (!validator.isEmail(email)) {
    throw new Error('The email field is invalid.');
  }

  if (!name) {
    throw new Error('The name field is blank.');
  }

  if (!validator.isLength(name, { min: 8 })) {
    throw new Error('The name field has at least 8 characters.');
  }

  if (!password) {
    throw new Error('The password field is blank.');
  }

  if (!validator.isLength(password, { min: 8 })) {
    throw new Error('The password field has at least 8 characters.');
  }

  if (!confirmPassword) {
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

  const accessToken: string = auth.signToken({ id: user.id });

  if (accessToken) {
    const isTokenSet = await signUpRepository.saveTokenToRedis({
      id: `access-token:${user.id}`,
      token: accessToken,
    });

    if (!isTokenSet || isTokenSet !== 'OK') {
      throw new Error('Error happened.');
    }
  }

  const refreshToken: string = auth.signRefreshToken({ id: user.id });

  if (refreshToken) {
    const isTokenSet = await signUpRepository.saveTokenToRedis({
      id: `refresh-token:${user.id}`,
      token: refreshToken,
    });

    if (!isTokenSet || isTokenSet !== 'OK') {
      throw new Error('Error happened.');
    }
  }

  return {
    'access-token': accessToken,
    'refresh-token': refreshToken,
  };
};

export default signUpService;
