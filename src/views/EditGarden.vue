<template>
  <div>
    <div>
    <label for="gardenNaming">Garden Name: </label>
  </div>
    <v-ons-input v-model="gardenname" id="gardenNaming"></v-ons-input>
  </div>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'
// console.log("the slug is " + this.$route.params);
export default {
  name: 'EditGarden',
  methods: {

  },
  data() {
    return {
      gardenname: ''
    }
  },
  firestore () {

    return {
      gardenname: db.collection('users')
      .doc( auth.currentUser.email )
      .collection('gardens')
      .where('slug', '==', this.$route.params.id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data())
          this.gardenname = doc.data().name
        })
      })
    }
  }
}
</script>

<style>
.text-input {
  text-align: center;
}
</style>
