export default {
  props: {
    visible: {
      type: Boolean,
      default () {
        return false;
      },
    },
  },

  methods: {
    close () {
      this.$emit('update:visible', false);
      this.emitClose();
    },

    emitClose () {
      this.$emit('close');
    },
  },
}
