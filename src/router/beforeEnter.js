import { helpers } from '../helpers/localStorage';

const beforeEnterGuards = {
  AuthorizedUserGuard(to, from, next) {
    if (helpers.usersToken()) {
      next();
    } else {
      next({ name: 'signin' });
    }
  },

  UnauthorizedUserGuard(to, from, next) {
    if (!helpers.usersToken()) {
      next();
    } else {
      next({ name: 'posts' });
    }
  }
};

export default beforeEnterGuards;