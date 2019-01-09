<template>
  <div>
      <div v-for="garden in gardens">
        <v-ons-button>{{ garden.name }} </v-ons-button>
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
            name: defaultNameOfGarden
          });
          // .collection('gardens')
          // .add( { name: "Extra Garden!"} );

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
