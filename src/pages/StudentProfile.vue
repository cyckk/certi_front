<template>
  <q-page class="q-mt-xl q-pa-lg">
    <!-- Skeleton -->
    <div class="q-pa-md" v-if="!loaded">
      <!-- <q-card style="max-width: 300px">
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-skeleton height="200px" square />

        <q-card-actions align="right" class="q-gutter-md">
          <q-skeleton type="QBtn" />
          <q-skeleton type="QBtn" />
        </q-card-actions>
      </q-card> -->

      <div class="row justify-between items-center q-mb-lg">
        <q-skeleton class="col-9" type="input" />
        <q-skeleton type="QBtn" />
        <q-skeleton type="QBtn" />
      </div>
      <q-list bordered class=" row-reverse justify-between">
        <q-skeleton height="200px" square />
      </q-list>
    </div>

    <!-- end -->

    <!-- Real page -->
    <div v-else class="row justify-center q-gutter-xl">
      <q-card class="col-10 col-md-6 q-pa-xl">
        <q-item>
          <q-item-section avatar>
            <q-avatar size="150px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              <!-- <q-icon name="person" color="green"></q-icon> -->
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h4">{{ userProfile.Name }}</q-item-label>
            <q-item-label caption> {{ userProfile.email }}</q-item-label>
            <q-item-label class="q-mt-xl"
              ><q-btn
                class="q-mt-md"
                padding="0 xs"
                flat
                label="Edit Profile"
                no-caps
                color="primary"
                @click="updateProfilePrompt = true"
              ></q-btn
            ></q-item-label>
          </q-item-section>
        </q-item>
        {{ userProfile }}
        <div class="row justify-between items-center q-mb-lg"></div>
        <q-list bordered class=" row-reverse justify-between bg-grey-3">
          <!-- <div>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              #
            </q-item-section>

            <q-item-section>Student Name</q-item-section>

            <q-item-section>Course Duration</q-item-section>

            <q-item-section>Students</q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div> -->
          <!-- <div v-for="(user, index) in users" :key="index">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              {{ index + 1 }}
            </q-item-section>

            <q-item-section>{{ user.Name }}</q-item-section>

            <q-item-section>{{ user.course_duration }}</q-item-section>

            <q-item-section>{{ user.student_count }}</q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div> -->
        </q-list>

        <q-expansion-item
          group="somegroup"
          icon="explore"
          label="Marks"
          default-opened
          header-class="text-subtitle2"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-btn
          @click="showActivity"
          class="q-mt-lg"
          color="secondary"
          :label="!logsShown ? 'Show Activity' : 'Hide Activity'"
        ></q-btn>
      </q-card>

      <q-card v-if="logsShown" class="col-10 col-md-5 q-pa-xl">
        <q-card-section class="text-h3">Activity</q-card-section>
        <div class="q-mt-md">
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            style="height: 600px;"
          >
            <q-timeline color="secondary">
              <!-- <q-timeline-entry heading>
                Activity
              </q-timeline-entry> -->

              <q-timeline-entry
                v-for="(log, index) in logs"
                :key="index"
                :subtitle="new Date(log.created_at).toLocaleString()"
              >
                {{ log.message }}
                <div v-html="log.message" class="log"></div>
              </q-timeline-entry>

              <q-timeline-entry
                title="Event Title"
                subtitle="February 21, 1986"
                icon="delete"
              >
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </div>
              </q-timeline-entry>

              <q-timeline-entry heading>
                November, 2017
              </q-timeline-entry>
            </q-timeline>
          </q-scroll-area>
        </div>
      </q-card>
    </div>

    <q-dialog v-model="updateProfilePrompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            {{ 'Update Profile' }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model.trim="name"
            autofocus
            @keyup.enter="prompt = false"
            type="text"
            label="User Name"
          />

          <q-input
            class="q-mt-lg"
            dense
            v-model.trim="email"
            autofocus
            @keyup.enter="prompt = false"
            type="email"
            label="Email"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" no-caps v-close-popup />
          <q-btn flat :label="'Update'" no-caps @click="updateUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- end -->
  </q-page>
</template>
<script>
// import { mapActions} from 'vuex';

export default {
  data() {
    return {
      id: null,
      loaded: false,

      userProfile: [],
      logsShown: false,
      logs: [],
      search: '',

      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75,
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2,
      },

      updateProfilePrompt: false,
      name: null,
      email: null,

      location: window.location.href.split(window.location.pathname)[0],
    };
  },
  methods: {
    async getStudentProfile() {
      this.loaded = false;
      let url;
      if (this.id)
        url = `${process.env.API_URL}/student/get-student-info/${this.id}`;
      else url = `${process.env.API_URL}/user/get-user`;
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data.response);
        this.userProfile = response.data.response[0];

        this.loaded = true;
      } catch (err) {
        console.log(err.message);
        this.loaded = true;
      }
    },

    async getMyProfile() {
      this.loaded = false;
      let url = `${process.env.API_URL}/user/get-user`;
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data.response);
        this.userProfile = response.data.response[0];
        // response.data.data.forEach(res => {
        //   console.log(res);
        //   this.users.push(res);
        // });
        // console.log(this.users);

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

    async getLogs() {
      if (!this.id) return this.getMyLogs();
      try {
        const response = await this.$axios.post(
          `${process.env.API_URL}/logs/get-logs/${this.id}`,
          {
            permission: '6',
            // type: 'user',
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        console.log(response.data.response);
        response.data.response.forEach(res => {
          this.logs.push(res);
          console.log(res);
        });
      } catch (err) {
        console.log(err);
      }
    },

    async getMyLogs() {
      const id = this.$store.state.userStore.userProfile.id;
      try {
        const response = await this.$axios.get(
          `${process.env.API_URL}/logs/get-my-logs/${id}`,

          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        console.log(response.data.response);
        response.data.response.forEach(res => {
          this.logs.push(res);
          console.log(res);
        });
      } catch (err) {
        console.log(err);
      }
    },

    async updateUser() {
      console.log(this.name, this.email);
      if (!this.name && !this.email)
        return this.$q.notify({
          type: 'negative',
          message: `Please enter your details`,
        });

      const url = `${process.env.API_URL}/user/update-user-profile`;

      try {
        const response = await this.$axios.post(
          url,
          {
            id: this.$store.state.userStore.userProfile.id,
            name: this.name,
            email: this.email,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(response);

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: id,
          type: 'user',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Updated profile ${this.courseName}`,
        };
        await this.saveLog(log);

        this.name = '';
        this.email = '';

        if (this.id) this.getStudentProfile();
        else this.getMyProfile();

        this.$q.notify({
          type: 'positive',
          message: `Profile Updated`,
        });
      } catch (err) {
        console.log(err);
        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },

    async showActivity() {
      await this.getLogs();

      this.logsShown = !this.logsShown;
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    console.log(this.id);

    if (this.id) this.getStudentProfile();
    else this.getMyProfile();

    // this.getLogs();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
}
</style>
