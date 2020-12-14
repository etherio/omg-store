<template>
  <div :load="onLoad" class="product-create-form">
    <form class="ui form" @submit.prevent="submitProduct">
      <h2 class="ui dividing header">Add Product</h2>
      <div class="fields">
        <!-- product name field -->
        <div class="eleven wide required field">
          <label for="product_name">Product Name</label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            placeholder="Name (Required)"
            @keyup="generateProductCode($event)"
            required
          />
        </div>
        <!-- product code field -->
        <div class="five wide required field">
          <label for="product_code">Product Code</label>
          <input
            type="text"
            id="product_code"
            name="product_code"
            placeholder="Code (Required)"
            @keyup="convertProductCode($event)"
            required
          />
        </div>
      </div>
      <!-- product price field -->
      <div class="fields">
        <div class="five wide required field">
          <label for="price">Product Price</label>
          <div class="ui right labeled input field">
            <input
              type="tel"
              id="price"
              name="price"
              placeholder="Kyats (Required)"
              autocomplete="off"
              @keyup="convertProductPrice($event)"
              required
            />
            <label for="price" class="ui label">MMK</label>
          </div>
        </div>
        <!-- product category field -->
        <div class="six wide field">
          <label for="category">Catagory</label>
          <div class="ui search" id="category">
            <div class="ui icon input">
              <i class="tag icon"></i>
              <input
                class="prompt"
                name="category"
                type="text"
                autocomplete="off"
                placeholder="Not specified"
              />
            </div>
            <div class="results"></div>
          </div>
        </div>
        <!-- product category field -->
        <div class="five wide field">
          <label for="color">Color</label>
          <div class="ui search" id="color">
            <div class="ui icon input">
              <i class="paint brush icon"></i>
              <input
                class="prompt"
                name="color"
                type="text"
                placeholder="Not specified"
                autocomplete="off"
              />
            </div>
            <div class="results"></div>
          </div>
        </div>
      </div>
      <!-- product age field -->
      <div class="fields">
        <div class="four wide field">
          <!-- product age - min field -->
          <label for="age-group">From</label>
          <div class="ui left labeled input field">
            <label for="minAge" class="ui label">min</label>
            <input
              type="tel"
              id="minAge"
              name="minAge"
              placeholder="Age Group"
              autocomplete="off"
              @change="convertAgeGroup($event)"
            />
          </div>
        </div>
        <!-- product age - max field -->
        <div class="four wide field">
          <label for="age-group">To</label>
          <div class="ui left labeled input field">
            <label for="maxAge" class="ui label">max</label>
            <input
              type="tel"
              id="maxAge"
              name="maxAge"
              placeholder="Age Group"
              autocomplete="off"
              @change="convertAgeGroup($event)"
            />
          </div>
        </div>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="[Optional]"
          rows="4"
        ></textarea>
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
          accept="image/*"
          multiple
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

const meta = {
  categories: [],
  colors: [],
};

const data = {
  convertedManually: false,
  resetImage: () =>
    (document.querySelector(".image.placeholder.segment").innerHTML =
      '<div class="ui icon header"><i class="file image outline icon"></i> Upload an image </div>'),
};

function capitalize(word) {
  return `${word.substr(0, 1).toUpperCase()}${word.substr(1)}`;
}

const createProduct = ({ uid, createdAt, elements, onComplete }) => {
  let product = {
    category: capitalize(elements.category.value),
    code: elements.product_code.value,
    color: capitalize(elements.color.value),
    createdAt: createdAt.getTime(),
    description: elements.description.value,
    images: [],
    maxAge: Number(elements.maxAge.value) || 0,
    minAge: Number(elements.minAge.value) || 0,
    name: elements.product_name.value,
    price: Number(elements.price.value.replace(/,/gm, "")),
    stocks: 0,
    uid,
  };

  let saveToFirebase = (product) => {
    let updated = false;
    if (
      product.category &&
      meta.categories.filter(({ title }) => title === product.category).length
    ) {
      updated = true;
      meta.categories.push({ title: product.category });
    }
    if (product.color && !meta.colors.includes({ color: product.color })) {
      updated = true;
      meta.colors.push({ title: product.color });
    }
    updateMeta(meta);
    updated
      ? database.update(meta).then(() =>
          products
            .doc()
            .set(product)
            .then(() => onComplete())
        )
      : products
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
            console.log("saved", product);
            return saveToFirebase(product);
          }
        });
    });
  } else {
    saveToFirebase(product);
  }
};

function updateMeta({ categories, sizes, colors }) {
  let options = {
    showNoResults: false,
    minCharacters: 0,
  };

  if (categories instanceof Array) {
    var __tmp = [];
    meta.categories = categories
      .filter(({ title }) =>
        __tmp.includes(title) ? false : __tmp.push(title)
      )
      .sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt());
    $("#category").search({
      source: categories,
      ...options,
    });
  }

  if (colors instanceof Array) {
    var __tmp = [];
    meta.colors = colors
      .filter(({ title }) =>
        __tmp.includes(title) ? false : __tmp.push(title)
      )
      .sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt());
    $("#color").search({
      source: colors,
      ...options,
    });
  }
}

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
      reader.onload = (event) => {
        el.innerHTML = `<img class="ui small image bordered centered" src="${event.target.result}" />`;
      };
      reader.readAsDataURL(files[0]);
    },

    submitProduct(event) {
      let target = event.target;
      target.classList.add("loading");
      fetch(
        "https://ethereal-demo-link.netlify.app/.netlify/functions/timestamp"
      )
        .then((res) => res.text())
        .then((timestamp) => {
          let onComplete = () => {
            this.resetImage();
            target.reset();
            target.classList.remove("loading");
          };
          let now = new Date();
          now.setTime(timestamp);

          createProduct({
            uid: this.$root.user.uid,
            createdAt: now,
            elements: target.elements,
            onComplete,
          });
        });
    },

    generateProductCode(event) {
      if (data.convertedManually) {
        return;
      }
      let letterStart, letterMiddle, letterEnd, productCode;
      productCode = document.querySelector("#product_code");
      if (!event.target.value) {
        return (productCode.value = "");
      }
      let value = event.target.value;
      let words = value.replace(/[^a-zA-Z]/gm, "").toUpperCase();
      let digits = value.replace(/\D/gm, "").substr(-6, 6) || "001";

      if (digits.length < 3) {
        digits = "0".repeat(3 - digits.length) + digits;
      }

      letterStart = words.substr(0, 1);
      letterMiddle = words.substr(Math.round(words.length / 2) - 1, 1);
      letterEnd = words.substr(words.length - 1, 1);

      if (productCode) {
        productCode.value = `${letterStart}${letterMiddle}${letterEnd}-${digits}`;
      }
    },

    convertProductCode(event) {
      let value = event.target.value;
      data.convertedManually = true;
      event.target.value = value.toUpperCase().replace(/(\s|[^\w\d\-])/gm, "");
    },

    convertProductPrice(event) {
      let value = Number(event.target.value.replace(/,/gm, "")) || null;
      if (value !== null) {
        event.target.value = value.toLocaleString();
        event.target.parentElement.classList.remove("error");
      } else {
        event.target.parentElement.classList.add("error");
      }
    },

    convertAgeGroup(event) {
      let value = Number(event.target.value) || null;
      if (value !== null) {
        event.target.value = value.toFixed(1);
        event.target.parentElement.classList.remove("error");
      } else {
        event.target.parentElement.classList.add("error");
      }
    },
  },

  computed: {
    onLoad() {
      database.get().then((ref) => updateMeta(ref.data()));
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

form {
  margin-bottom: 20px;
}

.product-create-form {
  padding-top: 20px;
}
</style>
