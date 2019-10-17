<template>
  <div id="welcome">
    <h1>Welcome!</h1>
    <div class="cta">
      <router-link :to="{ name: 'signup' }">
        Sign Up
      </router-link>
      <router-link :to="{ name: 'signin'}">
        Sign In
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  #welcome {
    width: 80%;
    margin: auto;
  }

  h1 {
    text-align: center;
  }

  p {
    text-align: center;
  }

  .cta {
    width: 300px;
    margin: auto;
    text-align: center;
  }

  .cta a {
    margin: 10px;
    text-decoration: none;
    display: inline-block;
    border: 1px solid #9e9e9e;
    border-radius: 3px;
    width: 100px;
    padding: 10px;
    box-sizing: border-box;
    color: #9e9e9e;
  }

  .cta a:hover,
  .cta a:active {
    background-color: #9e9e9e;
    color: white;
  }
</style>