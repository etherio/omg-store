<template>
  <div class="item">
    <div class="image" v-if="photoURL">
      <img :src="photoURL" alt="product" />
    </div>
    <div class="content">
      <a class="header">{{ name }}</a>
      <div class="meta">
        <span class="price">{{ price.toLocaleString() }}</span>
      </div>
      <div class="description">
        <p v-if="stocks">Stock: {{ stocks }}</p>
        <small>Created at {{ new Date(createdAt).toLocaleString() }}</small>
        <p>{{ description }}</p>
      </div>
      <div class="ui label" v-if="minAge">from {{ minAge }} yrs.</div>
      <div class="ui label" v-if="maxAge">to {{ maxAge }} yrs.</div>
      <div class="ui blue label" v-if="category">{{ category }}</div>
      <div class="ui label" :class="color.toLowerCase()" v-if="color">
        {{ color }}
      </div>
      <div class="ui label" v-if="size">{{ size }}</div>
    </div>
    <div class="extra">
      <slot></slot>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: [
    "name",
    "photoURL",
    "price",
    "description",
    "stocks",
    "createdAt",
    "category",
    "size",
    "color",
    "minAge",
    "maxAge",
  ],
};
</script>

<style>
.price::before {
  content: "MMK";
  padding-right: 4px;
}

.description {
  padding-bottom: 10px;
}

.content {
  min-width: fit-content !important;
}
</style>
