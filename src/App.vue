<template>
  <div id="app">
    <the-header />
    <router-view />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import TheHeader from './components/the-header/TheHeader.vue';
  import types from './store/types';

  export default {
    name: 'App',

    components: {
      TheHeader,
    },

    created () {
      this.tryAutoLogin();
    },

    methods: {
      ...mapActions('auth/', {
        tryAutoLogin: types.ACTION_TRY_AUTO_LOGIN,
      }),
    },
  }
</script>

<style>
  body, html {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>