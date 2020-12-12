<template>
  <div>
    <h2>Add Product</h2>
    <form class="ui form" @submit.prevent="submitProduct" :load="onload">
      <!-- product name field -->
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
      <!-- product price field -->
      <div class="three fields">
        <div class="required field">
          <label for="price">Product Price</label>
          <div class="ui right labeled input">
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Kyats"
              autocomplete="off"
              required
            />
            <label for="price" class="ui label">MMK</label>
          </div>
        </div>
        <!-- product category field -->
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
      <!-- product images upload file -->
      <div class="field">
        <label for="images">
          <div class="ui image placeholder segment">
            <div class="ui icon header">
              <i class="file image outline icon"></i> Upload an image
            </div>
          </div>
        </label>
        <input
          type="file"
          name="images"
          id="images"
          accept="image/png,image/jgp,image/jpeg"
          @change="previewImages($event)"
          multiple
        />
      </div>
      <!-- form submit button -->
      <button class="ui fluid button primary" type="submit">Save</button>
    </form>
  </div>
</template>

<script>
import { database, products, storage } from "@/firebase";

const data = {
  files: [],
  categories: [],
  resetImage: () => null,
};

const createProduct = (uid, createdAt, elements, onComplete) => {
  let product = {
    uid,
    name: elements.name.value,
    category: elements.category.value,
    description: "", // elements.description.value,
    price: Number(elements.price.value),
    stocks: 0,
    createdAt: createdAt.getTime(),
    minAge: 0,
    maxAge: 0,
    images: [],
  };

  let saveToFirebase = (product) =>
    products
      .doc()
      .set(product)
      .then(() => onComplete());

  if (elements.images.files) {
    let loaded = 0;
    elements.images.files.forEach((file) => {
      let ext;
      switch (file.type) {
        case "image/jpg":
        case "image/jpeg":
          ext = "jpg";
          break;
        case "image/png":
          ext = "png";
          break;
        default:
          ext = file.name.split(".")[1];
      }
      let y = createdAt.getYear() - 100;
      let m = createdAt.getMonth() + 1;
      let path = `products/${y}/${m}/${product.createdAt}-${uid}.${ext}`;
      storage
        .child(path)
        .put(file)
        .then(() => {
          loaded++;
          product.images.push(path);
          if (elements.images.files.length === loaded) {
            return saveToFirebase(product);
          }
        });
    });
  } else {
    completed();
  }
};

database.get().then((ref) => (data.categories = ref.data().categories));

export default {
  name: "ProductForm",

  data() {
    return data;
  },

  methods: {
    previewImages(event) {
      let files = event.target.files;
      let el = event.target.parentElement.querySelector(".image");
      if (files.length === 0) {
        return this.resetImage();
      }
      let reader = new FileReader();
      let placeholder = el.innerHTML;
      this.resetImage = () => (el.innerHTML = placeholder);
      reader.onload = (event) =>
        (el.innerHTML = `<img class="ui small image bordered centered" src="${event.target.result}" />`);
      reader.readAsDataURL(files[0]);
    },

    submitProduct(event) {
      event.target.classList.add("loading");
      fetch(
        "https://ethereal-demo-link.netlify.app/.netlify/functions/timestamp"
      )
        .then((res) => res.text())
        .then((timestamp) => {
          let now = new Date();
          now.setTime(timestamp);

          createProduct(this.$attrs.uid, now, event.target.elements, () => {
            this.resetImage();
            event.target.classList.remove("loading");
            event.target.reset();
          });
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

input[type="file"] {
  height: 0;
  width: 0;
  visibility: hidden !important;
}

.ui.image.placeholder {
  cursor: pointer;
}
</style>
