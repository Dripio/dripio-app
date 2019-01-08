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
        if (!doc.exists) { // if user isn't in db yet
          // create user entry
          usersRef.add({
            email: user.email
          })
          .then(function(newUser){
            newUser.collection("gardens").add({
              name: "Garden 1"
            })
            .then(function(garden) {
              console.log("garden succesfully added: ", garden);
            })
            .catch(function(error) {
              console.error("error adding initial garden: ", error);
            })
          })
          .catch(function(error) {
            console.error("Error adding user: ", error);
          });
          //perhaps chain a `.then(function(docRef){})` to create a nested gardens collection
        }
      }).catch(function (error) {
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
