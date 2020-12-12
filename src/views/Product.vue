<template>
  <div>
    <h2>Product [In-stocks]</h2>
    <div
      class="ui divided items"
      :key="product.id"
      v-for="product in productInStocks"
    >
      <ProductList
        :name="product.name"
        :description="product.description"
        :price="product.price"
        :photoURL="product.photoURL"
        :stocks="product.stocks"
        :createdAt="product.createdAt"
        :category="product.category"
      >
        <div class="ui right floated">
          <button
            class="ui primary basic button"
            @click="addStock($event, product.id)"
          >
            <i class="left plus icon"></i>
            Add
          </button>
          <button
            class="ui primary basic button"
            @click="soldOut($event, product.id)"
          >
            <i class="left dolly icon"></i>
            Sold
          </button>
          <button class="ui primary button">
            <i class="left edit icon"></i>
            Edit
          </button>
        </div>
      </ProductList>
    </div>
    <br />
    <div v-if="productOutOfStocks.length">
      <h2>Product [Out of stocks]</h2>
      <div
        class="ui divided items"
        :key="product.id"
        v-for="product in productOutOfStocks"
      >
        <ProductList
          :name="product.name"
          :description="product.description"
          :price="product.price"
          :photoURL="product.photoURL"
          :stocks="product.stocks"
          :createdAt="product.createdAt"
          :category="product.category"
        >
          <button
            class="ui right floated red button"
            @click="deleteProduct($event, product.id)"
          >
            <i class="left trash alternate icon"></i> Delete
          </button>
        </ProductList>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import { products, storage } from "@/firebase";
import { ContentLoader } from "vue-content-loader";

const productRefs = {};

const data = {
  productInStocks: [],
  productOutOfStocks: [],
};

products
  .orderBy("createdAt", "desc")
  .get()
  .then((docRef) => {
    docRef.forEach((ref) => {
      let product = ref.data();
      let images = product.images;
      productRefs[ref.ref.id] = ref.ref;
      productRefs[ref.ref.id]["data"] = product;
      product.id = ref.ref.id;
      product.photoURL = null;
      if (images.length > 0) {
        let image = storage.child(images[0]);
        image.getDownloadURL().then((url) => (product.photoURL = url));
      } else {
        product.photoURL = "/assets/image.png";
      }
      if (product.stocks) {
        data.productInStocks.push(product);
      } else {
        data.productOutOfStocks.push(product);
      }
    });
  });

export default {
  name: "Product",
  props: ["users"],
  data() {
    return data;
  },
  components: {
    ContentLoader,
    ProductList,
  },
  methods: {
    addStock(event, id) {
      let el = event.target;
      if (el.classList.contains("icon")) {
        el = el.parentElement;
      }
      try {
        let ref = productRefs[id];
        if (!ref) {
          return;
        }
        el.classList.add("loading");
        el.setAttribute("disabled", true);
        ref.update({ stocks: ref.data.stocks + 1 }).then(() => {
          ref.data.stocks++;
          el.classList.remove("loading");
          el.removeAttribute("disabled");
        });
      } catch (e) {
        el.classList.remove("loading");
        el.removeAttribute("disabled");
      }
    },
    soldOut(event, id) {
      let el = event.target;
      if (el.classList.contains("icon")) {
        el = el.parentElement;
      }
      try {
        let ref = productRefs[id];
        if (!ref) {
          return;
        }
        el.classList.add("loading");
        el.setAttribute("disabled", true);
        ref.update({ stocks: ref.data.stocks - 1 }).then(() => {
          ref.data.stocks--;
          el.classList.remove("loading");
          el.removeAttribute("disabled");
        });
      } catch (e) {
        el.classList.remove("loading");
        el.removeAttribute("disabled");
        console.error(e);
      }
    },
    deleteProduct(event, id) {
      let el = event.target;
      if (el.classList.contains("icon")) {
        el = el.parentElement;
      }
      let p = el.parentElement.parentElement.parentElement;
      try {
        let ref = productRefs[id];
        if (!ref) {
          return;
        }
        el.classList.add("loading");
        el.setAttribute("disabled", true);
        productRefs[id].delete().then(() => {
          let i = this.productOutOfStocks.findIndex((p) => p.id == id);
          delete this.productOutOfStocks[i];
          p.remove();
        });
      } catch (e) {
        el.classList.remove("loading");
        el.removeAttribute("disabled");
        console.error(e);
      }
    },
  },
};
</script>
