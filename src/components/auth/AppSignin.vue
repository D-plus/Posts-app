<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
          >
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
          >
        </div>
        <p
          v-if="error"
          class="error"
        >
          {{ error }}
        </p>
        <div class="submit">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';
  import ErrorMixin from '../../mixins/error';
  import types from '../../store/types';

  export default {
    name: 'AppSignin',

    mixins: [ErrorMixin],
    data() {
      return {
        email: '',
        password: '',
      }
    },

    methods: {
      ...mapActions('auth/', {
        login: types.ACTION_LOGIN,
      }),
      onSubmit() {
        const formData = {
          email: this.email,
          password: this.password,
        };

        this.login(formData)
          .then(message => {
            if (message) {
              this.setError(message);
            }
          });
      }
    }
  }
</script>

<style scoped>
  .signin-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
  }

  .input {
    margin: 10px auto;
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #9e9e9e;
    background-color: #eee;
  }

  .submit button {
    border: 1px solid #9e9e9e;
    color: #9e9e9e;
    padding: 10px 20px;
    font: inherit;
    cursor: pointer;
  }

  .submit button:hover,
  .submit button:active {
    background-color: #9e9e9e;
    color: white;
  }

  .submit button[disabled],
  .submit button[disabled]:hover,
  .submit button[disabled]:active {
    border: 1px solid #ccc;
    background-color: transparent;
    color: #ccc;
    cursor: not-allowed;
  }

  .error {
    color: rosybrown;
  }
</style>