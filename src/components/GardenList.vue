<template id="main">
  <v-ons-splitter>

    <!-- Garden settings with option to add a controller -->
    <!-- Show this if there are no controllers in the data.controllers array -->
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
<!-- @change="editGarden(garden)" -->
<!-- v-model="gardens[selectedGarden]" -->
              <v-ons-select
                style="width: 70%; height: 2em; padding: 1.2em;"
                v-model="selectedGarden"
                v-on:change="first"
              >
                <option
                  v-for="(garden, index) in gardens"
                  v-bind:value="index"
                  @click="first"
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

          <!-- List of available controllers -->
          <!-- Fix this by making sure controllers are
          correctly being saved to firebase in Connect.vue, or use localstorage for now. -->
          <v-ons-carousel swipeable auto-scroll overscrollable id="carousel">

            <v-ons-carousel-item v-if="controllers.length === 1 && !controllers[0].name">
              <!-- Code for this div is repeated below -->
              <!-- so turn this div into a reusable component -->
              <v-ons-button
                @click="connect"
                modifier="large"
                style="background-image: linear-gradient(to right, #f6efff, white, #f6efff); color: black; font-size: 1em; padding: 15px">
                Add a controller
              </v-ons-button>
            </v-ons-carousel-item>

            <v-ons-carousel-item v-else
              v-for="(controller, index) in controllers">
              <div style="display: flex; justify-content: space-evenly; padding: 20px; border-bottom: 1px solid rgba(41,24,125, 0.6)">
                <!-- Carousel back button & controller graphic -->
                <div class="left"
                  style="display: flex; align-items: center">
                  <img height="50px" src="../style/Controller.svg">
                  <v-ons-toolbar-button
                    @click="prev()"
                    v-if="index > 0"
                    style="display: flex; align-items: center">
                    <v-ons-icon
                      icon="md-chevron-left"
                      style="padding: 5px"
                      ></v-ons-icon>
                  </v-ons-toolbar-button>
                </div>

                <!-- Name of Controller -->
                <div
                  style="text-align: center; font-size: 30px; display: flex; align-items: center">
                  {{ controller.name }}
                </div>

                <!-- Carousel forward button -->
                <div
                  class="right"
                  style="display: flex; align-items: center"
                  >

                  <v-ons-toolbar-button
                    @click="next()"
                    v-if="index < controllers.length - 1"
                    style="display: flex; align-items: center">
                    <v-ons-icon
                      icon="md-chevron-right"
                      style="padding: 5px"
                      ></v-ons-icon>
                  </v-ons-toolbar-button>

                  <v-ons-button
                    v-else
                    >
                    <v-ons-icon
                    @click="$ons.notification
                      .confirm('Would you like to add another controller?')
                      .then((response) => {
                        connect()
                      })"
                      icon="md-plus">
                    </v-ons-icon>
                  </v-ons-button>
                </div>
            </div>

              <!-- FIND A NEW PLACE FOR EDITING THE GARDEN NAME -->
              <!-- Perhaps let people edit it inside of a dialogue box,
              or in right side bar -->
              <!-- <div style="padding-top: 70px">
                <v-ons-input
                  class="gardenTitle"
                  v-model="gardenname"
                  @change="updateName">
                </v-ons-input>
              </div> -->

              <!-- Add the list of valves (see Connect.vue) here, as a list under controllers -->
              <div>
                <v-ons-list>

                <!--  -->
                  <v-ons-list-item tappable
                    v-for="valve in controller.valves">

                    <label>{{ valve.name }}</label>
                    <div class="right">
                      <v-ons-switch checked></v-ons-switch>
                    </div>
                  </v-ons-list-item>
                </v-ons-list>
              </div>

            </v-ons-carousel-item>
          </v-ons-carousel>
          <!-- End of controller/valve carousel -->
        </v-ons-page>
      </template>
    </v-ons-splitter-content>

    <!-- Side menu to log out, add garden, and see username,-->
    <!-- privacy policy, terms of use, website -->
    <v-ons-splitter-side
      swipeable width="150px" collapse="" side="right"
      :open.sync="openSide">
      <v-ons-page>
        <v-ons-list>
          <v-ons-list-item>
            Welcome, {{ currentUser }}!
          </v-ons-list-item>
          <v-ons-list-item @click="addGarden" class="button white-text">
            Add Garden
          </v-ons-list-item>
          <!-- <v-ons-list-item @click="openSide = false">
          </v-ons-list-item> -->

          <!-- Put the log out on a top right menu, along with a link to our homepage, privacy notice, version. -->
          <v-ons-list-item tappable @click="logout" class="button white-text">Logout</v-ons-list-item>
          <!-- add current username here in sidebar-->
          <v-ons-button @click="inspectValues">Inspect</v-ons-button>
        </v-ons-list>
      </v-ons-page>
    </v-ons-splitter-side>
    <!-- End of side menu -->

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
      prev: function() {
        let carousel = document.getElementById('carousel');
        carousel.prev();
      },
      next: function() {
        let carousel = document.getElementById('carousel');
        carousel.next();
      },
      first: function() {
        let carousel = document.getElementById('carousel');
        carousel.first();
      },
      // perhaps consolidate main.js to use this addGarden function in the initial garden creation.
      addGarden: function() {
        let numOfNextGarden = this.gardens.length + 1;

        let gardenId = "garden_";
        gardenId += (numOfNextGarden < 10) ? "0" + numOfNextGarden
          : numOfNextGarden;

        let defaultNameOfGarden = "Garden " + numOfNextGarden;

        let that = this;
        // save the new garden to firestore
        db.collection('users')
          .doc( auth.currentUser.email )
          .collection('gardens')
          .doc( gardenId )
          .set({
            name: defaultNameOfGarden,
            slug: this.generateUUID(),
            id: gardenId,
            controllers: [{ id: "controller_00" }]
          }).then(function(){
            // *** ADD THINKING CIRCLE TRANSITION HERE **
            // switch to the new garden
            that.selectedGarden = that.gardens.length - 1;
          })

          // close side menu
          this.openSide = false;
      },
      editGarden: function(gardenButton) {
        // see https://firebase.google.com/docs/firestore/query-data/get-data "Get all documents in a collection"
        db.collection('users')
          .doc( auth.currentUser.email )
          .collection('gardens')
          .doc ( gardenButton.id )
          .collection('controllers').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              console.log(doc.id);
            });
          }).catch(function(err){
            console.log("oops " + err);
          });
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
        // let gardenRef = db.collection('users')
        //   .doc( auth.currentUser.email )
        //   .collection('gardens')
        //   .doc ( this.docname );
        //
        // this.garden = gardenRef;

        // gardenRef
        //   .set(
        //     { name: this.gardenname },
        //     { merge: true } // probably can be removed
        //   );
      },
      connect: function () {
        // array of existing controllers
        let ctrArr = this.gardens[this.selectedGarden].controllers;
        // check what garden the page is on & length of controllers array in that garden
        let controllerCount = ctrArr.length;

        let noControllersYet =
          // if there's only one controller
          (controllerCount === 1
          // and if that controlelr doesn't have a name
          && !ctrArr[0].name) ?
          true : false;

        // if no controllers yet, clear the placeholder in the controllers array.
        if (noControllersYet)
          ctrArr = [];

        // Set the number of the next controller
        let numOfNextController = noControllersYet ? 1 : controllerCount + 1;


        let controllerId = "controller_";
        controllerId += (numOfNextController < 10) ? "0" + numOfNextController
          : numOfNextController;

        let controllerName = "Controller " + numOfNextController;

        console.log(`Adding controller with id ${controllerId} & ${controllerName}`);

        ctrArr.push({
          id: controllerId,
          name: controllerName,
          valves: [
            { id: "valve_01",
              name: "Tomato box"
            }, {
              id: "valve_02",
              name: "Cucumber box"
            }, {
              id: "valve_03",
              name: "Blueberry bush"
            }, {
              id: "valve_04",
              name: "McIntosh apple tree"
            }, {
              id: "valve_05",
              name: "The rest of the garden"
            }
          ]
        });

        db
          .collection("users").doc(auth.currentUser.email)
          .collection("gardens").doc(this.gardens[this.selectedGarden].id)
          .set({
            controllers: ctrArr
          }, { merge: true });
      },
      inspectValues: function() {
        console.log('gardens is ')
        console.log(this.gardens)
        console.log(`and selectedGarden is ${ this.selectedGarden }`)
      },
      capitalize (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      updateName () {
        //update name in database
      },
      addNewValve (name) {
        // this.valves.push(name)
      }
    },
    data () {
      return {
        gardens: [],
        openSide: false,
        weather: {},
        selectedGarden: 0,
        currentUser: auth.currentUser.email
        // location: ''
      }
    },
    computed: {
      controllers: function () {
        return this.gardens[this.selectedGarden].controllers;
      },
      // valves: function () {
      //   return this.gardens[this.selectedGarden].controllers[index].valves;
      // },
    },
        // Valid options for source are 'server', 'cache', or
        // 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
        // for more information.
        // var getOptions = {
        //     source: 'cache'
        // };

        // Get a document, forcing the SDK to fetch from the offline cache.
        // docRef.get(getOptions).then(function(doc) {
    firestore: function () {
      return {
        gardens: db.collection('users')
          .doc( auth.currentUser.email )
          .collection( 'gardens' ),
      }
    },
    // watch: function () {
    //   // https://vuejs.org/v2/guide/computed.html#Computed-vs-Watched-Property
    //   // https://github.com/yuche/vue-strap/issues/291
    //   selectedGarden: function () {
    //     this.first();
    //   }
    // },
    created: function () {
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
  .ons-carousel-item {
    padding: 20px;
    border-bottom: 1px solid rgba(41,24,125, 0.6)
  }
</style>
