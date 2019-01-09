<template>
  <div>
    <v-ons-input v-model="gardenname"></v-ons-input>
    coming soon...
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'EditGarden',
  methods: {

  },
  data() {
    return {
      gardenname: '',
    }
  },
  firestore () {
    return {
      // gardenName: db.collection('users')
      //   .doc( auth.currentUser.email )
      //   .collection('gardens')
      //   .doc('garden_01')
      //   .name;
    }
  }
}
</script>

<style>
  v-ons-button {
    margin-top: 10px;
  }
</style>
