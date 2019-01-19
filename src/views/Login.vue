<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.svg">
    <h3>WELCOME</h3>
    <v-ons-list id="login-form">
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

    <v-ons-button id="login-btn" class="button-margin" @click="login">LOGIN</v-ons-button>

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
    display: flex;
    flex-direction: column;
    align-items: center;
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
  #login-btn {
    background: linear-gradient(to right, rgb(113, 40, 244), rgb(127, 61, 249), rgb(144, 86, 255), rgb(127, 61, 249), rgb(113, 40, 244));
    width: 200px;
    border-radius: 8px;
  }
  #login-form {
    /* background: transparent; */
    width: 275px;
    border-radius: 8px;
  }
  v-ons-input {
    color: white;
  }

</style>
