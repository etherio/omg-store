import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Products from "@/views/Products";
import OutOfStocks from "@/views/OutOfStocks";
import SearchProducts from "@/views/SearchProducts";

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
  {
    path: "/search",
    name: "SearchProducts",
    component: SearchProducts,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
