// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import VueFire from 'vuefire'
import VueOnsen from 'vue-onsenui'  // This imports 'onsenui', so no need to import it separately

import App from './App.vue'
import router from './router'

Vue.use(VueFire)
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
export const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true};
  db.settings(settings);

export const auth = firebase.auth()

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
              name: "Garden 1",
              slug: generateUUID()
            });
        }
      })
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

function generateUUID () {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

export function checkConnection() {
    let Connection = navigator.connection;

    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}
