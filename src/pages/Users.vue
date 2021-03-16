<template>
  <q-page class="q-mt-xl q-pa-lg row justify-center">
    <!-- Skeleton -->
    <div class="col-12 col-md-9 q-pa-md" v-if="!loaded">
      <div class="row justify-between items-center q-mb-lg">
        <q-skeleton class="col-9" type="QInput" height="35px" />
        <!-- <q-skeleton type="QBtn" /> -->
        <q-skeleton type="QBtn" />
      </div>
      <q-list bordered class=" row-reverse justify-between">
        <q-skeleton height="200px" square />
      </q-list>
    </div>

    <!-- end -->

    <!-- Real page -->
    <div v-else class="col-12 col-md-9">
      <div class="row justify-between items-center q-mb-lg q-gutter-lg">
        <q-input
          dense
          class="col-9"
          v-model="search"
          debounce="500"
          outlined
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <!-- <q-btn color="primary" label="Filter"></q-btn> -->
        <q-btn
          v-if="currentUserPermissions.includes('3')"
          color="primary"
          label="Add"
          :to="{ name: 'RegisterUser' }"
        ></q-btn>
      </div>
      <q-list bordered class=" row-reverse justify-between bg-grey-3">
        <div>
          <q-item clickable v-ripple class="text-bold">
            <q-item-section avatar>
              #
            </q-item-section>

            <q-item-section>Name</q-item-section>

            <!-- <q-item-section>Course Duration</q-item-section> -->

            <q-item-section>Email</q-item-section>

            <q-item-section class="text-center">Actions</q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div>
        <div v-for="(user, index) in filteredUsers" :key="index">
          <q-item>
            <q-item-section avatar>
              {{ index + 1 }}
            </q-item-section>

            <q-item-section>{{ user.Name }}</q-item-section>

            <!-- <q-item-section>{{ user.course_duration }}</q-item-section> -->

            <q-item-section>{{ user.email }}</q-item-section>

            <q-item-section class="text-center">
              <q-btn flat color="primary" icon="settings">
                <q-menu
                  transition-show="scale"
                  transition-hide="scale"
                  auto-close
                >
                  <q-list style="min-width: 100px">
                    <q-item
                      v-if="currentUserPermissions.includes('4')"
                      clickable
                      :to="{ name: 'RegisterUser', params: { id: user.id } }"
                    >
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <!-- <q-item clickable>
                      <q-item-section>Delete</q-item-section>
                    </q-item> -->
                    <q-separator />
                    <q-item
                      v-if="currentUserPermissions.includes('4')"
                      clickable
                      @click="selectIdAndAskConfirmation(user.id, user.Name)"
                    >
                      <q-item-section>Disable</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div>
      </q-list>

      <!-- confirmation prompt to disable a course -->
      <q-dialog v-model="confirmationPrompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              Disable User?
            </div>
          </q-card-section>

          <!-- <q-card-section class="q-pt-none">
          Disable course?
        </q-card-section> -->

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" no-caps v-close-popup />
            <q-btn flat label="Confirm" no-caps @click="disableUser" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      loaded: false,

      currentUserPermissions: [],

      users: [],
      filteredUsers: [],
      search: '',

      addCoursePrompt: false,
      userName: '',
      courseDuration: '',

      //to choose a course and operation
      selectedUserId: '',
      operation: '',

      //to disable a course
      confirmationPrompt: false,
    };
  },
  methods: {
    ...mapActions('app', ['saveLog']),
    async getUsers() {
      this.loaded = false;
      const url = `${process.env.API_URL}/user/get-all-user`;
      // console.log(url);
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data.data);
        this.users = [];
        response.data.data.forEach(res => {
          console.log(res);
          this.users.push(res);
        });
        console.log(this.users);

        this.filteredUsers = this.users;

        this.loaded = true;
        // this.permissions = response.data.response.map(res => {
        //   console.log(res.id);
        //   return {
        //     id: res.id,
        //     code: res.code,
        //     group_by: res.group_by,
        //     label: res.string,
        //   };
        // });
      } catch (err) {
        console.log(err.message);
        this.loaded = true;
      }
    },

    selectIdAndPrompt(id, operation, course) {
      // console.log(id);
      this.selectedCourseId = id;
      this.courseName = course.name;
      this.courseDuration = course.duration;
      this.operation = operation;
      this.addCoursePrompt = true;
    },

    selectIdAndAskConfirmation(id, name) {
      this.selectedUserId = id;
      this.userName = name;
      console.log(this.selectedUserId);

      this.confirmationPrompt = true;
    },

    async disableUser() {
      const url = `${process.env.API_URL}/user/disabled/`;
      // console.log(url);
      try {
        let response = await this.$axios.post(
          url,
          {
            value: 'disable',
            id: this.selectedUserId,
          },

          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data);

        // this.courseName = '';
        // this.courseDuration = '';
        this.confirmationPrompt = false;

        this.$q.notify({
          type: 'positive',
          message: `User Disabled`,
        });

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: this.selectedUserId,
          type: 'user',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Disabled User <a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.selectedUserId}">${this.userName}</a> `,
        };
        await this.saveLog(log);

        this.getUsers();
      } catch (err) {
        console.log(err.message);
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },
  },

  watch: {
    search() {
      this.filteredUsers = this.users.filter(user => {
        return (
          user.Name.toLowerCase().includes(this.search.toLowerCase()) ||
          user.email.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  mounted() {
    console.log('users page');
    this.currentUserPermissions = this.$store.getters[
      'userStore/getUserDetails'
    ].permission;
    this.getUsers();
  },
};
</script>
