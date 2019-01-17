<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.svg">
    <h3>Sign In</h3>
    <v-ons-input type="email" v-model="email" placeholder="Email"></v-ons-input></br>
    <v-ons-input type="password" v-model="password" placeholder="Password"></v-ons-input><br>
    <v-ons-button class="button-margin" @click="loginX">Connection</v-ons-button>
    <v-ons-button @click="callAxios">Test button</v-ons-button>
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
        password: '',
        token: ''
      }
    },
    methods: {
      loginX: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('Home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      },
      login: function (cb) {
        console.log('step 2');
        axios.post('https://dripio.com/api/sessions', {
            email: "this.email",
            password: "this.password"
          })
          .then(function (response) {
            console.log('step 3');
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
        },
      get_controllers_data: function (cb) {
        console.log('step 4');
        axios.get('https://dripio.com/api/controllers', {
            headers: {
              "Authorization": `Bearer ${this.token}`
            }
          })
          .then(function (response) {
            console.log('step 5');
            console.log("get_controllers_data success");
            console.log(response.data);

            cb()
          })
          .catch(function (error) {
            console.log("get_controllers_data error");
            console.log(error.data);

            cb()
          });
      },
      callAxios: function () {
        const get_data = this.get_controllers_data;
        console.log('step 1');
        this.login(function(){
          get_data(function(){
            console.log('step 6');
          })
        })
      }
    }
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
