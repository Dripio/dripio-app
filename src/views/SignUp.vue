<template>
  <div class="sign-up">
    <p>Let's create a new account!</p>
    <v-ons-input type="email" v-model="email" placeholder="Email"></v-ons-input><br>
    <v-ons-input type="password" v-model="password" placeholder="Password"></v-ons-input><br>
    <v-ons-button class="button-margin" @click="signUp">Sign Up</v-ons-button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
  import firebase from 'firebase';

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

<style scoped>
  .button-margin {
    margin-top: 40px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
