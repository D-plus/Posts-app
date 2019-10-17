<template>
  <el-dialog
    :title="title"
    :visible="visible"
    :width="width"
    top="9vh"
    :modal-append-to-body="false"
    :append-to-body="true"
    @close="close"
  >
    <el-input
      v-model="postTitle"
      placeholder="Title"
    />
    <el-input
      v-model="postAuthor"
      placeholder="Author"
    />

    <el-button
      type="primary"
      @click="submit"
    >
      {{ submitButtonText }}
    </el-button>
  </el-dialog>
</template>

<script>
  import Visible from '../../../mixins/visible';

  export default {
    name: "AppEditPostModal",

    mixins: [
      Visible,
    ],

    props: {
      width: {
        type: String,
        default: '45%',
      },

      type: {
        type: String,
        default: 'add',
      },

      data: {
        type: Object,
        default: null,
      }
    },

    data() {
      return {
        postTitle: '',
        postAuthor: '',
      };
    },

    computed: {
      title() {
        return this.type === 'add' ? 'Add new Post' : 'Edit post';
      },

      submitButtonText() {
        return this.type === 'add' ? 'Create' : 'Edit';
      },
    },

    updated() {
      if (!this.postTitle && !this.postAuthor && this.data) {
        this.postTitle = this.data.title;
        this.postAuthor = this.data.author;
      }
    },

    methods: {
      submit() {
        this.$emit('onSubmit', {
          id: this.data && this.data.id,
          type: this.type,
          title: this.postTitle,
          author: this.postAuthor,
        });

        this.close();
      },

      close () {
        this.$emit('update:visible', false);
        this.emitClose();
        this.clearPostData();
      },

      clearPostData() {
        this.postTitle = '';
        this.postAuthor = '';
      }
    },
  };
</script>
