<template>
  <div class="ui container search" :load="onLoad">
    <h2 class="ui header">Search Products</h2>
    <form class="ui form" @submit.prevent="submitSearchProducts($event)">
      <div class="field">
        <!-- product name field -->
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search by item code or product name"
        />
      </div>
      <br />
      <div>
        <h4 class="ui dividing header"><i class="filter icon"></i>Filters</h4>
        <div class="fields">
          <div class="six wide field">
            <label for="categories">Categories</label>
            <select
              name="categories"
              id="categories"
              class="ui fluid dropdown"
              multiple
            ></select>
          </div>
          <div class="five wide field">
            <label for="colors">Colors</label>
            <select
              name="colors"
              id="colors"
              class="ui fluid dropdown"
              multiple
            ></select>
          </div>
          <div class="wide field">
            <label for="searchMode">Mode</label>
            <select name="searchMode" id="searchMode" class="ui dropdown">
              <option value="all">All</option>
              <option value="in-stocks" selected>In-Stocks Only</option>
              <option value="out-of-stocks">Out of Stocks Only</option>
            </select>
          </div>
        </div>
        <div class="two fields">
          <div class="two fields">
            <div class="field">
              <label for="age-group">From</label>
              <div class="ui left labeled input field">
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
              <label for="age-group">To</label>
              <div class="ui left labeled input field">
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
        </div>
      </div>
      <br />
      <button type="submit" class="ui button primary">
        <i class="search icon"></i>
        Search
      </button>
    </form>
    <div class="ui error message" v-if="error">
      <i class="close icon" @click="clearError()"></i>
      <div class="header">{{ error }}</div>
    </div>
    <div class="ui dividing header" v-if="searched">
      showing matched result(s): <span>{{ matched }}</span> out of
      <span>{{ queried }}</span> queried.
    </div>
    <div class="cards" v-if="results.length">
      <product-list
        v-for="product in results"
        :key="product.id"
        :name="product.name"
        :description="product.description"
        :price="product.price"
        :minAge="product.minAge"
        :maxAge="product.maxAge"
        :stocks="product.stocks"
        :createdAt="product.createdAt"
        :category="product.category"
        :color="product.color"
        :size="product.size"
      />
    </div>
  </div>
</template>

<script>
import { database, products } from "@/firebase";
import ProductList from "./ProductList";

const params = {};
const references = {};

const meta = {
  categories: [],
  colors: [],
};

const buildQuery = (
  db,
  { search, categories, colors, mode, minAge, maxAge }
) => {
  if (minAge && maxAge) {
    if (minAge > maxAge) {
      throw Error(
        "Invalid Age Group Range: maximum age must be greater than minimum age"
      );
    }
  }
  switch (mode) {
    case "in-stocks":
      db = db.where("stocks", ">", 1);
      break;
    case "out-of-stocks":
      db = db.where("stocks", "<", 1);
      break;
  }
  return db;
};

const searchProduct = (elements, resolve) => {
  let dbRef = products;
  let mode = elements.searchMode.value || null;
  let query = {
    search: elements.search.value || null,
  };

  if (elements.minAge.value.length) {
    query.minAge = Number(elements.minAge.value) || 0;
  }

  if (elements.maxAge.value.length) {
    query.maxAge = Number(elements.maxAge.value) || 0;
  }

  if (params.categories) {
    query.categories = params.categories;
  }

  if (params.colors) {
    query.colors = params.colors;
  }

  if (mode === "in-stocks") {
    dbRef = dbRef.where("stocks", ">", 0);
  } else if (mode === "out-of-stocks") {
    dbRef = dbRef.where("stocks", "<", 1);
  }

  try {
    dbRef.get().then((ref) => {
      ref.forEach((ref) => {
        let data = ref.data();
        data.id = ref.id;
        references[ref.id] = [ref, data];
      });
      let refs = Object.values(references).map((doc) => doc[1]);
      refs = refs.filter((data) => {
        if (query.categories && !query.categories.includes(data.category)) {
          return false;
        }
        if (query.colors && !query.colors.includes(data.color)) {
          return false;
        }
        if (
          query.maxAge &&
          data.maxAge &&
          Number(data.maxAge) > Number(query.maxAge)
        ) {
          return false;
        }
        if (
          query.minAge &&
          data.minAge &&
          Number(data.minAge) < Number(query.minAge)
        ) {
          return false;
        }

        if (query.search) {
          return (
            (data.code || "")
              .toLowerCase()
              .includes(query.search.toLowerCase()) ||
            (data.name || "").toLowerCase().includes(query.search.toLowerCase())
          );
        }
        return true;
      });
      refs = refs.sort((a, b) => b.createdAt - a.createdAt);
      // refs = refs.sort((a, b) => b.stocks - a.stocks);
      if (query.minAge) {
        refs = refs.sort((a, b) => b.minAge - a.minAge);
      }
      resolve(refs, refs.length, ref.size);
    });
  } catch (e) {
    resolve(e);
  }
};

function updateMeta({ categories, sizes, colors }) {
  if (categories instanceof Array) {
    var __tmp = [];
    meta.categories = categories
      .filter(({ title }) =>
        __tmp.includes(title) ? false : __tmp.push(title)
      )
      .sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt())
      .map(({ title }) => {
        return {
          name: title,
          value: title,
        };
      });

    $("#categories").dropdown({
      values: meta.categories,
      onAdd(value) {
        if (typeof params.categories !== "object") {
          params.categories = [];
        }
        params.categories.push(value);
      },
      onRemove(value) {
        if (typeof params.categories === "object") {
          var i = params.categories.indexOf(value);
          delete params.categories[i];
          params.categories = params.categories.filter((c) => c != null);
          if (!params.categories.length) {
            delete params.categories;
          }
        }
      },
    });
  }

  if (colors instanceof Array) {
    var __tmp = [];
    meta.colors = colors
      .filter(({ title }) =>
        __tmp.includes(title) ? false : __tmp.push(title)
      )
      .sort((a, b) => a.title.charCodeAt() - b.title.charCodeAt())
      .map(({ title }) => {
        return {
          name: title,
          value: title,
        };
      });

    $("#colors").dropdown({
      values: meta.colors,
      onAdd(value) {
        if (typeof params.colors !== "object") {
          params.colors = [];
        }
        params.colors.push(value);
      },
      onRemove(value) {
        if (typeof params.colors === "object") {
          var i = params.colors.indexOf(value);
          delete params.colors[i];
          params.colors = params.colors.filter((c) => c != null);
          if (!params.colors.length) {
            delete params.colors;
          }
        }
      },
    });

    $("#searchMode").dropdown();
  }
}

export default {
  name: "ProductSearch",

  data() {
    return {
      results: [],
      searched: false,
      error: null,
      queried: 0,
      matched: 0,
    };
  },

  components: {
    ProductList,
  },

  methods: {
    clearError() {
      this.error = null;
    },

    submitSearchProducts(event) {
      let el = event.target;
      let submit = el.querySelector("button[type=submit]");
      submit.classList.add("loading");
      this.clearError();
      searchProduct(el.elements, (refs, count, size) => {
        submit.classList.remove("loading");
        if (refs instanceof Error) {
          return (this.error = refs.message);
        }

        this.matched = count;
        this.queried = size;
        this.results = refs;
        this.searched = true;
      });
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
.ui.container.search {
  padding-top: 25px;
  padding-bottom: 50px;
}
</style>
