<template>
  <div class="home">
    <GardenList />
    <v-ons-button @click="logout">Logout</v-ons-button>
  </div>
</template>

<script>
import firebase from 'firebase';
import GardenList from '@/components/GardenList.vue'

export default {
  name: 'home',
  components: {
    GardenList
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style>

  v-ons-button {
    margin-top: 10px;
  }
</style>
