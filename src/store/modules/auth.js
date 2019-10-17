import router from '../../router/router';
import axios from '../../axios-instance';
import { LOGGED_IN_USER } from '../../helpers/localStorage';
import types from '../types';
import { Notification } from 'element-ui';

const initialState = {
  user: {
    id: null,
    token: '',
    email: '',
    password: '',
  },
};

export default {
  namespaced: true,

  state: {
    user: { ...initialState.user },
  },

  mutations: {
    [types.MUTATION_AUTH_USER](state, userData) {
      state.user = userData;
    },

    [types.MUTATION_CLEAN_AUTH_DATA](state) {
      state.user = { ...initialState.user };
    },
  },

  actions: {
    [types.ACTION_DISPLAY_ERROR](message = 'Something went wrong') {
      Notification({ title: 'Oops', message, type: 'error' });
    },

    // eslint-disable-next-line no-empty-pattern
    async [types.ACTION_CHECK_EMAIL_EXISTENCE]({ dispatch }, email) {
      return axios.get(`/users?email=${email}`)
        .then(({ data }) => {
          return !!data.length;
        })
        .catch(() => {
          dispatch(types.ACTION_DISPLAY_ERROR);
        });
    },

    [types.ACTION_SAVE_USER_LOCALLY]({ commit }, user) {
      localStorage.setItem(LOGGED_IN_USER, JSON.stringify({ id: user.id, token: user.token }));

      commit(types.MUTATION_AUTH_USER, user);
    },

    async [types.ACTION_SIGNUP]({ dispatch }, { email, password }) {
      try {
        const token = Math.random().toString();
        const { data: user } = await axios.post('/users', { email, password, token });

        dispatch(types.ACTION_SAVE_USER_LOCALLY, user);

        router.replace({ name: 'posts' });
        Notification({ title: 'Welcome!', message: '', type: 'success' });
      } catch (e) {
        dispatch(types.ACTION_DISPLAY_ERROR);
      }
    },

    async [types.ACTION_LOGIN]({ dispatch }, { email, password }) {
      try {
        // check if user exists

        const { data } = await axios.get(`/users?email=${email}&password=${password}`);
        if (!data.length) {
          return 'Enter correct Email or Password!';
        }

        // update user's auth token

        const user = data[0];
        const token = Math.random().toString();
        const { data: updatedUser } = await axios.patch(`/users/${user.id}`, { ...user, token });

        // save user locally

        dispatch(types.ACTION_SAVE_USER_LOCALLY, updatedUser);

        router.replace({ name: 'posts' });
        Notification({ title: 'Hello!', message: 'Nice to see you!', type: 'success' });
      } catch (e) {
        dispatch(types.ACTION_DISPLAY_ERROR);
      }
    },

    async [types.ACTION_TRY_AUTO_LOGIN]({ getters, dispatch, commit }) {
      const user = getters[types.GETTER_USER];

      if (user && user.id && user.token) {
        // check for such user with specific token

        try {
          const { data: foundUser } = await axios.get(`/users?id=${user.id}&token=${user.token}`);

          if (foundUser.length) {
            return commit(types.MUTATION_AUTH_USER, {
              ...foundUser[0]
            });

          }
        } catch (e) {
          dispatch(types.ACTION_LOGOUT);
          dispatch(types.ACTION_DISPLAY_ERROR, 'No such users with provided authentication token');
        }
      } else {
        dispatch(types.ACTION_LOGOUT);
      }
    },

    [types.ACTION_LOGOUT]({ commit }) {
      commit(types.MUTATION_CLEAN_AUTH_DATA);
      localStorage.removeItem(LOGGED_IN_USER);
      router.push({ name: 'welcome' });
    },
  },

  getters: {
    [types.GETTER_USER]() {
      return JSON.parse(localStorage.getItem(LOGGED_IN_USER));
    },

    [types.GETTER_IS_USER_AUTHENTICATED](state) {
      return (state.user && state.user.token);
    },
  },
};