<template>
  <div>
    <ProductForm :categories="categories" />
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
import ProductForm from "@/components/ProductForm.vue";

export default {
  name: "Home",
  props: ["categories"],
  components: {
    ContentLoader,
    ProductForm,
  },
};
</script>
