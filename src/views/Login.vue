<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.svg">
    <h3>WELCOME</h3>
    <v-ons-input type="email" v-model="email" placeholder="email"></v-ons-input></br>
    <v-ons-input type="password" v-model="password" placeholder="password"></v-ons-input><br>
    <v-ons-button class="button-margin" @click="login">LOGIN</v-ons-button>
    <p><router-link to="/signup">New Member</router-link></p>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('Home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    },
  }
</script>

<style scoped>
  img {
    margin-top: 40px;
    height: 90px;
  }
  h3 {
    font-weight: 200;
    font-size: 2em;
    text-transform: uppercase;
    color: white;
  }
  .login {
    margin-top: 40px;
  }
  .button-margin {
    margin-top: 40px;
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }

</style>
