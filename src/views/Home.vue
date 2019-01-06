<template>
  <div class="home">
    <AddGarden msg="Welcome to Your Dripio App"/>
    <v-ons-button @click="logout">Logout</v-ons-button>
  </div>
</template>

<script>
import firebase from 'firebase';
// @ is an alias to /src
import AddGarden from '@/components/AddGarden.vue'

export default {
  name: 'home',
  components: {
    AddGarden
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
