const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBiSkxX_gfnqyhPath2vFwn2gjLclrFCtI",
  authDomain: "etherio-vue.firebaseapp.com",
  databaseURL: "https://etherio-vue.firebaseio.com",
  projectId: "etherio-vue",
  storageBucket: "etherio-vue.appspot.com",
  messagingSenderId: "966040745442",
  appId: "1:966040745442:web:2a83c08213721cdaacb5bb",
};

const DATABASE_NAME = "ctkesqmPHGJHW95gMvnL";

firebase.initializeApp(FIREBASE_CONFIG);
firebase.analytics();

export const database = firebase
  .firestore()
  .collection("databases")
  .doc(DATABASE_NAME);

export const storage = firebase.storage().ref();

export const products = database.collection("products");
