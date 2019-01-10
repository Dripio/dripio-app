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
    <v-ons-input v-model="gardenname"></v-ons-input>

    <!-- Later: use a v-if to make this conditionally display, only if user makes any changes -->
    <div class="margin-top">Your garden will be updated to {{ gardenname }} when you click the button.</div>
    <div>
      <v-ons-button @click="updateName">Update Garden Name</v-ons-button>
    </div>

    <div class="margin-top">
      <p>Connect to Dripio Controller</p>
      <v-ons-fab ripple @click="importedFunctionWrapper">
        <ons-icon
          icon="fa-wifi">
        </ons-icon>
      </v-ons-fab>
    </div>

  </v-ons-page>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'
import { checkConnection } from '../main'

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
    },
    importedFunctionWrapper () {
      checkConnection()
    }
  },
  data() {
    return {
      gardenname: 'Garden 1', //default name
      docname: 'garden_01', //default docname,
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
    margin: 50px 0px 10px;
  }
</style>
