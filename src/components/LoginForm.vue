<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <img
          src="https://semantic-ui.com/examples/assets/images/logo.png"
          class="image"
        />
        <div class="content">Log-in to your account</div>
      </h2>
      <div class="ui large form my-10 p-10">
        <div class="ui stacked segment">
          <button
            class="ui fluid large red submit button mt-6"
            @click="signInWithGoogle()"
          >
            <i class="fa fa-google mr-4"></i> Log In with Google
          </button>

          <button
            class="ui fluid large blue active submit button mt-6"
            @click="signInWithFacebook()"
          >
            <i class="fa fa-facebook bl mr-4"></i> Log In with Facebook
          </button>
        </div>
      </div>

      <div v-if="errors" class="ui error message"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: ["errors"],
  methods: {
    signInWithGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    signInWithFacebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
  },
};
</script>

<style>
.mr-4 {
  margin-right: 0.5rem !important;
}

.mt-4 {
  margin-top: 0.5rem !important;
}
.mt-5 {
  margin-top: 0.75rem !important;
}
.mt-6 {
  margin-top: 1rem !important;
}
.my-10 {
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
}
.py-10 {
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}
</style>
