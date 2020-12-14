<template>
  <main>
    <nav class="ui fixed inverted menu">
      <div class="ui container">
        <a href="#" class="header item">OMG</a>
        <router-link to="/" class="item">Home</router-link>
        <router-link to="/products" class="item">Products</router-link>
        <router-link to="/search" class="item">Search</router-link>
        <div class="right menu" v-if="$root.loggedIn">
          <img
            class="ui avatar image"
            v-if="$root.user.photoURL"
            :src="$root.user.photoURL"
          />
          <span>{{ $root.user.displayName }}</span>
          <a class="logout item bold" @click="signOut()">
            <i class="sign-out icon"></i>
          </a>
        </div>
      </div>
    </nav>
    <div class="ui main container" v-if="$root.loaded">
      <router-view v-if="$root.loggedIn"></router-view>
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
nav .ui.menu .item img.logo {
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
nav .item {
  font-weight: normal !important;
}
nav .router-link-exact-active {
  font-weight: bold !important;
  color: #ffffff8f !important;
}
nav .right.menu img {
  margin-top: 5px;
}
nav .right.menu span {
  padding: 10px 5px 0 10px;
  color: #ffffff;
  cursor: default;
  text-overflow: ellipsis;
  width: 110px;
  overflow: hidden;
  white-space: nowrap;
}
nav .logout i {
  padding-top: 2px;
}
</style>
