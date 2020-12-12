<template>
  <div>
    <div class="ui divided items" :key="product.id" v-for="product in products">
      <ProductList
        :name="product.name"
        :description="product.description"
        :price="product.price"
        :photoURL="product.photoURL"
        :stock="product.stocks"
        :createdAt="product.createdAt"
      />
      <hr />
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import { ContentLoader } from "vue-content-loader";

export default {
  name: "Product",
  props: ["products"],
  components: {
    ContentLoader,
    ProductList,
  },
};
</script>
