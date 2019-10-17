<template>
  <div class="post">
    <h3>Title: {{ data.item.title }}</h3>
    <p>Author: {{ data.item.author }}</p>
    <div
      v-if="actionButtons"
      class="post-actions"
    >
      <el-button
        type="warning"
        @click.stop="handleEdit"
      >
        Edit
      </el-button>
      <el-button
        type="danger"
        @click.stop="handleDelete"
      >
        Delete
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppPost',

    props: {
      data: {
        type: Object,
        default: null,
      },

      actionButtons: {
        type: Boolean,
        default: true,
      },
    },

    methods: {
      handleEdit() {
        this.$emit('onEdit');
      },

      handleDelete() {
        this.$emit('onDelete');
      },
    },
  }
</script>

<style scoped>
  .post {
    border: 1px solid #eee;
    min-width: 500px;
    padding: 20px;
    background: floralwhite;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .post:first-child {
    margin-top: 20px;
  }
</style>