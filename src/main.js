import Vue from "vue";
import router from "./router";
import App from "./App.vue";

const app = new Vue({
  el: "#app",
  router,
  data: {
    user: {},
  },
  render: (h) => h(App),
});
