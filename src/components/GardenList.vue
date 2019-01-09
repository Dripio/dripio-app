<template>
  <div>
      <div v-for="garden in gardens">
        <!-- id: garden.slug -->
        <v-ons-button @click="editGarden(garden)">{{ garden.name }} </v-ons-button>
      </div>
      <v-ons-button @click="addGarden">Add Garden</v-ons-button>
    </div>
</template>

<script>

  // import database and info on who's logged in
  import { db } from '../main'
  import { auth } from '../main'

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
        console.log(gardenButton)
        this.$router.push({
          name: 'EditGarden',
          params: { id: gardenButton.slug },
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

  /* make sure this page is scrollable, in case the user adds lots of gardens */
</style>
