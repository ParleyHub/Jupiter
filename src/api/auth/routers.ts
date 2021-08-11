import { Router } from 'express';

import signInController from './sign-in/controllers';
import signUpController from './sign-up/controllers';
import changePasswordController from './change-password/controllers';
import logoutController from './logout/controllers';

import auth from '../../auth';

const authRouters: Router = Router();

authRouters.route('/sign-in').post(signInController);
authRouters.route('/sign-up').post(signUpController);

authRouters
  .route('/change-password')
  .put(auth.verifyToken, changePasswordController);

authRouters.route('/logout').post(auth.verifyToken, logoutController);

export default authRouters;
