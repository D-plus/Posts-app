export default {
  data() {
    return {
      error: '',
    };
  },
  methods: {
    setError(error) {
      this.error = error;

      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout);
      }

      this.errorTimeout = setTimeout(() => {
        this.error = null;
      }, 2000);
    },
  },
};