<template>
  <!-- <div id="login"> -->
  <div ref="container " class="container q-pa-xl">
    <!-- <q-scroll-area style="height: 100%; max-width: 300px;"> -->
    <!-- Register user -->
    <form id="form q-ma-lg" @submit.prevent class="q-pt-lg">
      <q-card-section class="q-pl-none">
        <div class="text-h6">
          Register User
        </div>
      </q-card-section>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="form-group">
        <q-input
          outlined
          type="email"
          label="Email"
          placeholder="you@gmail.com"
          v-model.trim="registerForm.email"
        />
      </div>
      <div class="q-mt-lg">
        <q-input
          outlined
          type="text"
          label="Name"
          v-model.trim="registerForm.name"
        />
      </div>
      <div class="q-mt-lg">
        <q-input
          v-model.trim="registerForm.password"
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
      </div>
      <div class="q-mt-lg">
        <q-input
          v-model.trim="registerForm.cnfPassword"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Confirm Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <!-- <q-select
          class="q-mt-lg"
          filled
          v-model="registerForm.permissions"
          multiple
          :options="permissions"
          label="Permissions"
          style="width: 250px"
        /> -->

        <q-card-section class=" q-pl-none">
          <div class="text-subtitle1">Permissions</div>
          <div class="">
            <div
              class="col-4 q-mt-md"
              v-for="(permission, index) in Object.keys(permissions)"
              :key="index"
              style="text-transform: capitalize;
              "
            >
              <q-separator vertical class="q-mx-lg q-ml-xl" />
              <q-checkbox
                @input="select(permission)"
                v-model="selectAll"
                :val="permission"
                label=""
                color="teal"
              />
              <!-- {{ selectAll }} -->
              <span class="text-subtitle2">{{ permission }}</span>

              <q-option-group
                class="q-pl-lg"
                :options="permissions[permission]"
                label="Permissions"
                type="checkbox"
                v-model="registerForm.permissions"
              />

              <q-separator vertical inset class="q-mx-lg q-ml-xl" />
            </div>
            <!-- <q-separator vertical inset class="q-mx-lg" /> -->
          </div>
        </q-card-section>
        {{ registerForm.permissions }}
      </div>

      <div class="controls">
        <div class="buttons">
          <q-btn
            @click="signUp"
            color="primary"
            label="Register"
            no-caps
            padding="0 0"
          />
        </div>
      </div>
    </form>

    <!-- Forgot password dialog -->
    <!-- <reset-password
      v-if="showPasswordReset"
      @close="togglePasswordReset"
    ></reset-password> -->
    <!-- </q-scroll-area> -->
  </div>
  <!-- </div> -->
</template>
<script>
// import Notify from '@/components/Notify.vue';
// import Vue from 'vue';
import { mapActions } from 'vuex';
import _ from 'lodash';

export default {
  data() {
    return {
      registerForm: {
        email: '',
        name: '',
        password: '',
        cnfPassword: '',
        permissions: [],
      },

      permissions: [
        { label: 'Read', value: '11' },
        { label: 'Write', value: '10' },
      ],

      selectAll: [],

      showLogin: true,
      error: '',
      showPasswordReset: false,

      isPwd: true,
      // url: process.env.API_URL,
      users: [],
    };
  },

  methods: {
    ...mapActions('userStore', ['registerUser']),

    async getPermissions() {
      let groups = [];
      const url = `${process.env.API_URL}/permission/get-all-permission`;
      // console.log(url);
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data.response);
        this.permissions = [];
        response.data.response.forEach(res => {
          this.permissions.push(res);
        });
        this.permissions = response.data.response.map(res => {
          if (!Object.keys(groups).includes(res.group_by)) {
            groups[res.group_by] = [
              {
                value: res.id,
                code: res.code,
                label: res.string,
                group_by: res.group_by,
              },
            ];
          } else {
            groups[res.group_by].push({
              value: res.id,
              code: res.code,
              label: res.string,
              group_by: res.group_by,
            });
          }

          return {
            value: res.id,
            code: res.code,
            group_by: res.group_by,
            label: res.string,
          };
        });

        // console.log(groups);
        this.permissions = groups;
        // Object.keys(groups).forEach(group => {
        //   this.selectAll.push(group);
        // });
        // console.log(this.selectAll);
      } catch (err) {
        console.log(err.message);
      }
    },

    async signUp() {
      if (this.registerForm.password !== this.registerForm.cnfPassword)
        return this.$q.notify({
          type: 'negative',
          message: `Password doesn't match`,
        });

      const permissions = [];
      // this.registerForm.permissions.forEach(res => {
      //   permissions.push(res.id);
      // });

      let response = await this.registerUser({
        email: this.registerForm.email,
        name: this.registerForm.name,
        password: this.registerForm.password,
        permission: this.registerForm.permissions,
      });
      if (response !== '')
        this.$q.notify({
          type: 'negative',
          message: `${response}`,
        });
      else
        this.$q.notify({
          type: 'positive',
          message: `User Created Successfully`,
        });
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

    select(val, evt) {
      console.log(this.selectAll);

      if (!this.selectAll.some(sel => sel == val)) {
        console.log('selectAll contains group');
        this.permissions[val].forEach(permission => {
          // this.registerForm.permissions.forEach(per => {if(permission.value == per){
          // _.remove(this.registerForm.permissions, per => {
          //   return permission.value == per;
          // });
          // }} )

          _.pull(this.registerForm.permissions, permission.value);
        });
      } else {
        console.log('selectAll does not contain group');

        this.permissions[val].forEach(permission => {
          // this.registerForm.permissions.forEach(per => {if(permission.value == per){
          // _.remove(this.registerForm.permissions, per => {
          //   return permission.value == per;
          // });
          // }} )

          this.registerForm.permissions.push(permission.value);
        });
      }

      console.log(this.registerForm.permissions);
    },
  },

  components: {},

  async mounted() {
    this.getPermissions();
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  box-sizing: border-box;
}
.container {
  // height: 100vh;
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
  flex-basis: 50%;
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
