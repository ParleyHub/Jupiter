/* eslint-disable @typescript-eslint/no-explicit-any */

import { expect } from 'chai';

import constants from '../constants';
import services from '../services';

describe('Test for change password service', () => {
  it('Missing Email', async () => {
    try {
      const payload = {
        email: '',
        oldPassword: '',
        newPassword: '',
      };

      await services(payload);

      // expect(await services(payload)).to.be.a('object');
      // expect(await services(payload)).to.have.property('message');
    } catch (error: any) {
      if (error && error.message) {
        expect(error.message).to.be.equal(constants.errorMessage.emailEmpty);
      }
    }
  });

  it('Missing Email', async () => {
    try {
      const payload = {
        email: '',
        oldPassword: '',
        newPassword: '',
      };

      await services(payload);

      // expect(await services(payload)).to.be.a('object');
      // expect(await services(payload)).to.have.property('message');
    } catch (error: any) {
      if (error && error.message) {
        expect(error.message).to.be.equal(constants.errorMessage.emailEmpty);
      }
    }
  });
});
