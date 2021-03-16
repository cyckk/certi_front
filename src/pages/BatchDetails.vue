<template>
  <q-page padding class="row justify-center">
    <!-- Skeleton -->
    <div class="col-12 col-md-9 q-pt-md" v-if="!loaded">
      <q-card flat bordered class="row q-pa-sm">
        <div class="col-6">
          <q-card-section class="q-pb-none">
            <q-skeleton type="text" height="70px"></q-skeleton>
          </q-card-section>

          <q-card-section class="q-pt-xs">
            <q-skeleton type="text" height="70px"></q-skeleton>
          </q-card-section>
        </div>

        <div class="col-5">
          <q-card-section class="q-pb-none">
            <q-skeleton type="text" height="70px"></q-skeleton>
          </q-card-section>

          <q-card-section class="q-pt-xs">
            <q-skeleton type="text" height="70px"></q-skeleton>
          </q-card-section>
        </div>
      </q-card>

      <q-card class="q-mt-lg">
        <div class="row justify-around items-center q-mb-md q-pt-lg">
          <q-skeleton class="col-9" type="QInput" height="35px" />
          <!-- <q-skeleton type="QBtn" /> -->
          <q-skeleton type="QBtn" />
        </div>
        <q-list bordered class=" row-reverse justify-between">
          <q-skeleton height="200px" square />
        </q-list>
      </q-card>
    </div>

    <!-- end -->

    <!-- Real page -->
    <div v-else class="col-12 col-md-9 q-pt-md">
      <q-card bordered class="row q-pa-lg bg-grey-1" v-if="batchDetails">
        <!-- {{ batchDetails }}<br />
        {{ filteredStudents[filteredStudents.length - 1] }} -->

        <div class="col-6 ">
          <q-card-section class="text-h6">
            <span class="text-bold">Batch: </span
            ><span style="font-weight: 400;">{{
              batchDetails.batch_name
            }}</span>
          </q-card-section>
          <q-card-section class="text-h6 q-pt-xs">
            <span class="text-bold">Course: </span
            ><span style="font-weight: 400;">{{
              batchDetails.course_specialization
            }}</span>
          </q-card-section>
        </div>

        <div class="col-5">
          <q-card-section class="text-h6">
            <span class="text-bold">Status: </span>
            <span style="font-weight: 400;"> {{ batchDetails.status }}</span>
          </q-card-section>

          <q-card-section class="text-h6 q-pt-xs">
            <span class="text-bold">Students Enrolled: </span>
            <span style="font-weight: 400;">
              {{ batchDetails.student_count }}</span
            >
          </q-card-section>
        </div>
      </q-card>

      <q-card class="q-mt-lg">
        <div class="row justify-around items-center q-mb-md q-pt-lg">
          <q-input
            dense
            class="col-7"
            v-model="search"
            debounce="500"
            outlined
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <!-- <q-uploader :factory="upload" multiple style="max-width: 300px" /> -->

          <q-btn
            v-if="currentUserPermissions.includes('21')"
            color="primary"
            label="Enroll Student"
            :to="{
              name: 'RegisterStudent',
              params: {
                batchId: batchDetails.id,
                courseId: batchDetails.course_id,
              },
            }"
            no-caps
          ></q-btn>

          <q-btn
            v-if="currentUserPermissions.includes('21')"
            color="secondary"
            label="Upload Marks"
            :to="{
              name: 'UploadMarks',
              params: {
                batchId: batchDetails.id,
                courseId: batchDetails.course_id,
              },
            }"
            no-caps
          ></q-btn>
        </div>
        <q-list bordered class=" row-reverse justify-between bg-grey-3">
          <div>
            <q-item clickable v-ripple class="text-bold">
              <q-item-section avatar>
                #
              </q-item-section>

              <q-item-section>Student Name</q-item-section>

              <q-item-section>Email</q-item-section>

              <!--<q-item-section>Status</q-item-section> -->

              <q-item-section class="text-center">Course Id</q-item-section>

              <q-item-section class="text-center">Actions</q-item-section>
            </q-item>
            <q-separator></q-separator>
          </div>
          <div v-if="true">
            <div v-for="(student, index) in filteredStudents" :key="index">
              <q-item>
                <q-item-section avatar>
                  {{ index + 1 }}
                </q-item-section>

                <q-item-section>{{ student.name }}</q-item-section>

                <q-item-section>{{ student.email }}</q-item-section>

                <!-- <q-item-section>{{ student.status }}</q-item-section>-->

                <q-item-section class="text-center">{{
                  student.course_id
                }}</q-item-section>

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
                          :to="{
                            name: 'StudentProfile',
                            params: { id: student.id },
                          }"
                        >
                          <q-item-section>View</q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          :to="{
                            name: 'RegisterUser',
                            params: { id: student.id },
                          }"
                        >
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <!-- <q-item clickable>
                      <q-item-section>Delete</q-item-section>
                    </q-item> -->
                        <q-separator />
                        <q-item
                          clickable
                          @click="
                            selectIdAndAskConfirmation(
                              student.id,
                              student.batch_name
                            )
                          "
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
          </div>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  data() {
    return {
      loaded: false,

      currentUserPermissions: [],

      batchDetails: {},

      students: [],
      filteredStudents: [],

      search: '',
    };
  },

  methods: {
    async upload() {},
    async getBatchDetails() {
      const url = `${process.env.API_URL}/batch/get-batch/${this.id}`;
      const response = await this.$axios.get(url, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log(response);

      this.batchDetails = response.data.response[0];
    },

    async getStudentsInBatch() {
      const url = `${process.env.API_URL}/student/get-student/${this.id}`;
      const response = await this.$axios.get(url, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log(response.data.response);

      response.data.response.forEach(res => {
        this.students.push(res);
      });

      this.filteredStudents = this.students;
    },
  },

  async mounted() {
    this.id = this.$route.params.id;
    this.loaded = false;
    this.currentUserPermissions = this.$store.getters[
      'userStore/getUserDetails'
    ].permission;
    console.log(this.currentUserPermissions);
    await this.getBatchDetails();
    await this.getStudentsInBatch();
    this.loaded = true;
  },

  watch: {
    search() {
      // console.log(this.search);
      this.filteredStudents = this.students.filter(
        student =>
          student.name.toLowerCase().includes(this.search.toLowerCase()) ||
          student.email.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>
