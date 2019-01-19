<template>
  <div class="preAuth">
    <img alt="Vue logo" src="../assets/logo.svg">
    <h3>Sign up</h3>

    <v-ons-list class="email-form">
      <v-ons-list-item modifier="nodivider">
        <div class="left">
          <!-- make icon be white again, once input can be white:  style="color: white" -->
          <v-ons-icon icon="ion-email, material:md-email" size="28px, material:20px"></v-ons-icon>
        </div>
        <div class="center">
          <!-- add back style="color: white" to this input once you can get that to work -->
          <v-ons-input modifier="underbar" type="email" v-model="email" placeholder="email" ></v-ons-input>
        </div>
      </v-ons-list-item>

      <v-ons-list-item modifier="nodivider">
        <div class="left">
          <!-- make icon be white again, once input can be white:  style="color: white" -->
          <v-ons-icon icon="md-lock" size="28px, material:20px"></v-ons-icon>
        </div>
        <div class="center">
          <!-- add back style="color: white" to this input once you can get that to work -->
          <v-ons-input modifier="underbar" type="password" v-model="password" placeholder="password"></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-button class="button-margin submit-btn" @click="signUp">SIGNUP</v-ons-button>

    <div class="redirect-btns">
      <p>or go back to <router-link to="/login">login</router-link>.</p>
    </div>

  </div>
</template>

<script>
  import firebase from 'firebase';
  import '../style/login.css'

  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('Home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>
