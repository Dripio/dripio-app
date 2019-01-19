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

    <div class="redirect-btns">
      <p><router-link to="/signup">New Member</router-link></p>
      <p @click="resetPassword" tappable>Forgot Password?</p>
    </div>

    <v-ons-alert-dialog modifier="rowfooter"
      :title="Sent"
      :footer="{
        Ok: () => emailSentDialogIsVisible = false
      }"
      :visible.sync="emailSentDialogIsVisible"
    >
      Please check your email to reset your password.
    </v-ons-alert-dialog>

    <v-ons-alert-dialog modifier="rowfooter"
      :title="Oops"
      :footer="{
        Ok: () => checkEmailDialogIsVisible = false
      }"
      :visible.sync="checkEmailDialogIsVisible"
    >
      Please make sure your email address is entered correctly or sign up as a new member.
    </v-ons-alert-dialog>

  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: '',
        emailSentDialogIsVisible: false,
        checkEmailDialogIsVisible: false
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

    resetPassword: function() {
      let that = this;

      firebase.auth().sendPasswordResetEmail(this.email).then(function() {
        that.emailSentDialogIsVisible = true;
        // $ons.notification.alert("Email sent")
      }).catch(function(error) {
        that.checkEmailDialogIsVisible = true;
        // $ons.notification.alert('Oops! Please check your email and try again or sign up as a new member.');
      });
    }
  }
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
    font-size: 1.2em;
    color: white;
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
  .redirect-btns {
    display: flex;
    width: 90%;
    justify-content: space-around;
  }

</style>
