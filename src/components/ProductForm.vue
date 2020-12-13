<template>
  <div>
    <h2>Add Product</h2>
    <form class="ui form" @submit.prevent="submitProduct">
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
          <div class="ui search" id="category">
            <div class="ui icon input">
              <i class="tag icon"></i>
              <input
                class="prompt"
                name="category"
                type="text"
                placeholder="Product Category"
              />
            </div>
            <div class="results"></div>
          </div>
        </div>
      </div>
      <!-- product age field -->
      <div class="three fields">
        <div class="field">
          <div class="ui left labeled input">
            <label for="minAge" class="ui label">min</label>
            <input
              type="tel"
              id="minAge"
              name="minAge"
              placeholder="Age Group"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="field">
          <div class="ui left labeled input">
            <label for="maxAge" class="ui label">max</label>
            <input
              type="tel"
              id="maxAge"
              name="maxAge"
              placeholder="Age Group"
              autocomplete="off"
            />
          </div>
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
  resetImage: () => null,
};

let categories = [];

const createProduct = (uid, createdAt, elements, onComplete) => {
  let product = {
    uid,
    name: elements.name.value,
    category: elements.category.value,
    description: "", // elements.description.value,
    price: Number(elements.price.value),
    stocks: 0,
    createdAt: createdAt.getTime(),
    minAge: Number(elements.minAge.value),
    maxAge: Number(elements.maxAge.value),
    images: [],
  };

  let saveToFirebase = (product) => {
    if (product.category && !categories.includes(product.category)) {
      categories.push(product.category);
      database.update({
        categories,
      });
      $("#category").search({
        source: categories.map((category) => {
          return { title: category };
        }),
      });
    }
    products
      .doc()
      .set(product)
      .then(() => onComplete());
  };

  if (elements.images.files.length) {
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
    saveToFirebase(product);
  }
};

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
};

database.get().then((ref) => {
  categories = ref.data().categories;
  $("#category").search({
    source: categories.map((category) => {
      return { title: category };
    }),
  });
});
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

form {
  margin-bottom: 20px;
}
</style>
