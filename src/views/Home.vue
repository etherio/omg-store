<template>
  <div>
    <product-form />
  </div>
</template>

<script>
import ProductForm from "@/components/ProductForm";
import ProductSearch from "@/components/ProductSearch";

export default {
  name: "Home",
  props: ["user"],
  components: {
    ProductForm,
    ProductSearch,
  },
};
</script>
