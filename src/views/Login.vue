<template>
  <div class="preAuth">
    <img class="login-logo login-logo-small" alt="Vue logo" src="../assets/logo.svg">
    <h3>WELCOME</h3>
    <v-ons-list class="email-form">
      <v-ons-list-item modifier="nodivider">
        <div class="left">
          <!-- make icon be white again, once input can be white:  style="color: white" -->
          <v-ons-icon icon="ion-ios-email, material:md-email" size="24px, material:16px"></v-ons-icon>
        </div>
        <div class="center">
          <!-- add back style="color: white" to this input once you can get that to work -->
          <v-ons-input modifier="underbar" type="email" v-model="email" placeholder="email"></v-ons-input>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="left">
          <!-- make icon be white again, once input can be white:  style="color: white" -->
          <v-ons-icon icon="ion-ios-locked, material:md-lock" class="text-input--material" size="24px, material:16px"></v-ons-icon>
        </div>
        <div class="center">
          <!-- add back style="color: white" to this input once you can get that to work -->
          <v-ons-input modifier="underbar" type="password" v-model="password" placeholder="password" float></v-ons-input>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-button class="button-margin submit-btn" @click="login">LOGIN</v-ons-button>

    <div class="redirect-btns">
      <p><router-link to="/signup">New Member</router-link></p>
      <p @click="resetPassword" tappable class="white-text">Forgot Password?</p>
    </div>

    <v-ons-alert-dialog modifier="rowfooter"
      :footer="{
        Ok: () => emailSentDialogIsVisible = false
      }"
      :visible.sync="emailSentDialogIsVisible"
    >
      Email sent. Please check your email to reset your password.
    </v-ons-alert-dialog>

    <v-ons-alert-dialog modifier="rowfooter"
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
  import '../style/login.css'

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
