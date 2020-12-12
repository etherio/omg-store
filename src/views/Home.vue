<template>
  <div>
    <ProductForm :uid="user.uid" />
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
import ProductForm from "@/components/ProductForm.vue";

export default {
  name: "Home",
  props: ["user"],
  components: {
    ContentLoader,
    ProductForm,
  },
};
</script>
