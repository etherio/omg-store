<template>
  <div>
    <h1>Products</h1>
    <div class="ui three item menu">
      <a class="item" :href="$router.resolve({ name: 'Products' }).href"
        >In-Stock</a
      >
      <a
        class="item active"
        :href="$router.resolve({ name: 'OutOfStocks' }).href"
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
            <button
              class="ui red button"
              @click="deleteProduct($event, product.id)"
            >
              <i class="left edit icon"></i>
              Edit
            </button>
          </div>
        </ProductList>
      </div>
    </div>
    <div v-else>
      <div class="ui placeholder segment">
        <div class="ui icon header">
          <i class="inbox icon"></i>
          No products found.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import { products, storage } from "@/firebase";
import { ContentLoader } from "vue-content-loader";

const data = {
  products: [],
};

let productRefs = {};

const convertRef = (vm, dr) => {
  dr.forEach((r) => {
    let p = r.data();
    let im = p.images;
    productRefs[r.ref.id] = r.ref;
    productRefs[r.ref.id]["data"] = p;
    p.id = r.ref.id;
    p.photoURL = null;
    if (im.length > 0) {
      let img = storage.child(im[0]);
      img.getDownloadURL().then((url) => (p.photoURL = url));
    } else {
      p.photoURL = "/assets/image.png";
    }
    vm.products.push(p);
  });
};

export default {
  name: "OutOfStocks",
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
};

products
  .where("stocks", "=", 0)
  .get()
  .then((ref) => convertRef(data, ref));
</script>
