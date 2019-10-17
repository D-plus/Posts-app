<template>
  <div>
    <div
      v-if="emptyState"
      class="no-posts"
    >
      No posts yet!
    </div>
    <app-posts-list :posts-list="postsList">
      <app-post
        :key="props.item.id"
        slot-scope="props"
        :data="props"
        :action-buttons="false"
      />
    </app-posts-list>
  </div>
</template>

<script>
  import axios from '../../axios-instance';
  import { mapState } from 'vuex';
  import AppPostsList from '../posts/posts-list/AppPostsList';
  import AppPost from '../posts/posts-list/post/AppPost';
  import ErrorNotification from '../../mixins/error-notification';

  export default {
    name: 'TheFeed',

    components: {
      AppPost,
      AppPostsList,
    },

    mixins: [ErrorNotification],

    data() {
      return {
        postsList: [],
        emptyState: false,
      };
    },

    computed: {
      ...mapState('auth', [
        'user',
      ]),
    },

    async mounted() {
      try {
        const { data } = await this.fetchPosts(this.user.id);

        if (!data.length) return this.emptyState = true;
        if (this.emptyState) this.emptyState = false;

        this.postsList = data;
      } catch (e) {
        this.showError();
      }
    },

    methods: {
      fetchPosts(userId) {
        return axios.get(`/posts?userId_ne=${userId}`);
      },
    },
  }
</script>

<style scoped>
  .no-posts {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>