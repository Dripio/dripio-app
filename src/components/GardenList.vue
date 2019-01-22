<template id="main">
  <v-ons-splitter>

    <v-ons-splitter-side
      swipeable width="150px" collapse="" side="left"
      :open.sync="openSide">
      <v-ons-page>
        <v-ons-list>
          <v-ons-list-item @click="addGarden" class="button white-text">Add Garden</v-ons-list-item>
          <v-ons-list-item v-for="garden in gardens.slice().reverse()"
            tappable modifier="chevron"
            @click="editGarden(garden); openSide = false"
          >
            <div class="center">{{ garden.name }}</div>
          </v-ons-list-item>
          <v-ons-list-item tappable @click="logout" class="button white-text">Logout</v-ons-list-item>
        </v-ons-list>
      </v-ons-page>
    </v-ons-splitter-side>

    <v-ons-splitter-content>
      <template id="editGarden">
        <v-ons-page>
          <v-ons-toolbar style="background: #29187D; height: 100px;">
          <div class="left">
            <v-ons-back-button @click="openSide = true" style="height: 100px;" class="button white-text"></v-ons-back-button>
          </div>
          <div class="toolbar__center" style="height: 100px; display: flex; justify-content: center">
            <img alt="Vue logo" class="login-logo-x-small login-logo" src="../assets/logo.svg">
          </div>
          <div class="right">
            <div style="width: 16px;"></div>
          </div>
        </v-ons-toolbar>
          <div class="margin-top" style="padding-top: 70px">
            <v-ons-input class="gardenTitle" v-model="gardenname" @change="updateName"></v-ons-input>
          </div>


          <!-- Later: use a v-if to make this conditionally display, only if user makes any changes -->
          <!-- <div class="margin-top">Your garden will be updated to {{ gardenname }} when you click the button.</div>
          <div>
            <v-ons-button @click="updateName">Update Garden Name</v-ons-button>
          </div> -->
          <!-- <div>
            List of existing controllers, if any, goes here.
          </div> -->
          <v-ons-list-item v-for="controller in controllers"
            tappable

          >
            <div class="center">{{ controller }}</div>
          </v-ons-list-item>
          <div class="margin-top">
            <p>Add a Dripio Controller</p>
            <v-ons-fab ripple @click="connect" style="background: #29187D">
              <ons-icon
                icon="ion-wifi, material:wifi" class="white-text">
              </ons-icon>
            </v-ons-fab>
          </div>

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
      }
    },
    data () {
      return {
        gardens: [],
        controllers: [],
        openSide: false,
        gardenname: 'Garden 1', //default name
        docname: 'garden_01', //default docname,
        garden: {}
      }
    },
    firestore () {
      return {
        gardens: db.collection('users')
          .doc( auth.currentUser.email )
          .collection('gardens')
      }
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
