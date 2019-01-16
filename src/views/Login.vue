<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.svg">
    <h3>Sign In</h3>
    <v-ons-input type="email" v-model="email" placeholder="Email"></v-ons-input></br>
    <v-ons-input type="password" v-model="password" placeholder="Password"></v-ons-input><br>
    <v-ons-button class="button-margin" @click="login">Connection</v-ons-button>
    <v-ons-button @click="testAxios"></v-ons-button>
    <p>You don't have an account? You can <router-link to="/signup">create one</router-link>.</p>
  </div>
</template>

<script>
  import firebase from 'firebase';
  import axios from 'axios';

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
      },
      testAxios: function() {
        var token = ""
        axios.post('https://dripio.com/api/sessions', {
          email: "this.email",
          password: "this.password",
          headers: {
            "Referer": ''
          }
        })
        .then(function (response) {
          console.log("login success");
          console.log(response.data.data.token);
          token = response.data.data.token

          cb()
        })
        .catch(function (error) {
          console.log("login error");
          console.log(error.data);

          cb()
        });

        axios.get('https://dripio.com/api/controllers', {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(function (response) {
          console.log("get_controllers_data success");
          console.log(response.data);

          cb()
        })
        .catch(function (error) {
          console.log("get_controllers_data error");
          console.log(error.data);

          cb()
        });
      }
    },
  }
</script>

<style scoped>
  img {
    margin-top: 40px;
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
    text-decoration: underline;
    cursor: pointer;
  }

</style>
