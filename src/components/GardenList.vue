<template id="main">
  <v-ons-splitter>

    <!-- Side Menu with list of gardens -->
    <!-- Make this a dropdown menu from the top middle -->
    <v-ons-splitter-side
      swipeable width="150px" collapse="" side="right"
      :open.sync="openSide">
      <v-ons-page>
        <v-ons-list>
          <v-ons-list-item @click="addGarden" class="button white-text">
            Add Garden
          </v-ons-list-item>
          <!-- <v-ons-list-item @click="openSide = false">
          </v-ons-list-item> -->

          <!-- Put the log out on a top right menu, along with a link to our homepage, privacy notice, version. -->
          <v-ons-list-item tappable @click="logout" class="button white-text">Logout</v-ons-list-item>

        </v-ons-list>
      </v-ons-page>
    </v-ons-splitter-side>

    <!-- Garden settings with option to add a controller -->
    <v-ons-splitter-content>
      <template id="editGarden">
        <v-ons-page>

          <!-- top bar -->
          <v-ons-toolbar style="background: #29187D; height: 100px;">

            <!-- back button to open list of gardens -->
            <div class="right">
              <v-ons-toolbar-button
                @click="openSide = true"
                style="height: 100px; display: flex; align-items: center"
                class="button white-text"
                >
                <v-ons-icon
                  icon="ion-navicon, material:md-menu"
                  style="font-size:36px"
                  ></v-ons-icon>
              </v-ons-toolbar-button>
            </div>

            <div class="toolbar__center" style="height: 100px; display: flex; justify-content: center; align-items: center;">

              <v-ons-select
                style="width: 70%; height: 2em; padding: 2em;"
                v-model="gardenname"
              >
                <option
                  v-for="garden in gardens.slice().reverse()"
                  @change="editGarden(garden)"
                >
                  {{ garden.name }}
                </option>
              </v-ons-select>
              <!-- Use the logo with this placement on other pages.-->
              <!-- <img alt="Vue logo" class="login-logo-x-small login-logo" src="../assets/logo.svg"> -->
            </div>

            <!-- Additional div to center the back button and logo -->
            <div class="left">
              <div style="width: 16px;"></div>
            </div>
          </v-ons-toolbar>

          <!-- Weather bar -->
          <!-- Separate this into a separate component-->
          <div class="weather">
            <p class="temperature">{{ this.weather.data.main.temp }}˚F</p>
            <p>{{ this.weather.data.weather[0].description }} </p>
            <div class="hr"></div>
            <!-- Precipitation data is not available with the free tier of OpenWeather API -->
            <!-- Another reason to get weather data from native code -->
            <p class="weather-details">Humidity: {{ this.weather.data.main.humidity }}%</p>
          </div>

          <!-- Name of Garden () -->
          <div style="padding-top: 70px">
            <v-ons-input class="gardenTitle" v-model="gardenname" @change="updateName"></v-ons-input>
          </div>

          <!-- List of available controllers -->
          <!-- Fix this by making sure controllers are
          correctly being saved to firebase in Connect.vue, or use localstorage for now. -->
          <!-- Make this list be a carousel under the top bar. -->
          <v-ons-list-item v-for="controller in controllers" tappable>
            <div class="center">{{ controller }}</div>
          </v-ons-list-item>

          <!-- Interface to discover/add a new controller -->
          <div class="margin-top">
            <p>Add a Dripio Controller</p>
            <v-ons-fab ripple @click="connect" style="background: #29187D">
              <ons-icon
                icon="ion-wifi, material:wifi" class="white-text">
              </ons-icon>
            </v-ons-fab>
          </div>

          <!-- Add the list of valves (see Connect.vue) here, as a list under controllers -->

        </v-ons-page>
      </template>
    </v-ons-splitter-content>

  </v-ons-splitter>
</template>

<script>

  // import database and info on who's logged in
  import { db } from '../main'
  import { auth } from '../main'
  import firebase from 'firebase'
  // import EditGarden from './EditGarden.vue'
  import axios from 'axios'

  // import { weatherApiKey, weatherAPI } from './config.js'
  import { weatherApiKey, weatherAPI } from '../config.js'

  const STORAGE_KEY = 'weather-storage';

  export default {
    name: 'GardenList',
    methods: {
      // perhaps consolidate main.js to use this addGarden function in the initial garden creation.
      addGarden: function() {
        let numOfNextGarden = this.gardens.length + 1;

        let gardenId = "garden_";
        gardenId += (numOfNextGarden < 10) ? "0" + numOfNextGarden
          : numOfNextGarden;

        let defaultNameOfGarden = "Garden " + numOfNextGarden;

        db.collection('users')
          .doc( auth.currentUser.email )
          .collection('gardens')
          .doc( gardenId )
          .set({
            name: defaultNameOfGarden,
            slug: this.generateUUID()
          });
          this.gardenname = defaultNameOfGarden;
          this.openSide = false;
      },
      editGarden: function(gardenButton) {
        this.docname = gardenButton.id;
        this.gardenname = gardenButton.name;

        // let that = this;
        // see https://firebase.google.com/docs/firestore/query-data/get-data "Get all documents in a collection"
        db.collection('users')
          .doc( auth.currentUser.email )
          .collection('gardens')
          .doc ( this.docname )
          .collection('controllers').get().then(function(querySnapshot) {
            // let arr = [];
            querySnapshot.forEach(function(doc) {
              console.log(doc.id);
              // arr.push(doc.id);
            });
            // that.controllers = arr;
          }).catch(function(err){
            console.log("oops " + err);
          });
        // console.log('it is..')
        // console.log(this.controllers);
        // console.log(this.controllers);

      },
      generateUUID () {
        let d = new Date().getTime()
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          let r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        return uuid
      },
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      },
      updateName () {
        let gardenRef = db.collection('users')
          .doc( auth.currentUser.email )
          .collection('gardens')
          .doc ( this.docname );

        this.garden = gardenRef;

        gardenRef
          .set(
            { name: this.gardenname },
            { merge: true } // probably can be removed
          );
      },
      connect () {
        let numOfNextController = this.controllers.length + 1;

        let controllerId = "controller_";
        controllerId += (numOfNextController < 10) ? "0" + numOfNextController
          : numOfNextController;

        let defaultNameOfController = "Controller " + numOfNextController;

        db.collection('users')
          .doc( auth.currentUser.email )
          .collection('gardens')
          .doc( this.docname )
          .collection('controllers')
          .doc( controllerId )
          .set({
            name: defaultNameOfController,
            slug: this.generateUUID()
          });

        this.$router.push({

          name: 'Connect',
          params: {
            name: this.gardenname
          },
          query: {
            garden: this.garden
          }
        })
      },
      capitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    },
    data () {
      return {
        gardens: [],
        controllers: [],
        openSide: false,
        gardenname: 'Garden 1', //default name
        docname: 'garden_01', //default docname,
        garden: {},
        weather: {},
        // location: ''
      }
    },
    firestore () {
      return {
        gardens: db.collection('users')
          .doc( auth.currentUser.email )
          .collection('gardens')
      }
    },
    mounted () {
      // if weather report check time has not yet been set, then get the time
      // OR if it's been over an hour since last weather check
      if (!this.weather.reportTime || Date.now() - this.weather.reportTime > 3.6e+6){
        axios
          // get the current weather for Portland, OR, using the city code.
          // Later, get current position and use coordinates for the api call
          // And eventually, get rid of api, and just access device's native weather info
          // like Android's. See https://developers.google.com/android/reference/com/google/android/gms/awareness/state/Weather
          // Denver, CO city ID is 5419384 on openWeatherMap API.
          // Portland, OR, 5746545
          .get('https://api.openweathermap.org/data/2.5/weather?id=5419384&APPID=' + weatherApiKey + '&units=imperial')
          .then(response => {
            this.weather = response
            this.weather.reportTime = Date.now()
            this.weather.data.main.temp = parseInt(this.weather.data.main.temp)
            this.weather.data.weather[0].description = this.capitalize(this.weather.data.weather[0].description)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.weather))
          })
          .catch(err => {
            // Make this into a nicer OnsenUI alert
            alert('API limit for mock-up app reached. Weather information will be inaccurate. Please check back later.')
          })
      }
    },
    created: function () {
      this.weather = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      // this.loadWeather();
      // when page is loaded, if localstorage has weather, load the local storage of weather
    }
  }
</script>

<style>
  .margin-top {
    margin: 50px 0px 10px;
  }
  #md-back-button-icon{
    fill: #E8DEFF;
  }
  .gardenTitle .text-input{
    font-size: 30px;
    height: 40px;
    color: black;
    text-align: center;
  }
</style>
