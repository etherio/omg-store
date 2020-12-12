<template>
  <main v-if="loaded">
    <div class="ui fixed inverted menu">
      <div class="ui container">
        <a href="#" class="header item">
          <img
            src="https://semantic-ui.com/examples/assets/images/logo.png"
            class="logo"
          />
          OMG Admin
        </a>
        <router-link to="/" class="item">Home</router-link>
        <router-link to="/product" class="item">Product</router-link>
      </div>
    </div>
    <div class="ui main container">
      <div v-if="loggedIn">
        <router-view
          :products="products"
          :categories="categories"
        ></router-view>
      </div>
      <div v-else class="ui login container">
        <LoginForm />
      </div>
    </div>
  </main>
</template>

<script>
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import { database, products } from "./firebase";

const data = {
  user: null,
  loggedIn: false,
  loaded: false,
  products: [],
  categories: [],
};

firebase.auth().onAuthStateChanged((user) => {
  data.user = user;
  data.loggedIn = Boolean(user);
  data.loaded = true;

  if (user) {
    try {
      database.get().then((ref) => {
        let _data = ref.data();
        data.categories = _data.categories;
      });
      products
        .orderBy("createdAt", "desc")
        .get()
        .then((docRef) => {
          docRef.forEach((ref) => {
            let product = ref.data();
            product.id = ref.ref.id;
            product.photoURL = null;
            var image = product.images[0];
            if (image) {
              firebase
                .storage()
                .ref()
                .child(image)
                .getDownloadURL()
                .then((url) => (product.photoURL = url));
            } else {
              product.photoURL = "/assets/image.png";
            }
            data.products.push(product);
          });
        });
    } catch (e) {
      console.error(e);
    }
  }
  data.loaded = true;
});

export default {
  data() {
    return data;
  },
  components: {
    LoginForm,
    Dashboard,
  },
};
</script>

<style>
body {
  background-color: #ffffff;
}
.ui.menu .item img.logo {
  margin-right: 1.5em;
}
.main.container {
  margin-top: 7em;
}
.login.container {
  padding-top: 2em;
}
.wireframe {
  margin-top: 2em;
}
.ui.footer.segment {
  margin: 5em 0em 0em;
  padding: 5em 0em;
}
.item {
  font-weight: normal !important;
}
.router-link-exact-active {
  font-weight: bold !important;
  color: #ffffff8f !important;
}
</style>
