<template>
  <div>
    <v-ons-input v-model="gardenname"></v-ons-input>
    coming soon...
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
      gardenname: this.$route.params.id
    }
  },
  // firestore () {
  //
  //   return {
  //     gardenname: //db.collection('users')
  //     // .doc( auth.currentUser.email )
  //     // .collection('gardens')
  //     // .where('slug', '==', this.$route.params.id).get().then((querySnapshot) => {
  //     //   querySnapshot.forEach((doc) => {
  //     //     console.log(doc.id, ' => ', doc.data())
  //     //     this.gardenname = doc.data().name
  //     //   })
  //     // })
  //   }
  // }
}
</script>

<style>
  v-ons-button {
    margin-top: 10px;
  }
</style>
