// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue'
import firebase from 'firebase'
import VueOnsen from 'vue-onsenui'  // This imports 'onsenui', so no need to import it separately

import App from './App.vue'
import router from './router'

Vue.use(VueOnsen)  // VueOnsen set here as plugin to VUE. Done automatically if a call to window.Vue exists in the startup code.

Vue.config.productionTip = false

let app = '';

// Initialize Firebase
var config = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "https://***REMOVED***.firebaseio.com",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***.appspot.com",
  messagingSenderId: "***REMOVED***"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
