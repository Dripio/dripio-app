<template>
  <div class="login">
    <h3>Sign In</h3>
    <v-ons-input type="email" v-model="email" placeholder="Email"></v-ons-input></br>
    <v-ons-input type="password" v-model="password" placeholder="Password"></v-ons-input><br>
    <v-ons-button class="button-margin" @click="login">Connection</v-ons-button>
    <p>You don't have an account? You can <router-link to="/signup">create one</router-link>.</p>
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
    text-decoration: underline;
    cursor: pointer;
  }

</style>
