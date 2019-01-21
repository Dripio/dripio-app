<template>
  <ons-page>
    <v-ons-toolbar style="background: #29187D; height: 100px;">
      <div class="left">
      </div>
      <div class="toolbar__center" style="height: 100px; display: flex; justify-content: center">
        <img alt="Vue logo" class="login-logo-x-small login-logo" src="../assets/logo.svg">
      </div>
    </v-ons-toolbar>
    <!-- put the logout button in the side menu -->

    <ons-scroller style="width: 100%;">
      <div style="padding-top: 50px">
        <v-ons-button @click="addGarden" >Add Garden</v-ons-button>
      </div>
      <v-ons-list-header class="lg-margin-top">Gardens</v-ons-list-header>
      <v-ons-list>
        <v-ons-list-item v-for="garden in gardens" @click="editGarden(garden)">
            <!-- id: garden.slug -->
            <div class="center">{{ garden.name }} </div>
        </v-ons-list-item>
      </v-ons-list>
    </ons-scroller>
    <v-ons-button @click="logout">Logout</v-ons-button>
  </ons-page>
</template>

<script>

  // import database and info on who's logged in
  import { db } from '../main'
  import { auth } from '../main'
  import firebase from 'firebase'

  export default {
    name: 'GardenList',
    props: {
      // gardens: Array
    },
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
      },
      editGarden: function(gardenButton) {
        this.$router.push({
          name: 'EditGarden',
          params: { id: gardenButton.slug },//slug and this params can maybe be removed everywhere
          query: {
            docname: gardenButton.id,
            name: gardenButton.name} })
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
      }
    },
    data () {
      return {
        gardens: []
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
  .button {
    margin: 10px 0;
  }
  .page__background {
    /* background-color: #29187D; */
  }

  /* make sure this page is scrollable, in case the user adds lots of gardens */
</style>
