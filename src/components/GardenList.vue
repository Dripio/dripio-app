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
        console.log("attempting to add garden...")

        // let numOfGardens = gardens.length;

        db.collection('users')
          .doc( auth.currentUser.email )
          .collection('gardens')
          .doc( "good Garden" )
          .set({
            name: "Extra Garden"
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
</style>
