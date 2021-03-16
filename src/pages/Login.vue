<template>
  <!-- <div id="login"> -->
  <div ref="container" class="container">
    <form id="form" @submit.prevent class="q-pt-lg">
      <div v-if="error" class="error">{{ error }}</div>
      <div class="form-group">
        <!-- <label for="email">Email</label> -->
        <!-- <input type="text" name="email"  /> -->
        <q-input
          outlined
          type="email"
          label="Email"
          placeholder="you@gmail.com"
          v-model.trim="loginForm.email"
        />
      </div>
      <div class="q-mt-lg">
        <!-- <label for="password">Password</label> -->
        <!-- <input type="password" name="password" class="password" /> -->
        <q-input
          v-model.trim="loginForm.password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <!-- <div @click="togglePassword" class="input-icon">$</div> -->
      </div>
      <div class="q-mt-lg">
        <div class="row justify-between">
          <q-btn
            @click="showPasswordReset = true"
            flat
            style="color: #108940"
            label="Forgot Password?"
            class="q-pl-0"
            no-caps
            padding="0 0"
          />
          <!-- <button class="secondary" @click="toggleLogin">Sign UP</button> -->
          <!-- <button @click="login">Sign IN</button> -->
          <q-btn @click="signIn" color="primary" label="Log IN" no-caps />
        </div>
      </div>
    </form>

    <!-- Forgot password dialog -->
    <!-- <reset-password
      v-if="showPasswordReset"
      @close="togglePasswordReset"
    ></reset-password> -->

    <q-dialog v-model="showPasswordReset" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Reset Password</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model.trim="loginForm.email"
            autofocus
            type="email"
            label="Email Address"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model.trim="loginForm.password"
            autofocus
            type="email"
            label="Password"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" no-caps v-close-popup />
          <q-btn @click="resetPassword" flat label="Reset" no-caps />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <!-- </div> -->
</template>
<script>
// import Notify from '@/components/Notify.vue';
// import Vue from 'vue';
import jwt_decode from 'jwt-decode';
import { QSpinnerClock } from 'quasar';

import { mapActions } from 'vuex';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },

      showLogin: true,
      error: '',
      showPasswordReset: false,

      isPwd: true,
      // url: process.env.API_URL,
    };
  },

  methods: {
    ...mapActions('userStore', ['login']),
    ...mapActions('app', ['saveLog']),

    toggleLogin() {
      this.showLogin = !this.showLogin;
    },
    async signIn() {
      if (!this.loginForm.email && !this.loginForm.password)
        this.$q.notify({
          type: 'negative',
          message: `Please enter details`,
        });
      this.$q.loading.show({
        spinner: QSpinnerClock,
        delay: 400,
        message: 'Loging in',
        spinnerColor: 'teal-1',
      });
      let response = await this.login({
        email: this.loginForm.email,
        password: this.loginForm.password,
      });

      console.log(response);

      const id = jwt_decode(localStorage.getItem('token')).id;
      console.log('userid ', id);

      if (response == '') {
        const log = {
          to: id,
          from: id,
          type: 'user',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Logged In`,
        };

        await this.saveLog(log);

        this.$q.notify({
          type: 'positive',
          message: `Logged In`,
        });

        this.$q.loading.hide();

        this.$router.push('/');
      } else {
        this.$q.loading.hide();
        this.$q.notify({
          type: 'negative',
          message: `${response}`,
        });
      }
    },

    togglePasswordReset() {
      console.log(this.showPasswordReset);
      this.showPasswordReset = !this.showPasswordReset;
      // this.success = false;
      // this.error = '';
    },

    async resetPassword() {
      this.$q.loading.show({
        spinner: QSpinnerClock,
        delay: 400,
        message: 'Resetting password',
        spinnerColor: 'teal-1',
      });
      const url = `${process.env.API_URL}/user/forget-password`;
      try {
        const response = await this.$axios.post(url, {
          email: this.loginForm.email,
          password: this.loginForm.password,
        });

        console.log(response.data);

        this.$q.loading.hide();

        this.showPasswordReset = false;

        this.$q.notify({
          type: 'positive',
          message: `Password reset`,
        });
      } catch (err) {
        console.log(err.message);
        this.$q.loading.hide();

        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },
  },

  components: {
    // ResetPassword: () => import('@/components/ResetPassword.vue'),
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
* {
  // margin: 0;
  box-sizing: border-box;
}
.container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(247, 249, 250, 0.98);
}

.error {
  font-size: 12px;
  color: orangered;
  margin-bottom: 10px;
}
form {
  flex-basis: 30%;
  padding: 20px;
  border: 1px solid rgba(233, 230, 230, 0.788);
  border-radius: 5px;
  background-color: rgba(251, 251, 251, 0.79);
  box-shadow: 0 10px 34px #9a9999c2;

  .form-group {
    position: relative;
    label,
    input {
      display: block;
      margin-bottom: 10px;
    }
  }
}

.controls {
  a {
    text-decoration: none;
    font-size: 12px;
    border-bottom: 1px solid greenyellow;
    align-self: start;
  }

  .buttons {
    display: flex;
    margin-top: 15px;
    justify-content: flex-end;

    button {
      // margin-top: 10px;

      /* float: right; */
      font-size: 14px;
      font-weight: 700;
      outline: none;
      border: none;
      background-color: rgb(86, 123, 243);
      color: #fff;
      padding: 5px 10px;
      border-radius: 3px;
      cursor: pointer;
    }

    button:last-child {
      margin-left: 10px;
    }

    .secondary {
      background-color: transparent;
      color: rgb(86, 123, 243);
    }
  }
}
</style>
