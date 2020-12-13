(function(t){function e(e){for(var i,o,n=e[0],c=e[1],l=e[2],d=0,f=[];d<n.length;d++)o=n[d],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&f.push(s[o][0]),s[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(f.length)f.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var t,e=0;e<r.length;e++){for(var a=r[e],i=!0,n=1;n<a.length;n++){var c=a[n];0!==s[c]&&(i=!1)}i&&(r.splice(e--,1),t=o(o.s=a[0]))}return t}var i={},s={app:0},r=[];function o(e){if(i[e])return i[e].exports;var a=i[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=i,o.d=function(t,e,a){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(o.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(a,i,function(e){return t[e]}.bind(null,i));return a},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],c=n.push.bind(n);n.push=e,n=n.slice();for(var l=0;l<n.length;l++)e(n[l]);var u=c;r.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"013b":function(t,e,a){"use strict";a("e9fb")},"034f":function(t,e,a){"use strict";a("85ec")},"2a34":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);a("bf19"),a("e260"),a("e6cf"),a("cca6"),a("a79d");var i=a("2b0e"),s=a("8c4f"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ProductForm")],1)},o=[],n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{load:t.onLoad}},[a("form",{staticClass:"ui form",on:{submit:function(e){return e.preventDefault(),t.submitProduct(e)}}},[a("h2",{staticClass:"ui dividing header"},[t._v("Add Product")]),a("div",{staticClass:"fields"},[a("div",{staticClass:"eleven wide required field"},[a("label",{attrs:{for:"product_name"}},[t._v("Product Name")]),a("input",{attrs:{type:"text",id:"product_name",name:"product_name",placeholder:"Name (Required)",required:""},on:{keyup:function(e){return t.generateProductCode(e)}}})]),a("div",{staticClass:"five wide required field"},[a("label",{attrs:{for:"product_code"}},[t._v("Product Code")]),a("input",{attrs:{type:"text",id:"product_code",name:"product_code",placeholder:"Code (Required)",required:""},on:{keyup:function(e){return t.convertProductCode(e)}}})])]),a("div",{staticClass:"fields"},[a("div",{staticClass:"five wide required field"},[a("label",{attrs:{for:"price"}},[t._v("Product Price")]),a("div",{staticClass:"ui right labeled input field"},[a("input",{attrs:{type:"tel",id:"price",name:"price",placeholder:"Kyats (Required)",autocomplete:"off",required:""},on:{keyup:function(e){return t.convertProductPrice(e)}}}),a("label",{staticClass:"ui label",attrs:{for:"price"}},[t._v("MMK")])])]),t._m(0)]),t._m(1),a("div",{staticClass:"fields"},[a("div",{staticClass:"four wide field"},[a("label",{attrs:{for:"age-group"}},[t._v("From")]),a("div",{staticClass:"ui left labeled input field"},[a("label",{staticClass:"ui label",attrs:{for:"minAge"}},[t._v("min")]),a("input",{attrs:{type:"tel",id:"minAge",name:"minAge",placeholder:"Age Group",autocomplete:"off"},on:{change:function(e){return t.convertAgeGroup(e)}}})])]),a("div",{staticClass:"four wide field"},[a("label",{attrs:{for:"age-group"}},[t._v("To")]),a("div",{staticClass:"ui left labeled input field"},[a("label",{staticClass:"ui label",attrs:{for:"maxAge"}},[t._v("max")]),a("input",{attrs:{type:"tel",id:"maxAge",name:"maxAge",placeholder:"Age Group",autocomplete:"off"},on:{change:function(e){return t.convertAgeGroup(e)}}})])])]),t._m(2),a("div",{staticClass:"field"},[t._m(3),a("input",{attrs:{type:"file",name:"images",id:"images",accept:"image/*",multiple:""},on:{change:function(e){return t.previewImages(e)}}})]),a("button",{staticClass:"ui fluid button primary",attrs:{type:"submit"}},[t._v("Save")])])])},c=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"eight wide field"},[a("label",{attrs:{for:"category"}},[t._v("Catagory")]),a("div",{staticClass:"ui search",attrs:{id:"category"}},[a("div",{staticClass:"ui icon input"},[a("i",{staticClass:"tag icon"}),a("input",{staticClass:"prompt",attrs:{name:"category",type:"text",autocomplete:"off",placeholder:"Not specified"}})]),a("div",{staticClass:"results"})])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"fields"},[a("div",{staticClass:"five wide field"},[a("label",{attrs:{for:"color"}},[t._v("Color")]),a("div",{staticClass:"ui search",attrs:{id:"color"}},[a("div",{staticClass:"ui icon input"},[a("i",{staticClass:"paint brush icon"}),a("input",{staticClass:"prompt",attrs:{name:"color",type:"text",placeholder:"Not specified",autocomplete:"off"}})]),a("div",{staticClass:"results"})])]),a("div",{staticClass:"four wide field"},[a("label",{attrs:{for:"size"}},[t._v("Size")]),a("select",{staticClass:"ui selection dropdown",attrs:{name:"size",id:"size"}},[a("option",{attrs:{value:""}},[t._v("Not Specified")])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"field"},[a("label",{attrs:{for:"description"}},[t._v("Description")]),a("textarea",{attrs:{id:"description",name:"description",placeholder:"[Optional]",rows:"4"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{attrs:{for:"images"}},[a("div",{staticClass:"ui image placeholder segment"},[a("div",{staticClass:"ui icon header"},[a("i",{staticClass:"file image outline icon"}),t._v(" Upload an image ")])])])}],l=(a("a4d3"),a("e01a"),a("99af"),a("4160"),a("caad"),a("b0c0"),a("a9e3"),a("b680"),a("d3b7"),a("ac1f"),a("2532"),a("38cf"),a("5319"),a("841c"),a("1276"),a("159b"),a("5530")),u={apiKey:"AIzaSyBiSkxX_gfnqyhPath2vFwn2gjLclrFCtI",authDomain:"etherio-vue.firebaseapp.com",databaseURL:"https://etherio-vue.firebaseio.com",projectId:"etherio-vue",storageBucket:"etherio-vue.appspot.com",messagingSenderId:"966040745442",appId:"1:966040745442:web:2a83c08213721cdaacb5bb"},d="ctkesqmPHGJHW95gMvnL";firebase.initializeApp(u),firebase.analytics();var f=firebase.firestore().collection("databases").doc(d),v=firebase.storage().ref().child("databases").child(d),p=firebase.auth(),m=f.collection("products"),g={categories:[],colors:[],sizes:[]},h={convertedManually:!1,resetImage:function(){return null}};function b(t){return"".concat(t.substr(0,1).toUpperCase()).concat(t.substr(1))}var C=function(t){var e=t.uid,a=t.createdAt,i=t.elements,s=t.onComplete,r={uid:e,name:i.product_name.value,code:i.product_code.value,category:b(i.category.value),color:b(i.color.value),size:i.size.value,description:i.description.value,price:Number(i.price.value.replace(/,/gm,"")),stocks:0,createdAt:a.getTime(),minAge:Number(i.minAge.value),maxAge:Number(i.maxAge.value),images:[]};console.log("initial",r);var o=function(t){var e=!1;t.category&&!g.categories.includes(t.category)&&(g.categories.push({title:t.category}),e=!0),t.size&&!g.sizes.includes(t.size)&&(g.sizes.push({title:t.size}),e=!0),t.color&&!g.colors.includes(t.color)&&(g.colors.push({title:t.color}),e=!0),e?f.update(g).then((function(){return m.doc().set(t).then((function(){return s()}))})):m.doc().set(t).then((function(){return s()}))};if(i.images.files.length){var n=0;i.images.files.forEach((function(t){var s;switch(t.type){case"image/jpg":case"image/jpeg":s="jpg";break;case"image/png":s="png";break;default:s=t.name.split(".")[1]}var c=a.getYear()-100,l=a.getMonth()+1,u="products/".concat(c,"/").concat(l,"/").concat(r.createdAt,"-").concat(e,".").concat(s);v.child(u).put(t).then((function(){if(n++,r.images.push(u),i.images.files.length===n)return console.log("saved",r),o(r)}))}))}else o(r)};function _(t){var e=t.categories,a=t.sizes,i=t.colors,s={showNoResults:!1,minCharacters:0};e instanceof Array&&(g.categories=e,$("#category").search(Object(l["a"])({source:e},s))),a instanceof Array&&(g.sizes=a,a.unshift({name:"Not specified",value:""}),$("#size").dropdown({values:a,selectFirstResult:!0})),i instanceof Array&&(g.colors=i,$("#color").search(Object(l["a"])({source:i},s)))}var y={name:"ProductForm",data:function(){return h},methods:{previewImages:function(t){var e=t.target.files,a=t.target.parentElement.querySelector(".image");if(0===e.length)return this.resetImage();var i=new FileReader;if(!this.resetImage){var s=a.innerHTML;this.resetImage=function(){return a.innerHTML=s}}i.onload=function(t){a.innerHTML='<img class="ui small image bordered centered" src="'.concat(t.target.result,'" />')},i.readAsDataURL(e[0])},submitProduct:function(t){var e=this,a=t.target;a.classList.add("loading"),fetch("https://ethereal-demo-link.netlify.app/.netlify/functions/timestamp").then((function(t){return t.text()})).then((function(t){var i=function(){e.resetImage(),loader.remove(),a.reset(),a.classList.remove("loading")},s=new Date;s.setTime(t),C({uid:e.$root.user.uid,createdAt:s,elements:a.elements,onComplete:i})}))},generateProductCode:function(t){if(!h.convertedManually){var e,a,i,s;if(s=document.querySelector("#product_code"),!t.target.value)return s.value="";var r=t.target.value,o=r.replace(/[^a-zA-Z]/gm,"").toUpperCase(),n=r.replace(/\D/gm,"").substr(-6,6)||"001";n.length<3&&(n="0".repeat(3-n.length)+n),e=o.substr(0,1),a=o.substr(Math.round(o.length/2)-1,1),i=o.substr(o.length-1,1),s&&(s.value="".concat(e).concat(a).concat(i,"-").concat(n))}},convertProductCode:function(t){var e=t.target.value;h.convertedManually=!0,t.target.value=e.toUpperCase().replace(/(\s|[^\w\d\-])/gm,"")},convertProductPrice:function(t){var e=Number(t.target.value.replace(/,/gm,""))||null;null!==e?(t.target.value=e.toLocaleString(),t.target.parentElement.classList.remove("error")):t.target.parentElement.classList.add("error")},convertAgeGroup:function(t){var e=Number(t.target.value)||null;null!==e?(t.target.value=e.toFixed(1),t.target.parentElement.classList.remove("error")):t.target.parentElement.classList.add("error")}},computed:{onLoad:function(){f.get().then((function(t){return _(t.data())}))}}},L=y,k=(a("b230"),a("2877")),A=Object(k["a"])(L,n,c,!1,null,null,null),w=A.exports,P={name:"Home",props:["user"],components:{ProductForm:w}},x=P,O=Object(k["a"])(x,r,o,!1,null,null,null),E=O.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{load:t.onLoad}},[a("h1",[t._v("Products")]),a("div",{staticClass:"ui three item menu"},[a("a",{staticClass:"item active",attrs:{href:t.$router.resolve({name:"Products"}).href}},[t._v("In-Stock")]),a("a",{staticClass:"item",attrs:{href:t.$router.resolve({name:"OutOfStocks"}).href}},[t._v("Out of stock")]),a("span",{staticClass:"item"})]),t.products.length?a("div",t._l(t.products,(function(e){return a("div",{key:e.id,staticClass:"ui divided items"},[a("ProductList",{attrs:{name:e.name,description:e.description,price:e.price,photoURL:e.photoURL,stocks:e.stocks,createdAt:e.createdAt,category:e.category,color:e.color,size:e.size}},[a("div",{staticClass:"ui right floated"},[a("button",{staticClass:"ui primary basic button",on:{click:function(a){return t.addStock(a,e.id)}}},[a("i",{staticClass:"left plus icon"}),t._v(" Add ")]),a("button",{staticClass:"ui primary basic button",on:{click:function(a){return t.soldOut(a,e.id)}}},[a("i",{staticClass:"left dolly icon"}),t._v(" Sold ")])])]),a("hr")],1)})),0):a("div",[t.loading?a("div",[t._m(0)]):a("div",{staticClass:"ui placeholder segment"},[t._m(1)])])])},I=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui fluid card"},[a("div",{staticClass:"content"},[a("div",{staticStyle:{display:"grid","grid-template-columns":"220px auto"}},[a("div",{staticClass:"ui fluid placeholder",staticStyle:{width:"200px",height:"200px"}},[a("div",{staticClass:"square image"})]),a("div",{staticClass:"content"},[a("div",{staticClass:"ui placeholder"},[a("div",{staticClass:"line"}),a("div",{staticClass:"line"}),a("div",{staticClass:"line"})])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui icon header"},[a("i",{staticClass:"inbox icon"}),t._v(" No products are found. ")])}],R=(a("c740"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item"},[a("div",{staticClass:"image"},[a("img",{attrs:{src:t.photoURL,alt:"product"}})]),a("div",{staticClass:"content"},[a("a",{staticClass:"header"},[t._v(t._s(t.name))]),a("div",{staticClass:"meta"},[a("span",{staticClass:"price"},[t._v(t._s(t.price.toLocaleString()))])]),a("div",{staticClass:"description"},[t.stocks?a("p",[t._v("Stock: "+t._s(t.stocks))]):t._e(),a("small",[t._v("Created at "+t._s(new Date(t.createdAt).toLocaleString()))]),a("p",[t._v(t._s(t.description))])]),t.category?a("div",{staticClass:"ui blue label"},[t._v(t._s(t.category))]):t._e(),t.color?a("div",{staticClass:"ui label",class:t.color.toLowerCase()},[t._v(" "+t._s(t.color)+" ")]):t._e(),t.size?a("div",{staticClass:"ui label"},[t._v(t._s(t.size))]):t._e()]),a("div",{staticClass:"extra"},[t._t("default")],2),a("hr")])}),j=[],z={name:"ProductList",props:["name","photoURL","price","description","stocks","createdAt","category","size","color"]},U=z,N=(a("92e5"),Object(k["a"])(U,R,j,!1,null,null,null)),M=N.exports,q={},F=function(t){var e=t.data(),a=e.images;if(q[t.ref.id]=t.ref,q[t.ref.id]["data"]=e,e.id=t.ref.id,e.photoURL=null,a.length>0){var i=v.child(a[0]);i.getDownloadURL().then((function(t){return e.photoURL=t}))}else e.photoURL="/assets/image.png";return e},G=function(t,e){var a=[];e.forEach((function(t){return a.push(F(t))})),a=a.sort((function(t,e){return Number(e.createdAt)-Number(t.createdAt)})),t.products=a,t.loading=!1},D={name:"Products",data:function(){return{products:[],loading:!0}},components:{ProductList:M},methods:{addStock:function(t,e){var a=t.target;a.classList.contains("icon")&&(a=a.parentElement);try{var i=q[e];if(!i)return;a.classList.add("loading"),a.setAttribute("disabled",!0),i.update({stocks:i.data.stocks+1}).then((function(){i.data.stocks++,a.classList.remove("loading"),a.removeAttribute("disabled")}))}catch(s){a.classList.remove("loading"),a.removeAttribute("disabled")}},soldOut:function(t,e){var a=t.target;a.classList.contains("icon")&&(a=a.parentElement);try{var i=q[e];if(!i)return;a.classList.add("loading"),a.setAttribute("disabled",!0),i.update({stocks:i.data.stocks-1}).then((function(){i.data.stocks--,a.classList.remove("loading"),a.removeAttribute("disabled")}))}catch(s){a.classList.remove("loading"),a.removeAttribute("disabled"),console.error(s)}},deleteProduct:function(t,e){var a=this,i=t.target;i.classList.contains("icon")&&(i=i.parentElement);var s=i.parentElement.parentElement.parentElement;try{var r=q[e];if(!r)return;i.classList.add("loading"),i.setAttribute("disabled",!0),q[e].delete().then((function(){var t=a.products.findIndex((function(t){return t.id==e}));delete a.products[t],s.remove()}))}catch(o){i.classList.remove("loading"),i.removeAttribute("disabled"),console.error(o)}}},computed:{onLoad:function(){var t=this;m.where("stocks",">",0).get().then((function(e){return G(t,e)}))}}},H=D,T=Object(k["a"])(H,S,I,!1,null,null,null),W=T.exports,J=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{load:t.onLoad}},[a("h1",[t._v("Products")]),a("div",{staticClass:"ui three item menu"},[a("a",{staticClass:"item",attrs:{href:t.$router.resolve({name:"Products"}).href}},[t._v("In-Stock")]),a("a",{staticClass:"item active",attrs:{href:t.$router.resolve({name:"OutOfStocks"}).href}},[t._v("Out of stock")]),a("span",{staticClass:"item"})]),t.products.length?a("div",t._l(t.products,(function(e){return a("div",{key:e.id,staticClass:"ui divided items"},[a("ProductList",{attrs:{name:e.name,description:e.description,price:e.price,photoURL:e.photoURL,stocks:e.stocks,createdAt:e.createdAt,category:e.category}},[a("div",{staticClass:"ui right floated"},[a("button",{staticClass:"ui primary basic button",on:{click:function(a){return t.addStock(a,e.id)}}},[a("i",{staticClass:"left plus icon"}),t._v(" Add ")]),a("button",{staticClass:"ui primary basic button",on:{click:function(a){return t.soldOut(a,e.id)}}},[a("i",{staticClass:"left dolly icon"}),t._v(" Sold ")]),a("button",{staticClass:"ui red button",on:{click:function(a){return t.deleteProduct(a,e.id)}}},[a("i",{staticClass:"left edit icon"}),t._v(" Edit ")])])])],1)})),0):a("div",[t.loading?a("div",[t._m(0)]):a("div",{staticClass:"ui placeholder segment"},[t._m(1)])])])},B=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui fluid card"},[a("div",{staticClass:"content"},[a("div",{staticStyle:{display:"grid","grid-template-columns":"220px auto"}},[a("div",{staticClass:"ui fluid placeholder",staticStyle:{width:"200px",height:"200px"}},[a("div",{staticClass:"square image"})]),a("div",{staticClass:"content"},[a("div",{staticClass:"ui placeholder"},[a("div",{staticClass:"line"}),a("div",{staticClass:"line"}),a("div",{staticClass:"line"})])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui icon header"},[a("i",{staticClass:"inbox icon"}),t._v(" No products are found. ")])}],K={},X=function(t){var e=t.data(),a=e.images;if(K[t.ref.id]=t.ref,K[t.ref.id]["data"]=e,e.id=t.ref.id,e.photoURL=null,a.length>0){var i=v.child(a[0]);i.getDownloadURL().then((function(t){return e.photoURL=t}))}else e.photoURL="/assets/image.png";return e},Y=function(t,e){var a=[];e.forEach((function(t){return a.push(X(t))})),a=a.sort((function(t,e){return Number(e.createdAt)-Number(t.createdAt)})),t.products=a,t.loading=!1},Z={name:"OutOfStocks",data:function(){return{loading:!0,products:[]}},components:{ProductList:M},methods:{addStock:function(t,e){var a=t.target;a.classList.contains("icon")&&(a=a.parentElement);try{var i=K[e];if(!i)return;a.classList.add("loading"),a.setAttribute("disabled",!0),i.update({stocks:i.data.stocks+1}).then((function(){i.data.stocks++,a.classList.remove("loading"),a.removeAttribute("disabled")}))}catch(s){a.classList.remove("loading"),a.removeAttribute("disabled")}},soldOut:function(t,e){var a=t.target;a.classList.contains("icon")&&(a=a.parentElement);try{var i=K[e];if(!i)return;a.classList.add("loading"),a.setAttribute("disabled",!0),i.update({stocks:i.data.stocks-1}).then((function(){i.data.stocks--,a.classList.remove("loading"),a.removeAttribute("disabled")}))}catch(s){a.classList.remove("loading"),a.removeAttribute("disabled"),console.error(s)}},deleteProduct:function(t,e){var a=this,i=t.target;i.classList.contains("icon")&&(i=i.parentElement);var s=i.parentElement.parentElement.parentElement;try{var r=K[e];if(!r)return;i.classList.add("loading"),i.setAttribute("disabled",!0),K[e].delete().then((function(){var t=a.products.findIndex((function(t){return t.id==e}));delete a.products[t],s.remove()}))}catch(o){i.classList.remove("loading"),i.removeAttribute("disabled"),console.error(o)}}},computed:{onLoad:function(){var t=this;m.where("stocks","<",1).get().then((function(e){return Y(t,e)}))}}},Q=Z,V=Object(k["a"])(Q,J,B,!1,null,null,null),tt=V.exports;i["a"].use(s["a"]);var et=[{path:"/",name:"Home",component:E},{path:"/products",name:"Products",component:W},{path:"/outofstocks",name:"OutOfStocks",component:tt}],at=new s["a"]({routes:et}),it=at,st=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("main",[a("div",{staticClass:"ui fixed inverted menu"},[a("div",{staticClass:"ui container"},[a("a",{staticClass:"header item",attrs:{href:"#"}},[t._v("OMG")]),a("router-link",{staticClass:"item",attrs:{to:"/"}},[t._v("Home")]),a("router-link",{staticClass:"item",attrs:{to:"/products"}},[t._v("Products")]),a("div",{staticClass:"right menu"},[t.$root.loggedIn?a("a",{staticClass:"item bold",on:{click:function(e){return t.signOut()}}},[a("i",{staticClass:"sign-out icon"})]):t._e()])],1)]),t.$root.loaded?a("div",{staticClass:"ui main container"},[t.$root.loggedIn?a("router-view"):a("LoginForm")],1):a("div",{staticClass:"main"},[t._m(0)])])},rt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui active inverted dimmer"},[a("div",{staticClass:"ui large loader"})])}],ot=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ui middle aligned center aligned grid"},[a("div",{staticClass:"column"},[t._m(0),a("div",{staticClass:"ui large form my-10 p-10"},[a("div",{staticClass:"ui stacked segment"},[a("button",{staticClass:"ui fluid large google plus submit button mt-6",on:{click:function(e){return t.signInWithGoogle()}}},[a("i",{staticClass:"fa fa-google mr-4"}),t._v(" Log In with Google ")]),a("button",{staticClass:"ui fluid large facebook active submit button mt-6",on:{click:function(e){return t.signInWithFacebook()}}},[a("i",{staticClass:"fa fa-facebook bl mr-4"}),t._v(" Log In with Facebook ")])])]),t.errors?a("div",{staticClass:"ui error message"}):t._e()])])},nt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("h2",{staticClass:"ui teal image header"},[a("img",{staticClass:"image",attrs:{src:"https://semantic-ui.com/examples/assets/images/logo.png"}}),a("div",{staticClass:"content"},[t._v("Log-in to your account")])])}],ct={name:"Login",props:["errors"],methods:{signInWithGoogle:function(){var t=new firebase.auth.GoogleAuthProvider;firebase.auth().signInWithRedirect(t)},signInWithFacebook:function(){var t=new firebase.auth.FacebookAuthProvider;firebase.auth().signInWithRedirect(t)}}},lt=ct,ut=(a("013b"),Object(k["a"])(lt,ot,nt,!1,null,null,null)),dt=ut.exports,ft={components:{LoginForm:dt},methods:{signOut:function(){p.signOut()}}},vt=ft,pt=(a("034f"),Object(k["a"])(vt,st,rt,!1,null,null,null)),mt=pt.exports,gt={user:null,loggedIn:!1,loaded:!1};p.onAuthStateChanged((function(t){(gt.loggedIn=Boolean(t))&&(gt.user=t.toJSON()),gt.loaded=!0}));new i["a"]({router:it,data:gt,render:function(t){return t(mt)}}).$mount("#app")},"85ec":function(t,e,a){},"92e5":function(t,e,a){"use strict";a("baaa")},b230:function(t,e,a){"use strict";a("2a34")},baaa:function(t,e,a){},e9fb:function(t,e,a){}});
//# sourceMappingURL=app.863a8c2d.js.map