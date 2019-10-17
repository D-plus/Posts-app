<template>
  <header id="header">
    <div class="logo">
      <router-link
        exact
        :to="{ name: 'welcome' }"
      >
        Welcome!
      </router-link>
      <router-link :to="{ name: 'feed' }">
        Feed
      </router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!isAuthenticated">
          <router-link :to="{ name: 'signup' }">
            Sign Up
          </router-link>
        </li>
        <li v-if="!isAuthenticated">
          <router-link :to="{ name: 'signin' }">
            Sign In
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link :to="{ name: 'posts' }">
            Posts
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <button
            class="logout"
            @click="onLogout"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import types from '../../store/types';

  export default {
    name: 'TheHeader',

    computed: {
      ...mapGetters('auth', {
        isAuthenticated: types.GETTER_IS_USER_AUTHENTICATED,
      }),
    },

    methods: {
      ...mapActions('auth', {
        logout: types.ACTION_LOGOUT,
      }),

      onLogout() {
        this.logout();
      },
    },
  }
</script>

<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #9e9e9e;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active,
  div a.router-link-active {
    color: black;
  }

  .logout {
    background-color: transparent;
    border: none;
    font: inherit;
    color: white;
    cursor: pointer;
  }

  .logo a {
    margin-right: 20px;
  }

  .logo a:hover {
    color: black;
  }
</style>