<template>
  <div v-if="!loaded" class="container q-pa-xl">
    <form id="form q-ma-lg" @submit.prevent class="q-pt-lg">
      <q-card-section class="q-pl-none">
        <q-skeleton type="text" height="70px" width="200px"></q-skeleton>
      </q-card-section>

      <div class="row justify-between items-start">
        <div class="col-5 q-mt-lg">
          <div class="form-group">
            <q-skeleton type="QInput" height="50px"></q-skeleton>
          </div>

          <div class="q-mt-lg">
            <q-skeleton type="QInput" height="50px"></q-skeleton>
          </div>

          <div class="q-mt-lg">
            <q-skeleton type="QInput" height="50px"></q-skeleton>
          </div>

          <div class="q-mt-lg">
            <q-skeleton type="QInput" height="50px"></q-skeleton>
          </div>
        </div>

        <div class="col-6 q-mt-lg">
          <div class="form-group">
            <q-skeleton square height="600px"></q-skeleton>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div v-else class="container q-pa-xl">
    <!-- <q-scroll-area style="height: 100%; max-width: 300px;"> -->
    <!-- Register user -->
    <form id="form" @submit.prevent class="q-pa-xl">
      <q-card-section class="q-pl-none">
        <div class="text-h4">
          {{ id ? 'Update User' : 'Register User' }}
        </div>
      </q-card-section>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="row justify-between items-start">
        <div class="col-5 q-mt-lg">
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

          <div v-if="!id">
            <q-input
              class="q-mt-lg"
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

            <q-input
              class="q-mt-lg"
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
          </div>
        </div>

        <div v-if="permissions" class="col-6 ">
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
                <div class="row justfity-between items-center ">
                  <q-checkbox
                    class="col-2 self-start"
                    @input="select(permission)"
                    v-model="selectAll"
                    :val="permission"
                    label=""
                    color="teal"
                  />
                  <!-- {{ selectAll }} -->

                  <q-expansion-item
                    class="col-8 "
                    expand-icon-toggle
                    expand-separator
                    :label="permission"
                    header-class="text-subtitle2"
                  >
                    <q-card>
                      <q-card-section class="q-pa-none">
                        <q-option-group
                          class=""
                          :options="permissions[permission]"
                          label="Permissions"
                          type="checkbox"
                          v-model="registerForm.permissions"
                        />
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </div>

                <!-- <span class="text-subtitle2">{{ permission }}</span>

                <q-option-group
                  class="q-pl-lg"
                  :options="permissions[permission]"
                  label="Permissions"
                  type="checkbox"
                  v-model="registerForm.permissions"
                /> -->

                <q-separator vertical inset class="q-mx-lg q-ml-xl" />
              </div>
              <!-- <q-separator vertical inset class="q-mx-lg" /> -->
            </div>
          </q-card-section>
          {{ registerForm.permissions }}
        </div>
      </div>

      <div class="controls">
        <div class="buttons">
          <q-btn
            v-if="!id"
            @click="registerUser"
            color="primary"
            label="Register"
          />
          <q-btn v-else @click="updateUser" color="primary" label="Update" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import _ from 'lodash';
import jwt_decode from 'jwt-decode';
import { QSpinnerClock } from 'quasar';

export default {
  data() {
    return {
      loaded: false,
      id: null,
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
    // ...mapActions('userStore', ['registerUser']),
    ...mapActions('app', ['saveLog']),

    async getUserDetails() {
      this.loaded = false;
      const url = `${process.env.API_URL}/user/get-user-id/${this.id}`;

      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data.response);

        const user = response.data.response[0];

        console.log(this.permissions);

        // for (const per in this.permissions) {
        //   console.log(this.permissions[per]);
        //   if (user.permission.some(p => this.permissions[per].id == p))
        //     this.registerForm.permissions.push(this.permissions[per].id);
        // }

        this.registerForm.permissions = user.permission.map(per =>
          parseInt(per)
        );

        // this.permissions.forEach(per => {
        //   // console.log(per.id);
        //   if (user.permission.some(p => per.id == p))
        //     this.registerForm.permissions.push(per.id);
        // });
        this.registerForm.name = user.name;
        this.registerForm.email = user.email;

        this.loaded = true;
      } catch (err) {
        console.log(err.message);

        this.loaded = true;
      }
    },

    async getPermissions() {
      this.loaded = false;
      let groups = {};
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
        // if (this.id) await this.getUserDetails();

        // this.permissions =
        response.data.response.forEach(res => {
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

          // return {
          //   value: res.id,
          //   code: res.code,
          //   group_by: res.group_by,
          //   label: res.string,
          // };
        });
        this.permissions = groups;

        if (this.id) await this.getUserDetails();

        this.loaded = true;
      } catch (err) {
        console.log(err.message);
        this.loaded = true;
      }
    },

    async registerUser() {
      this.loaded = false;
      if (this.registerForm.password !== this.registerForm.cnfPassword)
        return this.$q.notify({
          type: 'negative',
          message: `Password doesn't match`,
        });

      this.$q.loading.show({
        spinner: QSpinnerClock,
        delay: 400,
        message: 'Creating User',
        spinnerColor: 'teal-1',
      });

      const url = `${process.env.API_URL}/user/create-user/`;

      try {
        let response = await this.$axios.post(
          url,
          {
            email: this.registerForm.email,
            name: this.registerForm.name,
            password: this.registerForm.password,
            permission: this.registerForm.permissions,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data.response);

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: this.id,
          type: 'user',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Created User <a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${response.data.response.insertId}">${
            this.registerForm.name
          }</a>`,
        };
        await this.saveLog(log);

        this.registerForm.email = '';
        this.registerForm.name = '';
        this.registerForm.password = '';
        this.registerForm.cnfPassword = '';
        this.registerForm.permissions = [];

        this.$q.loading.hide();

        this.$q.notify({
          type: 'positive',
          message: `User Added Successfully`,
        });
        this.loaded = true;
      } catch (err) {
        console.log(err.message);
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
        this.loaded = true;
      }

      // let response = await this.registerUser({
      //   email: this.registerForm.email,
      //   name: this.registerForm.name,
      //   password: this.registerForm.password,
      //   permission: this.registerForm.permissions,
      // });
      // if (response !== '')
      //   this.$q.notify({
      //     type: 'negative',
      //     message: `${response}`,
      //   });
      // else{
      //   const log = {
      //     from: id,
      //     to: id,
      //     type: 'course',
      //     message: `<a class="message-from" href="${
      //       window.location.href.split(window.location.pathname)[0]
      //     }/profile/${this.$store.state.userStore.userProfile.id}">${
      //       this.$store.state.userStore.userProfile.name
      //     }</a> Updated User <a class="message-from" href="${
      //       window.location.href.split(window.location.pathname)[0]
      //     }/profile/${this.id}">${this.registerForm.name}</a>`,
      //   };
      //   await this.saveLog(log);
      //   this.$q.notify({
      //     type: 'positive',
      //     message: `User Created Successfully`,
      //   });}
    },

    async updateUser() {
      this.loaded = false;

      this.$q.loading.show({
        spinner: QSpinnerClock,
        delay: 400,
        message: 'Updating User',
        spinnerColor: 'teal-1',
      });
      const url = `${process.env.API_URL}/user/update-user/${this.id}`;

      try {
        let response = await this.$axios.post(
          url,
          {
            name: this.registerForm.name,
            email: this.registerForm.email,
            permission: this.registerForm.permissions,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data);

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: this.id,
          type: 'user',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Updated User <a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.id}">${this.registerForm.name}</a>`,
        };
        await this.saveLog(log);

        this.registerForm.email = '';
        this.registerForm.name = '';

        this.registerForm.permissions = [];

        this.$q.loading.hide();

        this.$q.notify({
          type: 'positive',
          message: `User Updated Successfully`,
        });
        this.loaded = true;
      } catch (err) {
        console.log(err.message);
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
        this.loaded = true;
      }
    },

    select(val, evt) {
      console.log(this.permissions);

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

  selectPer(val) {
    console.log(val);
  },

  async mounted() {
    this.id = this.$route.params.id;
    console.log(this.id);
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
  flex-basis: 75%;
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
