import validator from 'validator';
import _ from 'lodash';
import bcrypt from 'bcrypt';

import signInRepository from './repositories';
import auth from '../../../auth';

import type { SignInDataType, SignInResponseType } from './types';

const signInService = async (
  payload: SignInDataType
): Promise<SignInResponseType> => {
  const { email, password } = payload;

  if (!email) {
    throw new Error('The email field is blank.');
  }

  if (!validator.isEmail(email)) {
    throw new Error('The email field is invalid.');
  }

  if (!password) {
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

  const accessToken: string = auth.signToken({ id: user.id });

  if (accessToken) {
    const isAccessTokenSet = await signInRepository.saveTokenToRedis({
      id: `access-token:${user.id}`,
      token: accessToken,
    });

    if (!isAccessTokenSet || isAccessTokenSet !== 'OK') {
      throw new Error('Error happened.');
    }
  }

  const refreshToken: string = auth.signRefreshToken({ id: user.id });

  if (refreshToken) {
    const isRefreshTokenSet = await signInRepository.saveTokenToRedis({
      id: `refresh-token:${user.id}`,
      token: refreshToken,
    });

    if (!isRefreshTokenSet || isRefreshTokenSet !== 'OK') {
      throw new Error('Error happened.');
    }
  }

  return {
    'access-token': accessToken,
    'refresh-token': refreshToken,
  };
};

export default signInService;
