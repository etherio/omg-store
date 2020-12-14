import Vue from "vue";
import router from "./router";
import { auth } from "./firebase";
import App from "./App.vue";

const data = {
  user: null,
  loggedIn: false,
  loaded: false,
};

auth.onAuthStateChanged((user) => {
  data.loggedIn = Boolean(user);
  if (data.loggedIn) {
    data.user = user.toJSON();
  } else {
    data.user = null;
  }
  data.loaded = true;
});

Vue.config.productionTip = false;

new Vue({
  router,
  data,
  render: (h) => h(App),
}).$mount("#app");
