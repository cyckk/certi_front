<template>
  <q-page
    v-if="!loaded"
    class="container row justify-center q-gutter-xl q-pa-xl"
  >
    <form id="form q-ma-lg" @submit.prevent class="form q-pt-lg">
      <q-card-section class="q-pl-none">
        <q-skeleton type="text" height="70px" width="200px"></q-skeleton>
      </q-card-section>

      <div class="row justify-between">
        <div class="col-12 q-mt-lg">
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

        <div class="controls">
          <div class="buttons">
            <q-skeleton type="QBtn"></q-skeleton>
          </div>
        </div>
      </div>
    </form>

    <q-card class="form col-12 col-sm-4 q-pa-xl">
      <div class="row justify-between items-center ">
        <q-skeleton class="col-7" height="60px"></q-skeleton>

        <div class="">
          <div class="buttons">
            <q-skeleton type="QBtn"></q-skeleton>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
  <q-page v-else class="container row justify-center q-gutter-xl  q-pa-xl">
    <!-- <q-scroll-area style="height: 100%; max-width: 300px;"> -->
    <!-- Register user -->
    <form @submit.prevent class="form col-12 col-sm-5 q-pa-xl">
      <q-card-section class="q-pl-none">
        <div class="text-h4">
          {{ id ? 'Update Student' : 'Register Student' }}
        </div>
      </q-card-section>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="row justify-between">
        <div class="col-12 q-mt-lg">
          <div class="">
            <q-input
              outlined
              type="text"
              label="Name"
              v-model.trim="registerForm.name"
            />
          </div>
          <div class="q-mt-lg">
            <q-input
              outlined
              type="email"
              label="Email"
              placeholder="you@gmail.com"
              v-model.trim="registerForm.email"
            />
          </div>

          <div class="q-mt-lg">
            <q-select
              @input="selectCourseId(registerForm.batch)"
              outlined
              class="q-mt-lg"
              v-model="registerForm.batch"
              :options="batches"
              label="Batch"
            />
          </div>

          <div class="q-mt-lg">
            <q-input
              disable
              outlined
              type="text"
              label="Course"
              :value="this.registerForm.course.label"
            />
            <!-- <q-select
              outlined
              class="q-mt-lg"
              v-model="registerForm.course"
              :options="courses"
              label="Course"
            /> -->
          </div>
        </div>
      </div>

      <div class="controls">
        <div class="buttons">
          <q-btn
            v-if="!id"
            @click="registerStudent"
            color="primary"
            label="Register"
            padding="xs sm"
          />
          <q-btn v-else @click="updateUser" color="primary" label="Update" />
        </div>
      </div>
    </form>

    <q-card class="form col-12 col-sm-4 q-pa-xl">
      <div class="row justify-between items-center ">
        <q-file
          class="col-7"
          label="Import via CSV"
          dense
          outlined
          autofocus
          accept=".csv, text/csv"
          v-model="file"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <div class="">
          <div class="buttons">
            <q-btn @click="uploadFile" color="primary" label="Upload" no-caps />
          </div>
        </div>
      </div>
      <div class="row justify-center q-pt-xl">
        <div class="q-pa-md">
          <span class="text-subtitle1"
            >The csv file should be in the below format</span
          >
        </div>
        <q-img src="images/csv-demo.png" style="width: 100%"> </q-img>
      </div>
    </q-card>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex';
import _ from 'lodash';
import { QSpinnerClock } from 'quasar';
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      loaded: false,
      id: null,

      batches: [],
      courses: [],
      // selectedBatch: null,
      // selectedCourse: null,

      currentUserPermissions: [],

      file: null,
      registerForm: {
        email: '',
        name: '',
        batch: '',
        course: '',
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
    ...mapActions('app', ['saveLog']),

    async getBatches() {
      this.loaded = false;
      this.filteredBatches = [];
      const url = `${process.env.API_URL}/batch/get-batch`;
      // console.log(url);
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        // console.log(response.data);
        this.batches = [];
        response.data.response.forEach(res => {
          // console.log(res);
          this.batches.push({
            ...res,
            label: res.batch_name,
            value: res.id,
            course_id: res.course_id,
            course_specialization: res.course_specialization,
          });
        });

        this.loaded = true;
      } catch (err) {
        console.log(err.message);
        this.loaded = true;
      }
    },

    selectCourseId(batch) {
      console.log(batch.course_id);

      this.registerForm.course = {
        value: batch.course_id,
        label: batch.course_specialization,
      };
    },

    async getCourses() {
      // this.loaded = false;
      const url = `${process.env.API_URL}/course/get-course`;
      // console.log(url);
      try {
        let response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        // console.log(response.data);
        this.courses = [];
        response.data.response.forEach(res => {
          // console.log(res);
          this.courses.push({
            label: res.specialization,
            value: res.id,
          });
        });

        this.loaded = true;
      } catch (err) {
        console.log(err.message);
        this.loaded = true;
      }
    },

    async registerStudent() {
      // console.log(
      //   this.registerForm.batch.value,
      //   this.registerForm.course.value
      // );
      // return;
      if (
        !this.registerForm.name &&
        !this.registerForm.email &&
        !this.registerForm.batch &&
        !this.registerForm.course
      )
        this.$q.notify({
          type: 'negative',
          message: `Please fill in the details`,
        });

      this.$q.loading.show({
        spinner: QSpinnerClock,
        delay: 400,
        message: 'Registering Student',
        spinnerColor: 'teal-1',
      });
      const url = `${process.env.API_URL}/student/create-indivisual-student`;
      let response;

      try {
        response = await this.$axios.post(
          url,
          {
            name: this.registerForm.name,
            email: this.registerForm.email,
            batch_id: this.registerForm.batch.value,
            course_id: this.registerForm.course.value,
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
          to: this.registerForm.batch.value,
          type: 'student',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Added Student ${
            this.registerForm.name
          } to Batch <a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/students/batch/${this.registerForm.batch.value}">${
            this.batchId
          }</a> `,
        };
        await this.saveLog(log);

        this.registerForm.name = '';
        this.registerForm.email = '';
        this.registerForm.batch = '';
        this.registerForm.course = '';

        this.$q.loading.hide();

        this.$q.notify({
          type: 'positive',
          message: `Student registered`,
        });
      } catch (err) {
        console.log(err);
        // console.log(response);
        this.$q.loading.hide();

        this.$q.notify({
          type: 'negative',
          message: `${err.message}`,
        });
      }
    },

    async uploadFile() {
      console.log(this.file);
      this.$q.loading.show({
        spinner: QSpinnerClock,
        delay: 400,
        message: 'Adding Students into the Batch',
        spinnerColor: 'teal-1',
      });

      let formData = new FormData();

      formData.append('files', this.file);
      formData.append('batch_id', this.batchId);
      formData.append('course_id', this.courseId);

      // console.log(formData.getItem('batch_id'));
      // console.log(formData.getItem('course_id'));
      // console.log(formData.getItem('files'));

      const url = `${process.env.API_URL}/student/create-student`;

      try {
        let response = await this.$axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token'),
          },
        });
        console.log(response.data);

        const id = jwt_decode(localStorage.getItem('token')).id;
        console.log(id);
        const log = {
          from: id,
          to: this.batchId,
          type: 'student',
          message: `<a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/profile/${this.$store.state.userStore.userProfile.id}">${
            this.$store.state.userStore.userProfile.name
          }</a> Added Students to Batch <a class="message-from" href="${
            window.location.href.split(window.location.pathname)[0]
          }/students/batch/${this.batchId}">${
            this.batchId
          }</a>  Using File Upload`,
        };
        await this.saveLog(log);

        this.$q.loading.hide();

        this.$q.notify({
          type: 'positive',
          message: `Students are added into the batch`,
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
    this.batchId = this.$route.params.batchId;
    this.courseId = this.$route.params.courseId;

    this.currentUserPermissions = this.$store.getters[
      'userStore/getUserDetails'
    ].permission;

    console.log(this.currentUserPermissions);

    await this.getBatches();
    // await this.getCourses();
  },
};
</script>

<style lang="scss" scoped>
.container {
  // height: 100vh;
  width: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  background-color: rgba(247, 249, 250, 0.98);
}

.error {
  font-size: 12px;
  color: orangered;
  margin-bottom: 10px;
}
.form {
  // flex-basis: 50%;
  padding: 20px;
  border: 1px solid rgba(233, 230, 230, 0.788);
  border-radius: 5px;
  background-color: rgba(251, 251, 251, 0.79);
  box-shadow: 0 10px 30px #9a9999a4;
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
