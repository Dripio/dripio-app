<template>
  <div>
    <h1 v-if="hideSettings">{{status}}</h1>
    <template v-else>
        <v-ons-page>

          <v-ons-toolbar>
            <div class="center">Controller Settings</div>
            <div class="left">
              <v-ons-back-button @click="$router.go(-2)">Home</v-ons-back-button>
            </div>

          </v-ons-toolbar>

          <div class="sm-margin-top">{{ $route.params.name }}</div>
          <div class="lg-margin-top">
            <label for="controllername">Controller Name</label>
          </div>
          <v-ons-input v-model="controllername" input-id="controllername"></v-ons-input>
          <v-ons-button>
            <ons-icon @click="updateName"
              icon="ion-checkmark, material:check">
            </ons-icon>
          </v-ons-button>



          <v-ons-list-header class="lg-margin-top">Valves</v-ons-list-header>

          <!--ul tag is *required* around a v-for for functionality,
          and a v-ons-list tag is *preferred* around a v-ons-list-item for UI. -->
          <ul>
            <v-ons-list>
            <!--v-on:remove="valves.splice(index, 1)" can be added later-->
            <!-- v-on:click="$emit(\'remove\')" can be added later-->
            <v-ons-list-item tappable
              v-for="(valve, index) in valves"
              >
              <div class="center">
                {{ valve }}
              </div>
            </v-ons-list-item>
          </v-ons-list>
          </ul>
          <v-ons-button
            @click="$ons.notification.prompt('What\'s your valve\'s name?')
              .then((result)=>{
                addNewValve(result);
              })"
              >
              <ons-icon @click="updateName"
                icon="ion-ios-plus, material:md-plus" size="24px, material:16px">
              </ons-icon>
            </v-ons-button>

        </v-ons-page>
    </template>
  </div>
</template>

<script>
import { db } from '../main'
import { auth } from '../main'
import { Vue } from '../main'


export default {
  name: 'Connect',
  data: () => {
    return {
      status: "Connecting...",
      hideSettings: true,
      controllername: 'Controller 1',
      valves: [
      ]
    }
  },
  methods: {
    updateName () {
      //update name in database
    },
    addNewValve (name) {
      this.valves.push(name)
    }
  },
  mounted(){
    setTimeout(() => {
      this.status = "Connected!"
    }, 2200);
    setTimeout(() => {
      this.hideSettings = false
    }, 3000);
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
