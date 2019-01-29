<template id="main">
  <v-ons-splitter>
    <v-ons-splitter-content>
      <template id="editGarden">
        <v-ons-page>
          <!-- top bar -->
          <v-ons-toolbar style="background: #29187D; height: 100px;">

            <!-- Empty div to center the other elements in top bar-->
            <div class="left">
              <div style="width: 16px;"></div>
            </div>

            <!-- menu button to open side menu -->
            <div class="right">
              <v-ons-toolbar-button
                @click="openSide = true" style="height: 100px"
                class="button white-text flex-align-ctr">
                <v-ons-icon icon="ion-navicon, material:md-menu" style="font-size:36px">
                  </v-ons-icon>
              </v-ons-toolbar-button>
            </div>

            <!-- garden selector dropdown menu -->
            <div class="toolbar__center">
              <v-ons-select style="height: 2em" v-model="selectedGarden" @change="first">
                <option v-for="(garden, index) in gardens" v-bind:value="index">
                  {{ garden.name }}
                </option>
              </v-ons-select>
            </div>
          </v-ons-toolbar>
          <!-- end of top bar -->

          <!-- weather bar. To-do: separate into a separate component -->
          <div class="weather">
            <p class="temperature">{{ this.weather.data.main.temp }}˚F</p>
            <p>{{ this.weather.data.weather[0].description }} </p>
            <div class="hr"></div>
            <!-- precipitation data is not available with the free tier of OpenWeather API-->
            <!-- another reason to get weather data from native code -->
            <p class="weather-details">Humidity: {{ this.weather.data.main.humidity }}%</p>
          </div>

          <!-- Carousel (horizontally sliding list) of available controllers & valves -->
          <v-ons-carousel swipeable auto-scroll overscrollable
            v-bind:index.sync="index" id="carousel">

            <!-- If no controllers added yet, show 'Add controller' button -->
            <v-ons-carousel-item v-if="controllers.length === 1 && !controllers[0].name">
              <!-- Code for this div is repeated below -->
              <!-- so turn this div into a reusable component -->
              <v-ons-button @click="connect" modifier="large" class="big-lightpink-btn">
                Add a controller
              </v-ons-button>
            </v-ons-carousel-item>

            <!-- controllers -->
            <v-ons-carousel-item v-else v-for="(controller, i) in controllers">
              <div class="carousel-controller">

                <!-- carousel back button & svg graphic of a dripio controller -->
                <div class="left flex-align-ctr">
                  <img height="50px" src="../style/Controller.svg">
                  <v-ons-toolbar-button @click="prev()" v-if="i > 0" class="flex-align-ctr">
                    <v-ons-icon icon="md-chevron-left" style="padding: 5px"></v-ons-icon>
                  </v-ons-toolbar-button></div>
                  <!-- end of back button -->

                <div class="controller-name">{{ controller.name }}</div>

                <div class="right flex-align-ctr">
                  <!-- next controller button -->
                  <v-ons-toolbar-button @click="next()" v-if="i<end" class="flex-align-ctr">
                    <v-ons-icon icon="md-chevron-right" style="padding: 5px"></v-ons-icon>
                  </v-ons-toolbar-button>

                  <!-- add controller button -->
                  <v-ons-button v-else>
                    <v-ons-icon @click="$ons.notification
                      .confirm('Would you like to add another controller?')
                      .then((response) => connect())" icon="md-plus"></v-ons-icon>
                  </v-ons-button></div></div>
            <!-- end of controllers (first div in carousel)-->

            <!-- valves (second div in carousel) -->
              <div>
                <v-ons-list>
                  <v-ons-list-item tappable v-for="(valve, index) in controller.valves">
                    <label>{{ valve.name }}</label>
                    <!-- toggle on/off -->
                    <div class="right">
                      <!-- font-size 1 to hide the index numbers -->
                      <v-ons-switch v-model="valve.checked" @change="updateOnOff"
                        style="font-size: 1px">
                        {{ index }} </v-ons-switch></div>
                    <!-- end of toggle -->
                  </v-ons-list-item>
                </v-ons-list>
              </div>
              <!-- end of valves (second div in carousel)-->
            </v-ons-carousel-item>
          </v-ons-carousel>
          <!-- End of controller/valve carousel -->
        </v-ons-page>
      </template>
    </v-ons-splitter-content>

    <!-- Side menu: log out, add garden, see username, policy, terms, website -->
    <v-ons-splitter-side
      swipeable width="150px" collapse="" side="right" :open.sync="openSide">
      <v-ons-page>
        <v-ons-list>
          <!-- welcome message -->
          <v-ons-list-item> Welcome, {{ username }}!</v-ons-list-item>

          <!-- add garden button -->
          <v-ons-list-item @click="addGarden"> Add Garden</v-ons-list-item>

          <!-- logout button -->
          <v-ons-list-item tappable @click="logout">Logout</v-ons-list-item>
        </v-ons-list>
      </v-ons-page>
    </v-ons-splitter-side>
    <!-- End of side menu -->

  </v-ons-splitter>
</template>

<script>
  // import database and info on who's logged in
  import { db, auth } from '../main'
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
      updateOnOff (event) {
        // array of existing controllers
        let ctrArr = this.gardens[this.selectedGarden].controllers;
        // index of toggled valve
        let valveIndex = +event.target.innerText;
        // is toggle off or on?
        let valveOn = event.value;

        console.log(`valve ${valveIndex} toggled to ${valveOn}`);

        ctrArr[this.index].valves[valveIndex].checked = valveOn;

        console.log(ctrArr);

        // let clickedValveOn = ctrArr[this.index].valves

        // if valve is on, print that , if not, print that
        // ... test that a bit and write observations

        // if valve is on, change it's value to off
        // and include that in the db.set() operation.

          db
            .collection("users").doc(auth.currentUser.email)
            .collection("gardens").doc(this.selectedGardenId)
            .set({
              controllers: ctrArr
            }, { merge: true })
            .then(()=>{
              console.log(`inside the success of updateOnOff:`)
              console.log(ctrArr)
            })
            .catch((err)=>console.log(`it didn't work: ${err}`));
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
              name: "Tomato box",
              checked: false
            }, {
              id: "valve_02",
              name: "Cucumber box",
              checked: false
            }, {
              id: "valve_03",
              name: "Blueberry bush",
              checked: false
            }, {
              id: "valve_04",
              name: "McIntosh apple tree",
              checked: false
            }, {
              id: "valve_05",
              name: "The rest of the garden",
              checked: false
            }
          ]
        });

        db
          .collection("users").doc(auth.currentUser.email)
          .collection("gardens").doc(this.selectedGardenId)
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
        index: 0
        // location: ''
      }
    },
    computed: {
      controllers: function () {
        return this.gardens[this.selectedGarden].controllers;
      },
      end: function () {
        return this.controllers.length - 1;
      },
      selectedGardenId: function () {
        return this.gardens[this.selectedGarden].id;
      },
      currentUser: function () {
        return auth.currentUser.email;
      },
      username: function () {
        let i = this.currentUser.search(/@/);
        return this.currentUser.slice(0, i);
      },
      linkToCurrentGarden: function () {
        return `users/${auth.currentUser.email}/gardens/${this.selectedGardenId}`;
      }
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
      console.log('firestore function was called');
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
            alert(`API limit for mock-up app reached.
              Weather information will be inaccurate. Please check back later.`)
          })
      }
      this.weather = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
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
