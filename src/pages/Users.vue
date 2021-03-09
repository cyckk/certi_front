<template>
  <q-page class="q-mt-xl q-pa-lg">
    <!-- Skeleton -->
    <div class="q-pa-md" v-if="!loaded">
      <div class="row justify-between items-center q-mb-lg">
        <q-skeleton class="col-9" type="QInput" />
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </div>
      <q-list bordered class=" row-reverse justify-between">
        <q-skeleton height="200px" square />
      </q-list>
    </div>

    <!-- end -->

    <!-- Real page -->
    <div v-else>
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
          color="primary"
          label="Add"
          :to="{ name: 'RegisterUser' }"
        ></q-btn>
      </div>
      <q-list bordered class=" row-reverse justify-between bg-grey-3">
        <div>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              #
            </q-item-section>

            <q-item-section>Name</q-item-section>

            <!-- <q-item-section>Course Duration</q-item-section> -->

            <q-item-section>Email</q-item-section>

            <q-item-section>Actions</q-item-section>
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
                      clickable
                      @click="
                        selectIdAndPrompt(user.id, 'update', {
                          name: user.Name,
                          duration: user.course_duration,
                        })
                      "
                    >
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <!-- <q-item clickable>
                      <q-item-section>Delete</q-item-section>
                    </q-item> -->
                    <q-separator />
                    <q-item
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

      <q-dialog v-model="addCoursePrompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">
              {{ operation === 'add' ? 'Add new Course' : 'Update Course' }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model.trim="userName"
              autofocus
              @keyup.enter="prompt = false"
              type="email"
              label="Course Name"
            />

            <q-input
              class="q-mt-lg"
              dense
              v-model.trim="courseDuration"
              autofocus
              @keyup.enter="prompt = false"
              type="email"
              label="Course Duration"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" no-caps v-close-popup />
            <q-btn
              flat
              :label="operation == 'add' ? 'Add' : 'Update'"
              no-caps
              @click="operation == 'add' ? addUser() : updateUser()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

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

    async addUser() {
      const url = `${process.env.API_URL}/course/create-course`;
      // console.log(url);
      try {
        let response = await this.$axios.post(
          url,
          {
            course_name: this.courseName,
            course_duration: this.courseDuration,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data.response);

        this.courseName = '';
        this.courseDuration = '';
        this.addCoursePrompt = false;

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: id,
          message: 'Created course',
        };
        await this.saveLog(log);

        this.$q.notify({
          type: 'positive',
          message: `New course added successfully`,
        });

        this.getUsers();
      } catch (err) {
        console.log(err.message);
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
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

    async updateUser() {
      const url = `${process.env.API_URL}/course/update-course`;
      // console.log(url);
      try {
        let response = await this.$axios.post(
          url,
          {
            id: this.selectedCourseId,
            course_name: this.courseName,
            course_duration: this.courseDuration,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data);

        this.courseName = '';
        this.courseDuration = '';

        this.addCoursePrompt = false;

        this.$q.notify({
          type: 'positive',
          message: `Course Updated`,
        });

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: id,
          message: 'Edited course',
        };
        await this.saveLog(log);

        // this.getusers();

        this.getUsers();
      } catch (err) {
        console.log(err.message);
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
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
          to: id,
          message: `${this.$store.state.userStore.userProfile.name} Disabled User ${this.userName}`,
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
    this.getUsers();
  },
};
</script>
