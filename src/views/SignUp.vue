<template>
  <div class="preAuth">
    <img alt="Vue logo" class="login-logo login-logo-small" src="../assets/logo.svg">
    <h3>Sign up</h3>

    <v-ons-list class="email-form">

      <v-ons-list-item modifier="longdivider">
        <div class="left">
          <v-ons-icon style="color: rgba(232,222,255,0.7)" icon="ion-ios-email, material:md-email" size="24px, material:16px"></v-ons-icon>
        </div>
        <div class="center login-input">
          <v-ons-input type="email" v-model="email" placeholder="email">
          </v-ons-input>
        </div>
      </v-ons-list-item>

      <v-ons-list-item modifier="longdivider">
        <div class="left">
          <v-ons-icon style="color: rgba(232,222,255,0.7)" icon="ion-ios-locked, material:md-lock" class="text-input--material" size="24px, material:16px"></v-ons-icon>
        </div>
        <div class="center">
          <v-ons-input type="password" v-model="password" placeholder="password"></v-ons-input>
        </div>
      </v-ons-list-item>

      <v-ons-list-item></v-ons-list-item>
    </v-ons-list>

    <v-ons-button class="button-margin submit-btn" @click="signUp">SIGNUP</v-ons-button>

    <div class="redirect-btns">
      <p><router-link to="/login">or go back to login.</router-link></p>
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
