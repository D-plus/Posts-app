import Vue from 'vue';
import VueRouter from 'vue-router';
import beforeEnter from './beforeEnter';

const TheWelcome = resolve => {
  // eslint-disable-next-line no-undef
  require.ensure(['../components/the-welcome/TheWelcome.vue'], () => {
    // eslint-disable-next-line no-undef
    resolve(require('../components/the-welcome/TheWelcome.vue'));
  });
};

const SignUp = resolve => {
  // eslint-disable-next-line no-undef
  require.ensure(['../components/auth/AppSignup.vue'], () => {
    // eslint-disable-next-line no-undef
    resolve(require('../components/auth/AppSignup.vue'));
  });
};

const Signin = resolve => {
  // eslint-disable-next-line no-undef
  require.ensure(['../components/auth/AppSignin.vue'], () => {
    // eslint-disable-next-line no-undef
    resolve(require('../components/auth/AppSignin.vue'));
  });
};

const Posts = resolve => {
  // eslint-disable-next-line no-undef
  require.ensure(['../components/posts/AppPosts.vue'], () => {
    // eslint-disable-next-line no-undef
    resolve(require('../components/posts/AppPosts.vue'));
  });
};

const TheFeed = resolve => {
  // eslint-disable-next-line no-undef
  require.ensure(['../components/the-feed/TheFeed.vue'], () => {
    // eslint-disable-next-line no-undef
    resolve(require('../components/the-feed/TheFeed.vue'));
  });
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: TheWelcome,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    beforeEnter: beforeEnter.UnauthorizedUserGuard
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin,
    beforeEnter: beforeEnter.UnauthorizedUserGuard
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts,
    beforeEnter: beforeEnter.AuthorizedUserGuard
  },
  {
    path: '/feed',
    name: 'feed',
    component: TheFeed,
  },
  { path: '*', redirect: { name: 'welcome' } },
];

export default new VueRouter({ mode: 'history', routes });