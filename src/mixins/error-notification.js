export default {
  methods: {
    showError(message = 'Something went wrong') {
      this.$notify({ title: 'Oops', message, type: 'error' });
    },
  },
};