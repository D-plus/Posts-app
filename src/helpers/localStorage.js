export const LOGGED_IN_USER = 'loggedInUser';

export const helpers = {
  usersToken() {
    return JSON.parse(localStorage.getItem(LOGGED_IN_USER)) && JSON.parse(localStorage.getItem(LOGGED_IN_USER)).token;
  }
};
