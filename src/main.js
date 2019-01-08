// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import VueOnsen from 'vue-onsenui'  // This imports 'onsenui', so no need to import it separately

import App from './App.vue'
import router from './router'

Vue.use(VueOnsen)  // VueOnsen set here as plugin to VUE. Done automatically if a call to window.Vue exists in the startup code.

Vue.config.productionTip = false

let app = '';

// Initialize Firebase
let config = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***.appspot.com",
  messagingSenderId: "***REMOVED***"
};

firebase.initializeApp(config)
const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);

// at user login event
firebase.auth().onAuthStateChanged((user) => {

  let usersRef = db.collection("users");

  if (user) { // if user is logged in.

      let docRef = usersRef.doc(user.email);

      docRef.get().then(function(doc) {

        // if user isn't in db yet
        if (!doc.exists) {

          // create user entry
          let newUser = usersRef
            .doc(user.email);

          // add email property to new user
          newUser
            .set({
              email: user.email
            });

          // create user's first garden
          newUser
            .collection("gardens")
            .doc("garden_01")
            .set({
              name: "Garden 1"
            });
      }})
      // error debug message for docRef.get()
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
