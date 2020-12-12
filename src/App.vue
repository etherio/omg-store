<template>
  <main v-if="loaded">
    <div class="ui fixed inverted menu">
      <div class="ui container">
        <a href="#" class="header item">
          <img
            src="https://semantic-ui.com/examples/assets/images/logo.png"
            class="logo"
          />
          OMG Admin
        </a>
        <router-link to="/" class="item">Home</router-link>
        <router-link to="/product" class="item">Product</router-link>
      </div>
    </div>
    <div class="ui main container">
      <div v-if="loggedIn">
        <router-view :user="user"></router-view>
      </div>
      <div v-else class="ui login container">
        <LoginForm />
      </div>
    </div>
  </main>
</template>

<script>
import { auth } from "./firebase";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

const data = {
  user: null,
  loggedIn: false,
  loaded: false,
};

auth.onAuthStateChanged((user) => {
  data.user = user.toJSON();
  data.loggedIn = Boolean(user);
  data.loaded = true;
});

export default {
  data() {
    return data;
  },
  components: {
    LoginForm,
    Dashboard,
  },
};
</script>

<style>
body {
  background-color: #ffffff;
}
.ui.menu .item img.logo {
  margin-right: 1.5em;
}
.main.container {
  margin-top: 7em;
}
.login.container {
  padding-top: 2em;
}
.wireframe {
  margin-top: 2em;
}
.ui.footer.segment {
  margin: 5em 0em 0em;
  padding: 5em 0em;
}
.item {
  font-weight: normal !important;
}
.router-link-exact-active {
  font-weight: bold !important;
  color: #ffffff8f !important;
}
</style>
