import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Products from "@/views/Products.vue";
import OutOfStocks from "@/views/OutOfStocks.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/outofstocks",
    name: "OutOfStocks",
    component: OutOfStocks,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
