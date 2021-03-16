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
      <q-card class="q-pa-lg bg-grey-1">
        <!-- {{ batches }} -->
        <div class="row justify-end">
          <q-select
            class="col-3"
            outlined
            label="Batch"
            :options="batches"
            v-model="selectedBatch"
            @input="getBatchDetails(selectedBatch)"
          ></q-select>
        </div>
        <!-- {{ batchDetails }}<br />
        {{ filteredStudents[filteredStudents.length - 1] }} -->
        <div class="row" v-if="batchDetails">
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
        </div>
      </q-card>

      <q-card class="q-mt-lg">
        <div class="row justify-around items-center q-mb-md q-pt-lg">
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

          <!-- <q-uploader :factory="upload" multiple style="max-width: 300px" /> -->

          <!-- <q-btn
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
          ></q-btn> -->
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
                <!-- {{ student }} -->
                <q-item-section avatar>
                  {{ index + 1 }}
                </q-item-section>

                <q-item-section class="text-capitalize">{{
                  student.name
                }}</q-item-section>

                <q-item-section>{{ student.email }}</q-item-section>

                <!-- <q-item-section>{{ student.status }}</q-item-section>-->

                <q-item-section class="text-center">{{
                  student.enrollment_id
                }}</q-item-section>

                <q-item-section class="text-center">
                  <q-btn
                    @click="selectStudentAndPrompt(student)"
                    flat
                    color="primary"
                    icon="settings"
                  >
                    <!-- <q-menu
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
                    </q-menu> -->
                  </q-btn>
                </q-item-section>
              </q-item>
              <q-separator></q-separator>
            </div>
          </div>
        </q-list>
      </q-card>
    </div>

    <!-- Dialog to generate certificate -->
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6 text-capitalize">
            {{ selectedStudent.name }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-list bordered>
            <q-item v-ripple class="row">
              <q-item-section class="col-8">Report Card</q-item-section>
              <q-item-section>
                <q-avatar>
                  <q-btn round flat icon="download"></q-btn>
                </q-avatar>
              </q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <img
                    @click="selectPreviewAndPushRoute"
                    src="https://cdn.quasar.dev/img/boy-avatar.png"
                  />
                </q-avatar>
              </q-item-section>
            </q-item>
            <q-separator></q-separator>

            <q-item v-ripple>
              <q-item-section>Project Completion Certificate</q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <img
                    @click="selectPreviewAndPushRoute"
                    src="https://cdn.quasar.dev/img/boy-avatar.png"
                  />
                </q-avatar>
              </q-item-section>
            </q-item>
            <q-separator></q-separator>

            <q-item v-ripple>
              <q-item-section>Certificate</q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <img
                    @click="selectPreviewAndPushRoute"
                    src="https://cdn.quasar.dev/img/boy-avatar.png"
                  />
                </q-avatar>
              </q-item-section>
            </q-item>
          </q-list>
          <!-- <q-input
            dense
            v-model.trim="batchName"
            autofocus
            type="text"
            label="Batch Name"
          />

          <q-select
            class="q-mt-lg"
            v-model="course"
            :options="courses"
            label="Course"
          />

          <q-select
            class="q-mt-lg"
            v-model.trim="status"
            :options="statusOptions"
            label="Status"
          />

          <q-input
            class="q-mt-lg"
            dense
            v-model.trim="batchStartDate"
            type="date"
            hint="Start Date"
          />

          <q-input
            class="q-mt-lg"
            dense
            v-model.trim="batchEndDate"
            type="date"
            hint="End Date"
          /> -->
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" no-caps v-close-popup />
          <q-btn
            flat
            :label="operation == 'add' ? 'Add' : 'Update'"
            no-caps
            @click="operation == 'add' ? addBatch() : updateBatch()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',

  data() {
    return {
      loaded: true,

      currentUserPermissions: [],

      batches: [],
      selectedBatch: null,
      batchDetails: {},

      students: [],
      filteredStudents: [],

      search: '',

      prompt: false,
      selectedStudent: {},
    };
  },

  methods: {
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
          console.log(res);
          this.batches.push({
            ...res,
            label: res.batch_name,
            value: res.id,
          });
        });

        // this.filteredBatches = this.batches;

        this.selectedBatch = this.batches[0];

        await this.getBatchDetails(this.selectedBatch);

        this.loaded = true;
      } catch (err) {
        console.log(err.message);
        this.loaded = true;
      }
    },

    async upload() {},
    async getBatchDetails(batch) {
      this.loaded = false;
      const url = `${process.env.API_URL}/batch/get-batch/${batch.id}`;
      try {
        const response = await this.$axios.get(url, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        console.log(response);

        this.batchDetails = response.data.response[0];

        await this.getStudentsInBatch(batch);

        this.loaded = true;
      } catch (err) {
        console.log(err.message);
        this.loaded = true;
      }
    },

    async getStudentsInBatch(batch) {
      this.loaded = false;
      const url = `${process.env.API_URL}/student/get-student/${batch.id}`;
      try {
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
      } catch (err) {
        console.log(err.message);
        this.loaded = true;
      }
    },

    selectPreviewAndPushRoute() {
      this.$router.push({
        name: 'CertificateOfCompletion2',
        params: { studentId: this.selectedStudent.id },
      });
    },

    selectStudentAndPrompt(student) {
      console.log(student);
      this.selectedStudent = student;
      this.prompt = true;
    },
  },

  async mounted() {
    this.id = this.$route.params.id;
    this.loaded = false;
    this.currentUserPermissions = this.$store.getters[
      'userStore/getUserDetails'
    ].permission;
    console.log(this.currentUserPermissions);
    // await this.getBatchDetails();
    // await this.getStudentsInBatch();

    await this.getBatches();
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

<style lang="scss" scoped></style>
