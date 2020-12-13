<template>
  <main>
    <div class="ui fixed inverted menu">
      <div class="ui container">
        <a href="#" class="header item">OMG</a>
        <router-link to="/" class="item">Home</router-link>
        <router-link to="/products" class="item">Products</router-link>
        <!-- <router-link to="/outofstocks" class="item">Out of stocks</router-link> -->
        <div class="right menu">
          <a v-if="$root.loggedIn" class="item bold" @click="signOut()">
            <i class="sign-out icon"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="ui main container" v-if="$root.loaded">
      <router-view v-if="$root.loggedIn" />
      <LoginForm v-else />
    </div>
    <div v-else class="main">
      <div class="ui active inverted dimmer">
        <div class="ui large loader"></div>
      </div>
    </div>
  </main>
</template>

<script>
import LoginForm from "./components/LoginForm";
import { auth } from "./firebase";

export default {
  components: {
    LoginForm,
  },

  methods: {
    signOut() {
      auth.signOut();
    },
  },
};
</script>

<style>
body {
  background-color: #ffffff;
}
.ui.menu .item img.logo {
  margin-right: 1.5rem;
}
.main.container {
  margin-top: 4rem;
}
.login.container {
  padding-top: 2rem;
}
.wireframe {
  margin-top: 2rem;
}
.ui.footer.segment {
  margin: 5rem 0rem 0rem;
  padding: 5rem 0rem;
}
.item {
  font-weight: normal !important;
}
.router-link-exact-active {
  font-weight: bold !important;
  color: #ffffff8f !important;
}
</style>
