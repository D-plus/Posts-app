<template>
  <div>
    <p v-if="user.email">
      Your email address: {{ user.email }}
    </p>
    <h1>Posts</h1>

    <div class="actions-wrapper">
      <el-button
        type="success"
        @click.stop="handleAddPost"
      >
        Create new post
      </el-button>
    </div>

    <app-posts-list :posts-list="postsList">
      <app-post
        :key="props.item.id"
        slot-scope="props"
        :data="props"
        @onDelete="handleDeletePost(props.item.id)"
        @onEdit="handleEditPost(props)"
      />
    </app-posts-list>

    <app-edit-post-modal
      :visible.sync="editPostModal.show"
      :type="editPostModal.type"
      :data.sync="editPostModal.data"
      @onSubmit="postModalSubmitted"
      @close="clearPostModalData"
    />
  </div>
</template>

<script>
  import axios from '../../axios-instance';
  import { mapGetters, mapState } from 'vuex';
  import AppPostsList from './posts-list/AppPostsList';
  import AppPost from './posts-list/post/AppPost';
  import AppEditPostModal from './modals/AppEditPostModal';
  import types from '../../store/types';
  import ErrorNotification from '../../mixins/error-notification';

  export default {
    name: 'AppPosts',

    components: {
      AppEditPostModal,
      AppPostsList,
      AppPost,
    },

    mixins: [ErrorNotification],

    data() {
      return {
        postsList: [],
        editPostModal: {
          show: false,
          type: 'add',
          data: null,
        }
      };
    },

    computed: {
      ...mapGetters('auth', {
        isAuthenticated: types.GETTER_IS_USER_AUTHENTICATED,
      }),

      ...mapState('auth', [
        'user',
      ]),
    },

    async mounted() {
      try {
        const { data } = await axios.get(`/posts?userId=${this.user.id}`);
        this.postsList = data;
      } catch (e) {
        this.showError();
      }
    },

    methods: {
      handleAddPost() {
        this.editPostModal.show = true;
        this.editPostModal.type = 'add';
      },

      handleEditPost({ item }) {
        this.editPostModal = {
          ...this.editPostModal,
          show: true,
          type: 'edit',
          data: item
        };
      },

      async handleDeletePost(id) {
        try {
          const response = await axios.delete(`/posts/${id}`);
          if (response.status === 200) {
            this.postsList.splice(this.postsList.findIndex(post => post.id === id), 1);
          }
        } catch (e) {
          this.showError();
        }
      },

      postModalSubmitted({ id, type, title, author }) {
        if (type === 'add') {
          return this.createPost(title, author, this.user.id);
        }

        this.editPost(id, title, author);
      },

      async createPost(title, author, userId) {
        try {
          const { data } = await axios.post('/posts', { title, author, userId });
          this.postsList = [...this.postsList, data];
        } catch (e) {
          this.showError();
        }
      },

      async editPost(id, title, author) {
        try {
          const { data } = await axios.patch(`/posts/${id}`, { title, author });
          const foundPost = this.postsList.find(post => post.id === id);

          if (foundPost) {
            foundPost.title = data.title;
            foundPost.author = data.author;
            return;
          }
          this.showError(`There is no such post with id ${id}`);
        } catch (e) {
          this.showError();
        }
      },

      clearPostModalData() {
        this.editPostModal.data = null;
      },
    },
  }
</script>

<style scoped>
  .actions-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-right: 150px;
  }
  h1, p {
    text-align: center;
  }

  p {
    color: blue;
  }
</style>