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
            @keyup.enter="prompt = false"
            type="email"
            label="Email Address"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" no-caps v-close-popup />
          <q-btn flat label="Reset" no-caps />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <!-- </div> -->
</template>
<script>
// import Notify from '@/components/Notify.vue';
import Vue from 'vue';
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
    // togglePassword() {
    //   let passwordField = document.querySelectorAll('.password');
    //   console.log(passwordField);
    //   passwordField.forEach(field => {
    //     console.log(typeof field);
    //     if (field.type == 'password') field.setAttribute('type', 'text');
    //     else field.setAttribute('type', 'password');
    //   });
    // },
    toggleLogin() {
      this.showLogin = !this.showLogin;
    },
    async signIn() {
      let response = await this.login({
        email: this.loginForm.email,
        password: this.loginForm.password,
      });

      console.log(response);
      if (response !== '')
        this.$q.notify({
          type: 'negative',
          message: `${response}`,
        });
      else
        this.$q.notify({
          type: 'positive',
          message: `Logged In`,
        });
    },
    async signUp() {
      let response = await this.$store.dispatch('signUp', {
        email: this.registerForm.email,
        name: this.registerForm.name,
        password: this.registerForm.password,
      });
      if (response !== '') this.notify(response, 'red');
    },

    togglePasswordReset() {
      console.log(this.showPasswordReset);
      this.showPasswordReset = !this.showPasswordReset;
      // this.success = false;
      // this.error = '';
    },

    // notify(msg, color) {
    //   let ComponentClass = Vue.extend(Notify);
    //   let instance = new ComponentClass({
    //     propsData: {
    //       msg: msg,
    //       color: color,
    //     },
    //   });
    //   instance.$mount();

    //   this.$refs.container.appendChild(instance.$el);
    // },
  },

  components: {
    // ResetPassword: () => import('@/components/ResetPassword.vue'),
  },

  mounted() {},
};
</script>

<style lang="scss">
* {
  margin: 0;
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

    // input {
    //   outline: none;
    //   font-size: 14px;
    //   height: 40px;
    //   border: 1px solid rgba(187, 184, 184, 0.774);
    //   border-radius: 3px;
    //   // background-color: red;
    //   padding: 7px 10px;
    // }

    // .input-icon {
    //   position: absolute;
    //   bottom: 0;
    //   right: 0;
    //   width: 30px;
    //   height: 40px;
    //   padding: 10px;
    //   font-weight: 700;
    //   background-color: rgba(236, 243, 242, 0.842);
    //   border: 1px solid rgba(187, 184, 184, 0.774);
    //   border-top-right-radius: 3px;
    //   border-bottom-right-radius: 3px;
    //   text-align: center;
    //   color: black;
    //   cursor: pointer;

    //   &:hover {
    //     background-color: rgba(236, 243, 242, 0.952);
    //   }
    // }
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
    justify-content: end;

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
