<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button @click="$router.go(-1)">Overview</v-ons-back-button>
      </div>
      <div class="center">Garden Settings</div>
    </v-ons-toolbar>
    <div class="margin-top">
      <label for="gardenNaming">Garden Name: </label>
    </div>
    <v-ons-input v-model="gardenname" id="gardenNaming"></v-ons-input>
    <div>
      <v-ons-button @click="updateName">Update Garden Name</v-ons-button>
    </div>

    <!-- use a v-if to make this conditionally display, only if user makes any changes -->
    <div>Your garden name has been updated to {{ gardenname }}</div>


  </v-ons-page>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'
// console.log("the slug is " + this.$route.params);
export default {
  name: 'EditGarden',
  methods: {
    updateName () {
      let gardenRef = db.collection('users')
        .doc( auth.currentUser.email )
        .collection('gardens')
        .doc ( this.docname )
        .set(
          { name: this.gardenname },
          { merge: true }
        );
      //   .where('slug', '==', this.$route.params.id).get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       // console.log(doc.id, ' => ', doc.data())
      //       this.gardenname = doc.data().name
      //     })
      //   });
      //
      //   console.log(gardenRef);

        // gardenRef.set({
        //   name: "hellooooo"
        // }, { merge: true })
      // console.log(gardenRef.name);


      // .get()
      // .then(function(doc) {
      //   doc.set({ name: this.gardenname })
      // })
    }
  },
  data() {
    return {
      gardenname: 'Garden 1', //default name
      docname: 'garden_01' //default docname
    }
  },
  created () {
    if (this.$route.query.name) {
      this.gardenname = this.$route.query.name;
    }
    if (this.$route.query.docname) {
      this.docname = this.$route.query.docname;
    }
  }
}
</script>

<style>
  .text-input {
    text-align: center;
  }
  .margin-top {
    margin-top: 40px;
  }
</style>
