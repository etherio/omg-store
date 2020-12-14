<template>
  <div :load="onLoad">
    <h1>Products</h1>
    <div class="ui three item menu">
      <a class="item active" :href="$router.resolve({ name: 'Products' }).href"
        >In-Stock</a
      >
      <a class="item" :href="$router.resolve({ name: 'OutOfStocks' }).href"
        >Out of stock</a
      >
      <span class="item"> </span>
    </div>
    <div v-if="products.length">
      <div
        v-for="product in products"
        class="ui divided items"
        :key="product.id"
      >
        <product-list
          :name="product.name"
          :description="product.description"
          :price="product.price"
          :photoURL="product.photoURL"
          :stocks="product.stocks"
          :createdAt="product.createdAt"
          :category="product.category"
          :color="product.color"
          :size="product.size"
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
          </div>
        </product-list>
        <hr />
      </div>
    </div>
    <div v-else>
      <div v-if="loading">
        <div class="ui fluid card">
          <div class="content">
            <div style="display: grid; grid-template-columns: 220px auto">
              <div
                class="ui fluid placeholder"
                style="width: 200px; height: 200px"
              >
                <div class="square image"></div>
              </div>
              <div class="content">
                <div class="ui placeholder">
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="ui placeholder segment">
        <div class="ui icon header">
          <i class="inbox icon"></i>
          No products are found.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import { products, storage } from "@/firebase";

let productRefs = {};

const convertData = (docRef) => {
  let product = docRef.data();
  let images = product.images;
  productRefs[docRef.ref.id] = docRef.ref;
  productRefs[docRef.ref.id]["data"] = product;
  product.id = docRef.ref.id;
  product.photoURL = null;
  if (images.length > 0) {
    let image = storage.child(images[0]);
    image.getDownloadURL().then((url) => (product.photoURL = url));
  } else {
    product.photoURL = "/assets/image.png";
  }
  return product;
};

const convertRef = (app, ref) => {
  let products = [];
  ref.forEach((docRef) => products.push(convertData(docRef)));
  products = products.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  app.products = products;
  app.loading = false;
};

export default {
  name: "Products",
  data() {
    return {
      products: [],
      loading: true,
    };
  },
  components: {
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
          let i = this.products.findIndex((p) => p.id == id);
          delete this.products[i];
          p.remove();
        });
      } catch (e) {
        el.classList.remove("loading");
        el.removeAttribute("disabled");
        console.error(e);
      }
    },
  },

  computed: {
    onLoad() {
      products
        .where("stocks", ">", 0)
        .get()
        .then((ref) => convertRef(this, ref));
    },
  },
};
</script>
