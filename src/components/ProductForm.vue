<template>
  <div>
    <h2>Add Product</h2>
    <form class="ui form" @submit.prevent="submitProduct" :load="onload">
      <div class="required field">
        <label for="name">Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Product Name"
          autocomplete="off"
          required
        />
      </div>
      <div class="three fields">
        <div class="required field">
          <label for="price">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Product Price"
            autocomplete="off"
            required
          />
        </div>
        <div class="field">
          <label for="category">Catagory</label>
          <select name="category" id="category" class="ui search dropdown">
            <option value="" disabled selected>Select Category</option>
            <option
              v-for="category in categories"
              :value="category"
              :key="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
      </div>
      <button class="ui fluid button primary" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { products } from "@/firebase";

const createProduct = (completed, elements) => {
  let product = {
    name: null,
    category: null,
    description: null,
    price: null,
    stocks: null,
    createdAt: null,
    images: []
  };

  Object.keys(product).forEach((key) => {
    product[key] = elements[key].value;
  });

  products
    .doc()
    .set(product)
    .then(() => completed());
};

export default {
  name: "ProductForm",

  props: ["categories"],

  methods: {
    submitProduct(event) {
      let elements = event.target.elements;
      event.target.classList.add("loading");

      fetch(
        "https://ethereal-demo-link.netlify.app/.netlify/functions/timestamp"
      )
        .then((res) => res.text())
        .then((timestamp) => {
          elements.createdAt = {
            name: "createdAt",
            value: Number(timestamp),
          };
          elements.stocks = {
            name: "stocks",
            value: 0,
          };
          elements.images = {
            name: "images",
            value: [],
          };
          elements.description = {
            name: "description",
            value: null,
          };
          let complete = () => {
            event.target.classList.remove("loading");
            event.target.reset();
          };
          createProduct(complete, elements);
        });
    },
  },

  computed: {
    onload() {
      var script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js";
      script.addEventListener("load", () => $("#category").dropdown());
      document.body.appendChild(script);
    },
  },
};
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

label[for="price"]::after {
  content: "kyats" !important;
  color: #c2c2c2 !important;
  letter-spacing: 1px;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
}
</style>
