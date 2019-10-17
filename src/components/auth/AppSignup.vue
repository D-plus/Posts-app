<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
          >
        </div>
        <div class="input">
          <label for="age">Your Age</label>
          <input
            id="age"
            v-model.number="age"
            type="number"
            min="1"
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
        <div class="input">
          <label for="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
          >
        </div>
        <div class="input inline">
          <input
            id="terms"
            v-model="terms"
            type="checkbox"
          >
          <label for="terms">Accept Terms of Use</label>
        </div>
        <p
          v-if="error"
          class="error"
        >
          {{ error }}
        </p>
        <div class="submit">
          <button
            type="submit"
            :disabled="isSubmitDisabled"
          >
            Submit
          </button>
        </div>
        <div class="spinner-wrapper">
          <app-spinner v-if="checkingEmail" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { ObjectDebounce } from 'wasync';
  import ErrorMixin from '../../mixins/error';
  import AppSpinner from '../common/spinner/AppSpinner';
  import types from '../../store/types';
  export default {
    name: 'AppSignup',

    components: { 'app-spinner': AppSpinner },

    mixins: [ErrorMixin],

    data () {
      return {
        email: '',
        age: null,
        password: '',
        confirmPassword: '',
        terms: false,
        checkingEmail: false,
        emailAvailable: false,
      };
    },

    computed: {
      isSubmitDisabled() {
        return this.checkingEmail || !this.emailAvailable;
      },
    },

    watch: {
      email: new ObjectDebounce({ wait: 2000 }).func({
        validate(email) {
          return email;
        },
        prepare() {
          this.checkingEmail = true;
        },
        cleanup() {
          this.checkingEmail = false;
        },
        run(email) {
          return this.doTheSearch(email);
        },
        failure(error) {
          this.setError(error);
        },
      }),
    },

    methods: {
      ...mapActions('auth/', {
        signup: types.ACTION_SIGNUP,
        searchEmailExistence: types.ACTION_CHECK_EMAIL_EXISTENCE,
      }),

      checkPasswordsMatching(password, passwordConfirmation) {
        return password === passwordConfirmation;
      },

      onSubmit () {
        if (!this.emailAvailable) {
          return;
        }
        if (this.checkPasswordsMatching(this.password, this.confirmPassword)) {
          const formData = {
            email: this.email,
            age: this.age,
            password: this.password,
            confirmPassword: this.confirmPassword,
            terms: this.terms,
          };

          return this.signup(formData)
                  .catch(error => {
                    this.setError(error);
                  });
        }

        this.setError('Passwords must match!');
      },

      doTheSearch(email) {
        return this.searchEmailExistence(email)
          .then(emailExists => {
            if (emailExists) {
              this.setError('This email is already taken!');
              return this.emailAvailable = false;
            }

            return this.emailAvailable = true;
          });
      },
    },
  }
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 30px auto;
    border: 1px solid #eee;
    padding: 20px;
    box-shadow: 0 2px 3px #ccc;
    background: #eee;
  }

  .input {
    margin: 10px auto;
    /*width: 80%*/
  }

  .input label {
    display: block;
    color: #4e4e4e;
    margin-bottom: 6px;
  }

  .input.inline label {
    display: inline;
  }

  .input input {
    font: inherit;
    width: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }

  .input.inline input {
    width: auto;
  }

  .input input:focus {
    outline: none;
    border: 1px solid #9e9e9e;
    background-color: #eee;
  }

  .input select {
    border: 1px solid #ccc;
    font: inherit;
  }

  .hobbies button {
    border: 1px solid #9e9e9e;
    background: #9e9e9e;
    color: white;
    padding: 6px;
    font: inherit;
    cursor: pointer;
  }

  .hobbies button:hover,
  .hobbies button:active {
    background-color: blue;
  }

  .hobbies input {
    width: 90%;
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

  .spinner-wrapper {
    display: flex;
    justify-content: center;
  }

  .error {
    color: rosybrown;
  }
</style>