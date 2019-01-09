<template>
  <div>
    <div>
      <label for="gardenNaming">Garden Name: </label>
    </div>
    <v-ons-input v-model="gardenname" id="gardenNaming"></v-ons-input>
    <div>
      <v-ons-button @click="updateName">OK</v-ons-button>
    </div>

    <!-- use a v-if to make this conditionally display, only if user makes any changes -->
    <div>Your garden name has been updated to {{ gardenname }}</div>


  </div>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'
// console.log("the slug is " + this.$route.params);
export default {
  name: 'EditGarden',
  methods: {
    updateName () {
      // console.log(this.$route.params.id);
      console.log('query is working: ' + this.name);
      // let gardenRef = db.collection('users')
      //   .doc( auth.currentUser.email )
      //   .collection('gardens')
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
  // firestore () {
  //   return {
  //     gardenname: db.collection('users')
  //     .doc( auth.currentUser.email )
  //     .collection('gardens')
  //     .where('slug', '==', this.$route.params.id.id).get().then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         // console.log(doc.id, ' => ', doc.data())
  //         this.gardenname = doc.data().name
  //       })
  //     })
  //   }
  // }
}
</script>

<style>
.text-input {
  text-align: center;
}
</style>
