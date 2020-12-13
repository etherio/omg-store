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
  if ((data.loggedIn = Boolean(user))) {
    data.user = user.toJSON();
  }
  data.loaded = true;
});

Vue.config.productionTip = false;

new Vue({
  router,
  data,
  render: (h) => h(App),
}).$mount("#app");
