<template>
  <div class="item">
    <div class="image">
      <img :src="photoURL" alt="product" />
    </div>
    <div class="content">
      <a class="header">{{ name }}</a>
      <div class="meta">
        <span class="price">{{ price.toLocaleString() }}</span>
      </div>
      <div class="description">
        <p v-if="stock">Stock: {{ stock }}</p>
        <p>{{ description }}</p>
        <small>Created at {{ new Date(createdAt).toLocaleString() }}</small>
      </div>
    </div>
    <div class="extra">
      <div class="ui right floated primary button">
        Edit
        <i class="right chevron icon"></i>
      </div>
      <!-- <div class="ui label">Limited</div> -->
    </div>
  </div>
</template>


<script>
import { DATABASE_NAME } from "@/firebase";

// const storageRef = (`database/${DATABASE_NAME}/products`);

export default {
  name: "ProductList",
  props: ["name", "photoURL", "price", "description", "stock", "createdAt"],
};
</script>

<style>
.price::before {
  content: "MMK";
  padding-right: 4px;
}

@media only screen and (min-width: 768px) {
  .content {
    min-width: fit-content !important;
  }
}
</style>
