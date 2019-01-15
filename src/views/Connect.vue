<template>
  <div>
    <h1 v-if="hideSettings">{{status}}</h1>
    <template v-else>
      <div>
        <v-ons-page v-if="hideValveSetup">
          <v-ons-toolbar>
            <div class="left">
              <v-ons-back-button @click="$router.go(-2)">Home</v-ons-back-button>
            </div>
            <div class="center">Controller Settings</div>
          </v-ons-toolbar>
          <div class="sm-margin-top">{{ $route.params.name }}</div>
          <div class="lg-margin-top">
            <label for="controllername">Controller Name</label>
          </div>
          <v-ons-input v-model="controllername" input-id="controllername"></v-ons-input>
          <v-ons-button>
            <ons-icon @click="updateName"
              icon="fa-check">
            </ons-icon>
          </v-ons-button>

          <div class="lg-margin-top">
            <v-ons-button>
              <ons-icon @click="addValve"
                icon="fa-plus">
              </ons-icon>
            </v-ons-button>
          </div>

        </v-ons-page>
        <div v-else>
          <v-ons-button @click="submitValve">OK</v-ons-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'

export default {
  name: 'Connect',
  data: () => {
    return {
      status: "Connecting...",
      hideSettings: true,
      hideValveSetup: true,
      controllername: 'Controller 1',
      // controllername: something from database via router query
    }
  },
  methods: {
    updateName () {
      //update name in database
    },
    addValve() {
      this.hideValveSetup = false;
    },
    submitValve() {
      this.hideValveSetup = true;
    }
  },
  created(){
    // console.log(this.$route.params.garden);
    // console.log(this.$route.query.garden)
    // console.log('something')

  },
  mounted(){
    setTimeout(() => {
      this.status = "Connected!"
    }, 3); //change to 3000
    setTimeout(() => {
      this.hideSettings = false
    }, 4); //change to 4000
  }
}
</script>
<style>
.text-input {
  text-align: center;
}
.sm-margin-top {
  margin: 10px 0px 10px;
}
.lg-margin-top {
  margin: 30px 0px 10px;
}
</style>
