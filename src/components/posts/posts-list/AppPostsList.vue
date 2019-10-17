<template>
  <div class="posts-list">
    <slot
      v-for="post in postsList"
      :item="post"
    />
  </div>
</template>

<script>
  export default {
    name: 'AppPostsList',

    props: {
      postsList: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<style scoped>
  .posts-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>